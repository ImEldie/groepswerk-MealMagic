import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginDetails } from '../interfaces/login-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private urlUserId: string =
    'https://syntra2023.code-coaching.dev/api/group-2/user-details/user/';
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
          localStorage.setItem('token', data.token);
          this.getUserId(data.user.id).subscribe();
        }),
      );
  }
  private getUserId(login_id: number) {
    return this.http
      .get<{ id: string }>(`${this.urlUserId}${login_id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getBearerToken(),
        }),
      })
      .pipe(tap((data) => localStorage.setItem('id', String(data.id))));
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }
  getBearerToken(): string | null {
    const bearerToken: string | null = localStorage.getItem('token');
    return bearerToken;
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
    return !!localStorage.getItem('token');
  }
}
