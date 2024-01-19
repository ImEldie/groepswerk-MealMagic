import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ApiRequestsService } from './api-requests-service/api-requests.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private api: ApiRequestsService,
    private storage: LocalstorageService,
  ) {};

  login(email: string, password: string) {
    const postData = {email: email , password: password};
    return this.api.post('/token/login', postData)
      .pipe(
        tap((data) => {
          this.storage.token.set(data.token);
          localStorage.setItem('login_id', String(data.user.id));
          this.getUserId(data.user.id).subscribe();
        }),
      );
  }
  private getUserId(login_id: number) {
    return this.api.get('/user-details/user/', login_id)
      .pipe(tap((data) => this.storage.id.set(data.id)));
  }
  logout() {
    this.storage.token.remove();
    this.storage.id.remove();
    localStorage.removeItem('login_id');
  }
  getStoredLoginId(): number | null {
    const loginIdTokenString: string | null = localStorage.getItem('login_id');
    if (loginIdTokenString === null) {
      return null;
    }
    const loginIdTokenNumber: number = parseInt(loginIdTokenString, 10);
    return loginIdTokenNumber;
  }
  getStoredId(): number | null {
    const idTokenString: string | null = localStorage.getItem('id');
    if (idTokenString === null) {
      return null;
    }
    const idTokenNumber: number = parseInt(idTokenString, 10);
    return idTokenNumber;
  }
  get isAuthenticated() {
    const userAuthenticated = this.storage.token.get() !== null;
    return userAuthenticated;
  }
}
