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
  login(email: string, password: string) {
    return this.http
      .post<loginResponse>(
        'https://syntra2023.code-coaching.dev/api/token/login',
        {
          email: email,
          password: password,
        },
      )
      .pipe(
        tap((data) => {
          localStorage.setItem('login_id', data.user.id);
          localStorage.setItem('token', data.token);
        }),
      );
  }
  getLoginId(): number | null {
    const loginId: number | null = Number(localStorage.getItem('login_id'));
    return loginId;
  }
  getUserIdDatabase(login_id: number) {
    return this.http
      .get<{ id: string }>(`${this.url}${login_id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getBearerToken(),
        }),
      })
      .pipe(tap((data) => localStorage.setItem('id', data.id)));
  }
  logout() {
    localStorage.removeItem('token');
  }
  getBearerToken(): string | null {
    const bearerToken: string | null = localStorage.getItem('token');
    return bearerToken;
  }
  getUserId(): number | null {
    const idToken: number | null = Number(localStorage.getItem('id'));
    return idToken;
  }
  get isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
