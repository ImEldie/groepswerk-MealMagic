import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewsResponse } from '../../interfaces/user-details-interface';
import { map, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(
    private http: HttpClient,
  ) {}
  apiUrl: string = 'https://syntra2023.code-coaching.dev/api/group-2/';
  reviewsEndpoint: string = 'reviews/';
  getUserReviews(userId: number | null, dishId: number | null) {
    if (userId === null || dishId === null) {
      return of([]);
    }
    return this.http.get<ReviewsResponse>('reviews/').pipe(
      map((response) => response.data),
      map((reviews) => {
        const filteredReviews = reviews.filter(
          (review) => review.user_id === userId && review.dish_id === dishId,
        );
        return filteredReviews.map((review) => ({ id: review.id, review }));
      }),
    );
  }
  postReview(dataToPut: {
    dish_id: number;
    user_id: number | null;
    stars: number;
  }) {
    return this.http.post('reviews/', dataToPut);
  }
  putReview(
    reviewId: number,
    dataToPut: {
      dish_id: number;
      user_id: number | null;
      stars: number;
    },
  ) {
    return this.http.put('reviews/' + reviewId, dataToPut);
  }
}
