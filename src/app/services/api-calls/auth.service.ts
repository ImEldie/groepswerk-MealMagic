import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LocalstorageService } from '../functions/localstorage.service';
import { HttpClient } from '@angular/common/http';
import { LoginDetails } from '../../interfaces/login-interface';
import { UserDetailsInterface } from '../../interfaces/user-details-interface';

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
        this.storage.token.set(data.token);
        this.storage.loginId.set(data.user.id);
        this.getUserId(data.user.id).subscribe();
      }),
    );
  }
  private getUserId(login_id: number) {
    return this.http
      .get<UserDetailsInterface>('/user-details/user/' + login_id)
      .pipe(tap((data) => this.storage.userId.set(data.id)));
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