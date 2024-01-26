import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Review } from '../../../interfaces/interfaces-user-details';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReviewsApiService } from '../../../services/api-calls/reviews-api.service';
import { LocalstorageService } from '../../../services/functions/localstorage.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dish-reviews',
  standalone: true,
  imports: [ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './dish-reviews.component.html',
  styleUrl: './dish-reviews.component.css',
})
export class DishReviewsComponent implements OnInit {
  userReviews: Array<{ id: number; review: Review }> = [];
  starRatingForm?: FormGroup<number>;
  loadedRating: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewsApiService,
    private storage: LocalstorageService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.getUserReview();
    this.starRatingForm = this.formBuilder.group(0);
  }
  getUserReview() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.reviewService
      .getUserReviews(this.storage.userId.get(), Number(id))
      .subscribe((userReviewsWithId) => {
        this.userReviews = userReviewsWithId;
        if (userReviewsWithId.length > 0) {
          const userReviewStars = this.userReviews[0].review.stars;
          this.loadedRating = userReviewStars;
          this.starRatingForm?.setValue(userReviewStars);
        }
      });
  }
  onRatingChange(event: any) {
    const newRating = parseInt(event.target.value, 10);
    const id = this.route.snapshot.paramMap.get('id') || '';
    const hasUserReview = this.userReviews.length > 0;
    if (hasUserReview) {
      const reviewId = this.userReviews[0].id;
      const updatedReview = {
        dish_id: Number(id),
        user_id: this.storage.userId.get(),
        stars: newRating,
      };
      this.reviewService.putReview(reviewId, updatedReview).subscribe();
      this.loadedRating = newRating;
    } else {
      const newReview = {
        dish_id: Number(id),
        user_id: this.storage.userId.get(),
        stars: newRating,
      };
      this.reviewService.postReview(newReview).subscribe();
      this.loadedRating = newRating;
      this.getUserReview();
    }
  }
}
