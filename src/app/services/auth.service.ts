import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  url: string =
    'https://syntra2023.code-coaching.dev/api/group-2/user-details/user/';
  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>(
        'https://syntra2023.code-coaching.dev/api/token/login',
        {
          email: email,
          password: password,
        },
      )
      .pipe(
        tap((data) => {
          localStorage.setItem('token', data.token);
        }),
      );
  }
  get(user_id: number) {
    return this.http
      .get<{ id: string }>(`${this.url}${user_id}`, {
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
