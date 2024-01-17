import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dish, DishApiResponse, DishPostData } from '../../interfaces/interfaces-dishes';
import { Observable, forkJoin, map } from 'rxjs';
import { AuthService } from '../auth.service';
import { StepsApiService } from './steps-api.service';
import { DishStep, Step } from '../../interfaces/interfaces-steps';
import { Ingredient } from '../../interfaces/interfaces-ingredients';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DishesApiService {
  private dishes: Array<Dish> = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private stepsApi: StepsApiService,
    private router: Router
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
  getDishList(): Array<Dish>{
    return this.dishes;
  }

  postNewDish(postData: DishPostData, stepsToPost: Array<DishStep>){
    const StepsObservables: Array<Observable<Step>> = this.stepsApi.createPostObservables(stepsToPost);

    forkJoin(StepsObservables).subscribe(
      (result: Array<Step>) => {
        result.sort((a, b) => a.order - b.order);
        postData.dish_steps = result.map((step) => step.id);
        console.log(postData);

        this.postDish(postData);
      },
    )
  }
  private postDish(postData: DishPostData){
    const targetLink = "https://syntra2023.code-coaching.dev/api/group-2/dishes/";
    const token = this.auth.getBearerToken();

    this.http
    .post<DishPostData>(targetLink, 
      {
        name: postData.name,
        image_url: postData.image_url,
        description: postData.description,
        duration: postData.duration,
        amount_of_people: postData.amount_of_people,
        season_id: postData.season_id,
        ingredients: postData.ingredients,
        dish_types: postData.dish_types,
        dish_steps: postData.dish_steps
      },
      {
        headers: new HttpHeaders(
          { Authorization: "Bearer " + token }
        )
      }
    )
    .subscribe((result) => {
        console.log(result);
        this.loadDishesFromApi();
        this.router.navigate(['']);
      });
  }
  convertToIdArray(arrayToConvert: Array<Step|Ingredient>): Array<number> {
    let idArray: Array<number> = arrayToConvert.map((data) => data.id);
    return idArray;
  }
}
