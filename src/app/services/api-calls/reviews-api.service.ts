import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewsResponse } from '../../interfaces/user-details-interface';
import { map, of } from 'rxjs';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}
  apiUrl: string = 'https://syntra2023.code-coaching.dev/api/group-2/';
  reviewsEndpoint: string = 'reviews/';
  getUserReviews(userId: number | null, dishId: number | null) {
    if (userId === null || dishId === null) {
      return of([]);
    }
    return this.http
      .get<ReviewsResponse>(`${this.apiUrl}${this.reviewsEndpoint}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
      })
      .pipe(
        map((response) => response.data),
        map((reviews) => {
          const filteredReviews = reviews.filter(
            (review) => review.user_id === userId && review.dish_id === dishId,
          );
          return filteredReviews.map((review) => ({ id: review.id, review }));
        }),
      );
  }
  postReview(newReview: {
    dish_id: number;
    user_id: number | null;
    stars: number;
  }) {
    return this.http.post(`${this.apiUrl}${this.reviewsEndpoint}`, newReview, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.auth.getBearerToken(),
      }),
    });
  }
  putReview(
    reviewId: number,
    updatedReview: {
      dish_id: number;
      user_id: number | null;
      stars: number;
    },
  ) {
    return this.http.put(
      `${this.apiUrl}${this.reviewsEndpoint}${reviewId}`,
      updatedReview,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.getBearerToken(),
        }),
      },
    );
  }
}
