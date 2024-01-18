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
    endpoint = this.getFormattedEndpoint(endpoint);

    if (endpointId) {
      endpoint = endpoint + endpointId;
      console.log(endpoint);
      return this.getRequest(endpoint);
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
    endpoint = this.getFormattedEndpoint(endpoint);

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
    const endpointWithId = this.getFormattedEndpoint(endpoint) + endpointId;

    return this.putRequest(endpointWithId, dataToPut);
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
