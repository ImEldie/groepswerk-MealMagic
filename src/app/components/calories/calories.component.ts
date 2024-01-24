import { Component, OnInit, Input } from '@angular/core';
import { DishesApiService } from '../../services/api-calls/dishes-api.service';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../../interfaces/interfaces-dishes';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-calories',
  standalone: true,
  imports: [MatTooltipModule, CommonModule],
  templateUrl: './calories.component.html',
  styleUrl: './calories.component.css',
})
export class CaloriesComponent implements OnInit {
  @Input() dish: Dish | undefined;
  constructor() {} // private dishService: DishesApiService, // private route: ActivatedRoute,
  // getDish() {
  //   const id = this.route.snapshot.paramMap.get('id') || '';
  //   return this.dishService
  //     .getDishService(Number(id))
  //     .subscribe((dish: Dish) => {
  //       this.dish = dish;
  //     });
  // }
  ngOnInit() {
    // this.getDish();
    if (this.dish) {
      this.countKcal();
      this.countProtein();
      this.countCarbohydrates();
      this.countFat();
    }
  }
  countKcal() {
    let totalKcal = 0;
    for (const ingredient of this.dish?.ingredients || []) {
      totalKcal += ingredient?.kcal || 0;
    }
    return totalKcal;
  }
  countProtein() {
    let totalProtein = 0;
    for (const ingredient of this.dish?.ingredients || []) {
      totalProtein += ingredient?.protein || 0;
    }
    return totalProtein;
  }
  countCarbohydrates() {
    let totalCarbohydrates = 0;
    for (const ingredient of this.dish?.ingredients || []) {
      totalCarbohydrates += ingredient?.carbohydrates || 0;
    }
    return totalCarbohydrates;
  }
  countFat() {
    let totalFat = 0;
    for (const ingredient of this.dish?.ingredients || []) {
      totalFat += ingredient?.fat || 0;
    }
    return totalFat;
  }
  dailyPercentageKcal() {
    return this.countKcal() / 2000;
  }
  dailyPercentageProtein() {
    return this.countProtein() / 150;
  }
  dailyPercentageCarbohydrates() {
    return this.countCarbohydrates() / 250;
  }
  dailyPercentageFat() {
    return this.countFat() / 44.4;
  }
}
