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

  getFromApi(endpoint: string, endpointId: number | void): Observable<any> {
    if (endpointId) {
      return this.getRequest(this.getEndpointWithId(endpoint, endpointId));
    } else {
      return this.getRequest(endpoint).pipe(map((data: APIResponse) => data.data))
    }
  }

  private getRequest(endpoint: string): Observable<any> {
    return this.http
      .get<APIResponse>(endpoint , {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.auth.getBearerToken(),
        }),
      })
  }

  postToApi(endpoint: string, dataToPost: any): Observable<any> {
    return this.postRequest(endpoint, dataToPost).pipe(map((data: APIResponse) => data.data));
  }

  private postRequest(endpoint: string, dataToPost: any): Observable<any> {
    return this.http
      .post<APIResponse>(endpoint, dataToPost,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.auth.getBearerToken(),
        }),
      })
  }
  
  putToApi(endpoint: string, endpointId: number, dataToPut: any): Observable<any> {
    return this.putRequest(this.getEndpointWithId(endpoint, endpointId), dataToPut);
  }

  private putRequest(endpoint: string, dataToPut: any) {
    return this.http.put(endpoint, dataToPut,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.getBearerToken(),
        }),
      },
    );
  }

  private getEndpointWithId(endpoint: string, id: number): string {
    const noBackslashAtEnd: boolean = !(endpoint.endsWith("/"));
    if (noBackslashAtEnd) {
      endpoint = endpoint + '/';
    }

    return endpoint + id;
  }
}
