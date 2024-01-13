import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArrayAllergies, ListAllergies, UserDetailsInterface, UserDetailsResponse } from '../../interfaces/user-details-interface';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserpanelService {
  constructor(private http: HttpClient, private auth: AuthService) {}
  apiUrl: string = 'https://syntra2023.code-coaching.dev/api/group-2/';
  userDetailsEndpoint: string = 'user-details/';
  allergiesEndpoint: string = 'allergies/';
  getUserDetails(id: number): Observable<UserDetailsResponse> {
    return this.http
      .get<UserDetailsInterface>(
        `${this.apiUrl}${this.userDetailsEndpoint}${id}`,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.getBearerToken(),
          }),
        }
      )
      .pipe(
        map((data) => {
          const userDetails: UserDetailsInterface = {
            id: data.id,
            user_id: data.user_id,
            bodyweight: data.bodyweight / 1000,
            height: data.height,
            allergies: data.allergies,
          } satisfies UserDetailsInterface;
          let userAllergies: ArrayAllergies[] = [];
          data.allergies.map((allergies) => {
            const allergy: ArrayAllergies = {
              id: allergies.id,
              name: allergies.name,
            } satisfies ArrayAllergies;
            userAllergies.push(allergy);
          });
          return { userDetails, userAllergies };
        })
      );
  }
  getListAllergies(): Observable<Array<ArrayAllergies>> {
    return this.http
      .get<ListAllergies>(`${this.apiUrl}${this.allergiesEndpoint}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.getBearerToken(),
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
  putUserWeightLength(
    bodyweightInput: number,
    heightInput: number,
    selectedAllergyIds: Array<number>,
    id: number
  ) {
    return this.http.put(
      `${this.apiUrl}${this.userDetailsEndpoint}${id}`,
      {
        user_id: id,
        bodyweight: bodyweightInput,
        height: heightInput,
        allergy_ids: selectedAllergyIds,
      },
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.getBearerToken(),
        }),
      }
    );
  }
  putUserAllergies(selectedAllergyIds: Array<number>, id: number) {
    return this.http.put(
      `${this.apiUrl}${this.userDetailsEndpoint}${id}`,
      { user_id: id, allergy_ids: selectedAllergyIds },
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.getBearerToken(),
        }),
      }
    );
  }
}
