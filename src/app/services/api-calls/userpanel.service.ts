import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Allergy,
  ListAllergies,
  UserDetailsInterface,
  UserDetailsResponse,
} from '../../interfaces/user-details-interface';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserpanelService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}
  apiUrl: string = 'https://syntra2023.code-coaching.dev/api/group-2/';
  userDetailsEndpoint: string = 'user-details/';
  allergiesEndpoint: string = 'allergies/';
  getUserDetails(): Observable<UserDetailsResponse> {
    return this.http
      .get<UserDetailsInterface>(
        `${this.apiUrl}${this.userDetailsEndpoint}${this.auth.getStoredId()}`,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.getBearerToken(),
          }),
        },
      )
      .pipe(
        map((data) => {
          const userDetails: UserDetailsInterface = {
            id: data.id,
            user_id: data.user_id,
            bodyweight: data.bodyweight / 1000,
            height: data.height,
            allergies: data.allergies,
          };
          let userAllergies: Allergy[] = [];
          data.allergies.map((allergies) => {
            const allergy: Allergy = {
              id: allergies.id,
              name: allergies.name,
            };
            userAllergies.push(allergy);
          });
          return { userDetails, userAllergies };
        }),
      );
  }
  getListAllergies(): Observable<Array<Allergy>> {
    return this.http
      .get<ListAllergies>(`${this.apiUrl}${this.allergiesEndpoint}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.getBearerToken(),
        }),
      })
      .pipe(map((result) => result.data));
  }
  putUserWeightLength(
    bodyweightInput: number,
    heightInput: number,
    selectedAllergyIds: Array<number>,
  ) {
    return this.http.put(
      `${this.apiUrl}${this.userDetailsEndpoint}${this.auth.getStoredId()}`,
      {
        user_id: this.auth.getStoredLoginId(),
        bodyweight: bodyweightInput,
        height: heightInput,
        allergy_ids: selectedAllergyIds,
      },
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.getBearerToken(),
        }),
      },
    );
  }
  putUserAllergies(selectedAllergyIds: Array<number>) {
    return this.http.put(
      `${this.apiUrl}${this.userDetailsEndpoint}${this.auth.getStoredId()}`,
      {
        user_id: this.auth.getStoredLoginId(),
        allergy_ids: selectedAllergyIds,
      },
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.getBearerToken(),
        }),
      },
    );
  }
}
