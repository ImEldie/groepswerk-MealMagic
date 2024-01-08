import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dish, DishApiResponse } from '../../components/interfaces/interfaces-dishes';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishesApiService {
  private dishes: Array<Dish> = [];

  constructor(
    private http: HttpClient,
  ) {}

  loadDishes(): void{
    const targetLink = "https://syntra2023.code-coaching.dev/api/group-2/dishes/";
    const token = "210|cd1DqD4EWoLvZeTUtRfjPZtDSbNHaADzmwtomSTK04e8ad79"; // Need login-service

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
