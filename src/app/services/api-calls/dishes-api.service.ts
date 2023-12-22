import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dish, DishApiResponse } from '../../components/interfaces-recipes';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishesApiService {
  dishes: Array<Dish> = [];

  constructor(
    private http: HttpClient,
  ) {
  }

  ngOnInit(){
    //this.loadDishes();
  }

  loadDishes(){
    const targetLink = "https://syntra2023.code-coaching.dev/api/group-2/dishes/";
    const token = "207|VH2eq0flnZCdPnYCAVcMGV9YHyZr5xx5OZhJ2EUw7055b0e3";

    this.http
      .get<DishApiResponse>(targetLink, {
        headers:  new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .subscribe((response: DishApiResponse) => {
        this.dishes = response.data.map((d) => {
          const dish = {
            id: d.id,
            name: "Sliced Banana",
            image_url: "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTYSv-kmEqeAj6NRr09yPqvo3HGVdDsuw9ZGKRfpl9EtI6zttIJyRv7WSCMK_4eAsrm",
            description: "A banana, exotically sliced into pieces just like mama used to make back in Sicily",
            prepTime: d.prepTime,
            portionSize: d.portionSize,
            season: d.season,
            ingredients: d.ingredients,
            types: d.types,
            steps: d.steps
          } satisfies Dish;
          console.log(dish);
          return dish;
        })
      })
  }

  getDishList(): Array<Dish>{
    console.log(this.dishes);
    return this.dishes;
  }
}
