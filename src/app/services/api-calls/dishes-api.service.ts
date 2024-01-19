import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dish, DishApiResponse, DishPostData } from '../../interfaces/interfaces-dishes';
import { Observable, forkJoin, map } from 'rxjs';
import { AuthService } from './auth.service';
import { StepsApiService } from './steps-api.service';
import { DishStep, Step } from '../../interfaces/interfaces-steps';
import { Ingredient } from '../../interfaces/interfaces-ingredients';
import { Router } from '@angular/router';
import { ApiRequestsService } from '../functions/api-requests-service/api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class DishesApiService {
  private dishes: Array<Dish> = [];

  constructor(
    private api: ApiRequestsService,
    private stepsApi: StepsApiService,
    private router: Router
  ) {}

  loadDishesFromApi(): void{
    this.api.get('dishes')
      .subscribe((dishes: Array<Dish>) => {this.dishes = dishes;});
  }
  getDishList(): Array<Dish>{
    return this.dishes;
  }

  postNewDish(postData: DishPostData, stepsToPost: Array<DishStep>){
    forkJoin(this.stepsApi.postDishSteps(stepsToPost)).subscribe(
      (result: Array<Step>) => {
        result.sort((a, b) => a.order - b.order);
        postData.dish_steps = result.map((step) => step.id);
        this.postDish(postData);
      },
    )
  }
  private postDish(postData: DishPostData){
    this.api.post('/dishes/', postData)
    .subscribe(() => {
        this.router.navigate(['']);
      });
  }
  convertToIdArray(arrayToConvert: Array<Step|Ingredient>): Array<number> {
    let idArray: Array<number> = arrayToConvert.map((data) => data.id);
    return idArray;
  }
}