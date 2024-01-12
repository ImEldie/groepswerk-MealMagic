import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ArrayAllergies,
  ListAllergies,
  UserDetailsInterface,
} from '../../interfaces/user-details-interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserpanelService {
  constructor(private http: HttpClient) {}
  apiUrl: string = 'https://syntra2023.code-coaching.dev/api/group-2/';
  userDetailsEndpoint: string = 'user-details/';
  allergiesEndpoint: string = 'allergies/';
  getUserDetails(id: number): Observable<UserDetailsInterface> {
    return this.http
      .get<UserDetailsInterface>(
        `${this.apiUrl}${this.userDetailsEndpoint}${id}`,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('token'),
            // (For testing) Authorization:
            // 'Bearer hereYourBearerToken',
          }),
        }
      )
      .pipe(
        map((data) => {
          const userDetails: UserDetailsInterface = {
            id: data.id,
            user_id: data.user_id,
            bodyweight: data.bodyweight,
            height: data.height,
            allergy_ids: data.allergy_ids,
          } satisfies UserDetailsInterface;
          return userDetails;
        })
      );
  }
  getListAllergies(): Observable<Array<ArrayAllergies>> {
    return this.http
      .get<ListAllergies>(`${this.apiUrl}${this.allergiesEndpoint}`, {
        headers: new HttpHeaders({
          Authorizatition: 'Bearer' + localStorage.getItem('token'),
          // FOR TESTING:
          // Authorization:
          // 'Bearer hereYourBearerToken',
        }),
      })
      .pipe(
        map((data) =>
          data.data.map((data) => ({
            id: data.id,
            name: data.name,
          }))
        )
      );
  }
  postUserWeightLength(
    bodyweightInput: number,
    heightInput: number,
    id: number
  ) {
    return this.http.put(
      `${this.apiUrl}${this.userDetailsEndpoint}${id}`,
      {
        user_id: id,
        bodyweight: bodyweightInput,
        height: heightInput,
      },
      {
        headers: new HttpHeaders({
          Authorizatition: 'Bearer' + localStorage.getItem('token'),
          // FOR TESTING:
          // Authorization:
          // 'Bearer hereYourBearerToken',
        }),
      }
    );
  }
  postUserAllergies(selectedAllergyIds: Array<number>, id: number) {
    return this.http.put(
      `${this.apiUrl}${this.userDetailsEndpoint}${id}`,
      { user_id: id, allergy_ids: selectedAllergyIds },
      {
        headers: new HttpHeaders({
          Authorizatition: 'Bearer' + localStorage.getItem('token'),
          // FOR TESTING:
          // Authorization:
          // 'Bearer hereYourBearerToken',
        }),
      }
    );
  }
}
