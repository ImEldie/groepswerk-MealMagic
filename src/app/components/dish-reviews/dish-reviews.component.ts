import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Review } from '../../interfaces/user-details-interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReviewsService } from '../../services/api-calls/reviews-api.service';
@Component({
  selector: 'app-dish-reviews',
  standalone: true,
  imports: [ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './dish-reviews.component.html',
  styleUrl: './dish-reviews.component.css',
})
export class DishReviewsComponent implements OnInit {
  userReviews: Array<Review> = [];
  starRatingForm!: FormGroup;
  loadedRating: number | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewsService,
    private auth: AuthService,
  ) {}
  ngOnInit() {
    this.getUserReview();
    this.starRatingForm = this.formBuilder.group({
      rating: [null],
    });
    console.log('test: ', this.ratingControl.value);
  }
  get ratingControl() {
    return this.starRatingForm.get('rating') as FormControl;
  }
  getUserReview() {
    this.reviewService
      .getUserReviews(this.auth.getStoredId(), 1) //DishId 1 XX HARDCODED
      .subscribe((filteredReviews: Array<Review>) => {
        this.userReviews = filteredReviews;
        if (filteredReviews.length > 0) {
          const userReviewStars = this.userReviews[0].stars;
          this.ratingControl.setValue(userReviewStars);
          this.loadedRating = userReviewStars;
        }
      });
  }
  onRatingChange() {
    const hasUserReview = this.userReviews.length > 0;
    if (hasUserReview) {
      const updatedReview = {
        dish_id: 1,
        user_id: this.auth.getStoredId(),
        stars: this.starRatingForm.value.rating,
      }; //DishId 1 XX HARDCODED HALEN UIT DISHPAGE
      console.log(updatedReview);
      this.reviewService.putReview(updatedReview).subscribe();
      this.loadedRating = updatedReview.stars;
    } else {
      const newReview = {
        dish_id: 1,
        user_id: this.auth.getStoredId(),
        stars: this.starRatingForm.value.rating,
      }; //DishId 1 XX HARDCODED HALEN UIT DISHPAGE
      this.reviewService.postReview(newReview).subscribe();
      this.loadedRating = newReview.stars;
    }
  }
}
