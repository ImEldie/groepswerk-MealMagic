import { Injectable } from '@angular/core';
import {
  Dish,
  DishList,
  DishPostData,
} from '../../interfaces/interfaces-dishes';
import { Observable, forkJoin, map } from 'rxjs';
import { StepsApiService } from './steps-api.service';
import { DishStep, Step } from '../../interfaces/interfaces-steps';
import { Ingredient } from '../../interfaces/interfaces-ingredients';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DishesApiService {
  private dishes: Array<Dish> = [];

  constructor(
    private http: HttpClient,
    private stepsApi: StepsApiService,
    private router: Router,
  ) {}

  loadDishesFromApi(): void {
    this.http
      .get<DishList>('dishes')
      .pipe(map((d) => d.data))
      .subscribe((dishes) => (this.dishes = dishes));
  }

  getDishList(): Array<Dish> {
    return this.dishes;
  }

  postNewDish(postData: DishPostData, stepsToPost: Array<DishStep>) {
    forkJoin(this.stepsApi.postDishSteps(stepsToPost)).subscribe(
      (result: Array<Step>) => {
        result.sort((a, b) => a.order - b.order);
        postData.dish_steps = result.map((step) => step.id);
        this.postDish(postData);
      },
    );
  }
  private postDish(postData: DishPostData) {
    this.http.post('/dishes', postData).subscribe(() => {
      this.router.navigate(['']);
    });
  }
  convertToIdArray(arrayToConvert: Array<Step | Ingredient>): Array<number> {
    let idArray: Array<number> = arrayToConvert.map((data) => data.id);
    return idArray;
  }

  GetDishService(dishId: number): Observable<Dish> {
    return this.http.get<Dish>('dishes/' + dishId);
  }
}