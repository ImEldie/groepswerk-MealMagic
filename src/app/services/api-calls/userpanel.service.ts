import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Allergy,
  UserDetailsInterface,
  UserDetailsResponse,
} from '../../interfaces/user-details-interface';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth.service';
import { ApiRequestsService } from '../api-requests-service/api-requests.service';

@Injectable({
  providedIn: 'root',
})
export class UserpanelService {
  constructor(
    private api: ApiRequestsService,
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  getUserDetails(): Observable<UserDetailsResponse> {
    return this.api.get("user-details", this.auth.getStoredId()!)
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
    return this.api.get("allergies");
  }
  putUserWeightLength(
    bodyweightInput: number,
    heightInput: number,
    selectedAllergyIds: Array<number>,
  ) {
    const dataToPut = { user_id: this.auth.getStoredLoginId(), bodyweight: bodyweightInput, height: heightInput, allergy_ids: selectedAllergyIds };

    return this.api.put("user-details", this.auth.getStoredId()!, dataToPut);
  }
  putUserAllergies(selectedAllergyIds: Array<number>) {
    const dataToPut = { user_id: this.auth.getStoredLoginId(), allergy_ids: selectedAllergyIds }

    return this.api.put("user-details", this.auth.getStoredId()!, dataToPut);
  }
}
