import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginDetails, loginResponse } from '../interfaces/login-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  url: string =
    'https://syntra2023.code-coaching.dev/api/group-2/user-details/user/';
  private login_id: number = NaN;
  login(email: string, password: string) {
    return this.http
      .post<LoginDetails>(
        'https://syntra2023.code-coaching.dev/api/token/login',
        {
          email: email,
          password: password,
        },
      )
      .pipe(
        tap((data) => {
          this.login_id = data.user.id;
          localStorage.setItem('token', data.token);
          this.saveUserId(this.login_id).subscribe();
        }),
      );
  }
  saveUserId(login_id: number) {
    return this.http
      .get<{ id: string }>(`${this.url}${login_id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getBearerToken(),
        }),
      })
      .pipe(tap((data) => localStorage.setItem('id', String(data.id))));
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.login_id = NaN;
  }
  getBearerToken(): string | null {
    const bearerToken: string | null = localStorage.getItem('token');
    return bearerToken;
  }
  getUserId(): number | null {
    const idTokenString: string | null = localStorage.getItem('id');
    if (idTokenString === null) {
      return null;
    }
    const idTokenNumber: number = parseInt(idTokenString, 10);
    return idTokenNumber;
  }
  get isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
