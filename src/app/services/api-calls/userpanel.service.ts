import { Injectable } from '@angular/core';
import {
  Allergy,
  DishReview,
  ReviewsResponse,
  AllergyList,
  UserDetailApiResponse,
  UserDetailsInterface,
  UserDetailsResponse,
} from '../../interfaces/user-details-interface';
import { Observable, map } from 'rxjs';
import { Dish } from '../../interfaces/interfaces-dishes';
import { LocalstorageService } from '../functions/localstorage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserpanelService {
  constructor(
    private http: HttpClient,
    private storage: LocalstorageService,
  ) {}
  getUserDetails(): Observable<UserDetailsResponse> {
    return this.http
      .get<UserDetailApiResponse>('user-details/' + this.storage.userId.get())
      .pipe(
        map((data) => {
          const userDetails: UserDetailsInterface = {
            id: data.id,
            user_id: data.user_id,
            bodyweight: data.bodyweight / 1000,
            height: data.height,
            allergies: data.allergies,
          };
          let userAllergies: Array<Allergy> = [];
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
    return this.http.get<AllergyList>('allergies').pipe(map((d) => d.data));
  }
  putUserWeightLength(
    bodyweightInput: number,
    heightInput: number,
    selectedAllergyIds: Array<number>,
  ) {
    const dataToPut = {
      user_id: this.storage.loginId.get(),
      bodyweight: bodyweightInput,
      height: heightInput,
      allergy_ids: selectedAllergyIds,
    };

    return this.http.put(
      'user-details/' + this.storage.userId.get(),
      dataToPut,
    );
  }
  putUserAllergies(selectedAllergyIds: Array<number>) {
    const dataToPut = {
      user_id: this.storage.loginId.get(),
      allergy_ids: selectedAllergyIds,
    };

    return this.http.put(
      'user-details/' + this.storage.userId.get(),
      dataToPut,
    );
  }
  getUserReviews() {
    return this.http.get<ReviewsResponse>('reviews/').pipe(
      map((response) => response.data),
      map((reviews) =>
        reviews.filter(
          (review) => review.user_id === this.storage.userId.get(),
        ),
      ),
    );
  }
  getDishDetails(dishId: number) {
    return this.http.get<Dish>('dishes/' + `${dishId}`).pipe(
      map((data) => {
        const dishreview: DishReview = {
          name: data.name,
          image_url: data.image_url,
        };
        return dishreview;
      }),
    );
  }
}
