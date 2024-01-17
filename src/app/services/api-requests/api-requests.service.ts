import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, map } from 'rxjs';
import { APIResponse } from '../../interfaces/api-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getFromApi(endpoint: string): Observable<any> {
    return this.http
      .get<APIResponse>(endpoint , {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.auth.getBearerToken(),
        }),
      })
      .pipe(map((data: APIResponse) => data.data))
  }
  postToApi(endpoint: string, postData: any): Observable<any> {
    return this.http
      .post<APIResponse>(endpoint , {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.auth.getBearerToken(),
        }),
      })
      .pipe(map((data: APIResponse) => data.data))
  }
  putToApi(endpoint: string): Observable<any> {
    return this.http
      .put<APIResponse>(endpoint , {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.auth.getBearerToken(),
        }),
      })
      .pipe(map((data: APIResponse) => data.data))
  }
}
