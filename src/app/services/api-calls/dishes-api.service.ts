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
    /*
      ### TEMPORARY LOGIC UNTIL BACKEND IS FIXED ###
    */
    for (let index = 0; index < this.dishes.length; index++) {
      this.dishes[index].name = "Banana";
      this.dishes[index].description = "Lorem ipsum dolor sit amet. Et obcaecati earum sit voluptatibus omnis aut dicta internos qui necessitatibus internos et molestiae officiis et numquam vero. Sed nemo corrupti qui ipsam repellendus qui odit incidunt ut provident galisum! Ut maiores tenetur et beatae quae et impedit nesciunt rem dolores architecto aut Quis voluptates quo libero officiis et illo enim?";
      this.dishes[index].image_url = "https://cdn.mos.cms.futurecdn.net/YDFk8cgmSKu8VYFVedUQ8j-1200-80.jpg"
    }
    /*
      ###############################################
    */
    return this.dishes;
  }
}
