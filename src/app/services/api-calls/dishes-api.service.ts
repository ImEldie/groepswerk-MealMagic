import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dish, DishApiResponse } from '../../components/interfaces-recipes';
import { map, Observable } from 'rxjs';
import { getLocaleEraNames } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DishesApiService {
  private dishes: Array<Dish> = [];

  constructor(
    private http: HttpClient,
  ) {
  }

  loadDishes(): void{
    const targetLink = "https://syntra2023.code-coaching.dev/api/group-2/dishes/";
    const token = ""; // Need login-service

    this.http
      .get<DishApiResponse>(targetLink, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map((data: DishApiResponse) => data.data))
      .subscribe((dishes: Dish[]) => {
        this.dishes = dishes;
        console.log("Dishes received: ", this.dishes);
      });
  }

  getDishList(): Array<Dish>{
    return this.dishes;
  }
}
