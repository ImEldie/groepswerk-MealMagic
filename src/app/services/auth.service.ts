import { HttpClient } from '@angular/common/http';
import { Injectable, computed } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>('https://code-coaching.dev/api/token/login', {
        email: email,
        password: password,
      })
      .pipe(
        tap((data) => {
          localStorage.setItem('token', data.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  get isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
