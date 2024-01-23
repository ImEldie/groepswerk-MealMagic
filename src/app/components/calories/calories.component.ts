import { Component, OnInit } from '@angular/core';
import { DishesApiService } from '../../services/api-calls/dishes-api.service';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../../interfaces/interfaces-dishes';
@Component({
  selector: 'app-calories',
  standalone: true,
  imports: [],
  templateUrl: './calories.component.html',
  styleUrl: './calories.component.css',
})
export class CaloriesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dishService: DishesApiService,
  ) {}
  dish!: Dish;
  getDish() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    return this.dishService
      .GetDishService(Number(id))
      .subscribe((dish: Dish) => {
        this.dish = dish;
      });
  }
  ngOnInit() {
    this.getDish();
    this.countKcal();
    this.countProtein();
    this.countCarbohydrates();
    this.countFat();
  }
  countKcal() {
    let totalKcal = 0;
    for (let i = 0; i < this.dish.ingredients.length; i++) {
      totalKcal += this.dish.ingredients[i].kcal;
    }
    return totalKcal;
  }
  countProtein() {
    let totalProtein = 0;
    for (let i = 0; i < this.dish.ingredients.length; i++) {
      totalProtein += this.dish.ingredients[i].protein;
    }
    return totalProtein;
  }
  countCarbohydrates() {
    let totalCarbohydrates = 0;
    for (let i = 0; i < this.dish.ingredients.length; i++) {
      totalCarbohydrates += this.dish.ingredients[i].carbohydrates;
    }
    return totalCarbohydrates;
  }
  countFat() {
    let totalFat = 0;
    for (let i = 0; i < this.dish.ingredients.length; i++) {
      totalFat += this.dish.ingredients[i].fat;
    }
    return totalFat;
  }
}
