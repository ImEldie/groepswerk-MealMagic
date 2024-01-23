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
  ngOnInit() {
    this.countKcal();
    // const id = this.route.snapshot.paramMap.get('id') || '';
    return this.dishService.GetDishService(1).subscribe((dish) => {
      this.dish = dish;
      console.log(this.dish);
    }); // XXX HARDCODEDD XXX
  }
  countKcal() {
    let totalKcal = 0;
    for (let i = 0; i < this.dish.ingredients.length; i++) {
      totalKcal += this.dish.ingredients[i].kcal;
    }
    console.log('Total kcal: ' + totalKcal);
  }
  countProtein() {
    let totalProtein = 0;
    for (let i = 0; i < this.dish.ingredients.length; i++) {
      totalProtein += this.dish.ingredients[i].protein;
    }
    console.log('Total protein: ' + totalProtein);
  }
  countCarbohydrates() {
    let totalCarbohydrates = 0;
    for (let i = 0; i < this.dish.ingredients.length; i++) {
      totalCarbohydrates += this.dish.ingredients[i].carbohydrates;
    }
    console.log('Total Carbohydrates: ' + totalCarbohydrates);
  }
  countFat() {
    let totalFat = 0;
    for (let i = 0; i < this.dish.ingredients.length; i++) {
      totalFat += this.dish.ingredients[i].fat;
    }
    console.log('Total Fat: ' + totalFat);
  }
}
