import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Review } from '../../interfaces/user-details-interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReviewsService } from '../../services/api-calls/reviews-api.service';
import { LocalstorageService } from '../../services/functions/localstorage.service';
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
  starRatingForm!: FormGroup;
  loadedRating: number | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewsService,
    private storage: LocalstorageService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.getUserReview();
    this.starRatingForm = this.formBuilder.group({
      rating: [null],
    });
  }
  get ratingControl() {
    return this.starRatingForm.get('rating') as FormControl;
  }
  getUserReview() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.reviewService
      .getUserReviews(this.storage.userId.get(), Number(id))
      .subscribe((userReviewsWithId) => {
        this.userReviews = userReviewsWithId;
        if (userReviewsWithId.length > 0) {
          const userReviewStars = this.userReviews[0].review.stars;
          this.ratingControl.setValue(userReviewStars);
          this.loadedRating = userReviewStars;
        }
      });
  }
  onRatingChange() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    const hasUserReview = this.userReviews.length > 0;
    if (hasUserReview) {
      const reviewId = this.userReviews[0].id;
      const updatedReview = {
        dish_id: Number(id),
        user_id: this.storage.userId.get(),
        stars: this.starRatingForm.value.rating,
      };
      this.reviewService.putReview(reviewId, updatedReview).subscribe();
      this.loadedRating = updatedReview.stars;
    } else {
      const newReview = {
        dish_id: Number(id),
        user_id: this.storage.userId.get(),
        stars: this.starRatingForm.value.rating,
      };
      this.reviewService.postReview(newReview).subscribe();
      this.loadedRating = newReview.stars;
      this.getUserReview();
    }
  }
}
