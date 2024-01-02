import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dish, DishApiResponse } from '../../components/interfaces-recipes';
import { map, Observable } from 'rxjs';

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
    // TEMPORARY LOGIC UNTIL BACKEND IS FIXED:
    for (let index = 0; index < this.dishes.length; index++) {
      this.dishes[index].name = "Banana";
      this.dishes[index].description = "A very exotic banana, cut like the Italians used to in 1739.";
      this.dishes[index].image_url = "https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2021/01/30152155/shutterstock_518328943-1.jpg"
    }


    return this.dishes;
  }
}
