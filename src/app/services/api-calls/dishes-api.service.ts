import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dish, DishApiResponse } from '../../interfaces/interfaces-dishes';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';
import { StepsApiService } from './steps-api.service';
import { DishStep } from '../../interfaces/interfaces-steps';

@Injectable({
  providedIn: 'root'
})
export class DishesApiService {
  private dishes: Array<Dish> = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private stepsApi: StepsApiService
  ) {
    this.loadDishesFromApi();
  }

  loadDishesFromApi(): void{
    const targetLink = "https://syntra2023.code-coaching.dev/api/group-2/dishes/";
    const token = this.auth.getBearerToken();

    this.http
      .get<DishApiResponse>(targetLink, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map((data: DishApiResponse) => data.data))
      .subscribe((dishes: Dish[]) => {
        this.dishes = dishes;
      });
  }

  postNewDish(postData: any, stepsToPost: Array<DishStep>){

    this.stepsApi.postSteps(stepsToPost);
    
  }

  getDishList(): Array<Dish>{
    return this.dishes;
  }
}
