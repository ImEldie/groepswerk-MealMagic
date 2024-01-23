import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { LocalstorageService } from '../functions/localstorage.service';
import { HttpClient } from '@angular/common/http';
import { LoginDetails } from '../../interfaces/login-interface';
import { UserDetailsInterface, UserDetailsPost } from '../../interfaces/user-details-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storage: LocalstorageService,
  ) {}

  login(email: string, password: string) {
    const postData = { email: email, password: password };
    return this.http.post<LoginDetails>('/token/login', postData).pipe(
      tap((data) => {
          const loginId = data.user.id;
        this.storage.token.set(data.token);
        this.storage.loginId.set(loginId);
        this.getUserId(loginId);
      }),
    );
  }
  private getUserId(login_id: number) {
    return this.http.get<UserDetailsInterface>('/user-details/user/' + login_id)
      .pipe(catchError(() => this.postNewUserDetails(login_id)))
      .subscribe(
        (userData) => { 
          this.storage.userId.set(userData.id)
        });
  }
  private postNewUserDetails(login_id: number){
    const newUserData: UserDetailsPost = {
      user_id: login_id,
      bodyweight: 0,
      height: 0,
      allergies: []
    }
    return this.http.post<UserDetailsInterface>('user-details', newUserData)
      .pipe(tap((userData) => this.storage.userId.set(userData.id)));
  }
  logout() {
    this.storage.token.remove();
    this.storage.userId.remove();
    this.storage.loginId.remove();
  }
  get isAuthenticated() {
    const userAuthenticated = this.storage.token.get() !== null;
    return userAuthenticated;
  }
}