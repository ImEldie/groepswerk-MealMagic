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
import { ApiRequestsService } from '../api-requests/api-requests.service';

@Injectable({
  providedIn: 'root',
})
export class UserpanelService {
  constructor(
    private api: ApiRequestsService,
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  getUserDetails(id: number): Observable<UserDetailsResponse> {
    return this.api.getFromApi("user-details", id)
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
          data.allergies.map((allergies: Allergy) => {
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
    return this.api.getFromApi("allergies")
      .pipe(map((result) => result.data));
  }
  putUserWeightLength(
    bodyweightInput: number,
    heightInput: number,
    selectedAllergyIds: Array<number>,
    id: number,
  ) {
    const dataToPut = { user_id: id, bodyweight: bodyweightInput, height: heightInput, allergy_ids: selectedAllergyIds };

    return this.api.putToApi("user-details", id, dataToPut);
  }
  putUserAllergies(selectedAllergyIds: Array<number>, id: number) {
    const dataToPut = { user_id: id, allergy_ids: selectedAllergyIds }

    return this.api.putToApi("user-details", id, dataToPut);
  }
}
