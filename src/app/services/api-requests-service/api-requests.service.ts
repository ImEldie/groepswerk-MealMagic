import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { APIResponse } from '../../interfaces/api-interface';
import { LocalstorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {
  constructor(
    private http: HttpClient,
    private storage: LocalstorageService
  ) {}

  get(endpoint: string, endpointId: number | void): Observable<any> {
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
          Authorization: "Bearer " + this.storage.token.get(),
        }),
      })
  }

  post(endpoint: string, dataToPost: any): Observable<any> {
    return this.postRequest(endpoint, dataToPost);
  }

  private postRequest(endpoint: string, dataToPost: any): Observable<any> {
    return this.http
      .post<APIResponse>(endpoint, dataToPost,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.storage.token.get(),
        }),
      })
  }
  
  put(endpoint: string, endpointId: number, dataToPut: any): Observable<any> {
    return this.putRequest(this.getEndpointWithId(endpoint, endpointId), dataToPut);
  }

  private putRequest(endpoint: string, dataToPut: any) {
    return this.http.put(endpoint, dataToPut,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.storage.token.get(),
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
