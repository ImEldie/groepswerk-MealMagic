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
    endpoint = this.getFormattedEndpoint(endpoint);

    return this.http
      .get<APIResponse>(endpoint , {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.auth.getBearerToken(),
        }),
      })
      .pipe(map((data: APIResponse) => data.data))
  }

  postToApi(endpoint: string, dataToPost: any): Observable<any> {
    endpoint = this.getFormattedEndpoint(endpoint);

    return this.http
      .post<APIResponse>(endpoint , {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.auth.getBearerToken(),
        }),
      })
      .pipe(map((data: APIResponse) => data.data))
  }
  
  putToApi(endpoint: string, dataToPost: any, id: number): Observable<any> {
    const endpointWithId = this.getFormattedEndpoint(endpoint) + id;

    return this.http.put(endpointWithId, dataToPost,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.getBearerToken(),
        }),
      },
    );
  }

  private getFormattedEndpoint(endpoint: string): string {
    const noBackslashAtStart: boolean = !(endpoint.startsWith("/"));
    if (noBackslashAtStart) {
      endpoint = '/' + endpoint;
    }

    const noBackslashAtEnd: boolean = !(endpoint.endsWith("/"));
    if (noBackslashAtEnd) {
      endpoint = endpoint + '/';
    }

    return endpoint;
  }
  
}
