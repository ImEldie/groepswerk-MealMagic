import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ApiRequestsService } from './api-requests-service/api-requests.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient, 
    private api: ApiRequestsService,
    private storage: LocalstorageService,
  ) {};

  login(email: string, password: string) {
    const postData = {email: email , password: password};
    return this.api.post('/token/login', postData)
      .pipe(
        tap((data) => {
          this.storage.token.set(data.token);
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
  }
  get isAuthenticated() {
    return !!this.storage.token.get();
  }
}
