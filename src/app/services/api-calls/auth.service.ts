import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ApiRequestsService } from '../functions/api-requests-service/api-requests.service';
import { LocalstorageService } from '../functions/localstorage.service';

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
          this.storage.loginId.set(data.user.id);
          this.getUserId(data.user.id).subscribe();
        }),
      );
  }
  private getUserId(login_id: number) {
    return this.api.get('/user-details/user/', login_id)
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
