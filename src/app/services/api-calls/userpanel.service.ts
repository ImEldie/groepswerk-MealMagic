import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ArrayAllergies,
  ListAllergies,
  UserDetailAllergies,
  UserDetailWeightHeight,
  UserDetailsInterface,
} from '../../interfaces/user-details-interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserpanelService {
  constructor(private http: HttpClient) {}
  apiUrl: string =
    'https://syntra2023.code-coaching.dev/api/group-2/user-details/';
  apiUrlTwo: string =
    'https://syntra2023.code-coaching.dev/api/group-2/allergies/';
  getUserDetails(id: number): Observable<UserDetailsInterface> {
    return this.http
      .get<UserDetailsInterface>(`${this.apiUrl}${id}`, {
        headers: new HttpHeaders({
          Authorization:
            'Bearer 128|O1Q8ywsfBX7iZkjPl7el5RHqz1y0CJ9uvNpWnT8ha429b286',
          // Authorizatition: 'Bearer' + localStorage.getItem('token'),
          // (For testing) Authorization:
          // 'Bearer hereYourBearerToken',
        }),
      })
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
      .get<ListAllergies>(`${this.apiUrlTwo}`, {
        headers: new HttpHeaders({
          // Authorizatition: 'Bearer' + localStorage.getItem('token'),
          // FOR TESTING:
          // Authorization:
          // 'Bearer hereYourBearerToken',
          Authorization:
            'Bearer 128|O1Q8ywsfBX7iZkjPl7el5RHqz1y0CJ9uvNpWnT8ha429b286',
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
      `${this.apiUrl}${id}`,
      {
        user_id: id,
        bodyweight: bodyweightInput,
        height: heightInput,
      },
      {
        headers: new HttpHeaders({
          // Authorizatition: 'Bearer' + localStorage.getItem('token'),
          // FOR TESTING:
          // Authorization:
          // 'Bearer hereYourBearerToken',
          Authorization:
            'Bearer 128|O1Q8ywsfBX7iZkjPl7el5RHqz1y0CJ9uvNpWnT8ha429b286',
        }),
      }
    );
  }
  postUserAllergies(selectedAllergyIds: Array<number>, id: number) {
    return this.http.put(
      `${this.apiUrl}${id}`,
      { user_id: id, allergy_ids: selectedAllergyIds },
      {
        headers: new HttpHeaders({
          // Authorizatition: 'Bearer' + localStorage.getItem('token'),
          // FOR TESTING:
          // Authorization:
          // 'Bearer hereYourBearerToken',
          Authorization:
            'Bearer 128|O1Q8ywsfBX7iZkjPl7el5RHqz1y0CJ9uvNpWnT8ha429b286',
        }),
      }
    );
  }
}
