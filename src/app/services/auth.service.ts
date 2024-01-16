import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

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

  logout() {
    localStorage.removeItem('token');
  }

  getBearerToken(): string | null {
    const bearerToken: string | null = localStorage.getItem('token');
    return bearerToken;
  }
  getUserId(): string | null {
    const idToken: string | null = localStorage.getItem('id');
    return idToken;
  }
  get isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
