import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';
import { APIResponse } from '../interfaces/api-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiFunctionsService {
  private linkPrefix = 'https://syntra2023.code-coaching.dev/api/group-2/'

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getFromApi(endpoint: string): Observable<any> {
    return this.http
      .get<APIResponse>(this.getLink(endpoint), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.auth.getBearerToken(),
        }),
      })
      .pipe(map((data: APIResponse) => data.data))
  }
  postToApi(endpoint: string, postData: any): Observable<any> {
    return this.http
      .post<APIResponse>(this.getLink(endpoint), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.auth.getBearerToken(),
        }),
      })
      .pipe(map((data: APIResponse) => data.data))
  }
  putToApi(endpoint: string): Observable<any> {
    return this.http
      .put<APIResponse>(this.getLink(endpoint), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.auth.getBearerToken(),
        }),
      })
      .pipe(map((data: APIResponse) => data.data))
  }

  private getLink(endpoint: string): string {
    return this.linkPrefix + endpoint;
  }
}
