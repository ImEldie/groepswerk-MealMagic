import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dish, DishApiResponse } from '../../interfaces/interfaces-dishes';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class DishesApiService {
  private dishes: Array<Dish> = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {
    this.loadDishesFromApi();
  }

  loadDishesFromApi(): void {
    const targetLink =
      'https://syntra2023.code-coaching.dev/api/group-2/dishes/';
    const token = this.auth.getBearerToken();

    this.http
      .get<DishApiResponse>(targetLink, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map((data: DishApiResponse) => data.data))
      .subscribe((dishes: Array<Dish>) => {
        this.dishes = dishes;
      });
  }

  getDishList(): Array<Dish> {
    return this.dishes;
  }

  getDishByID(id: number): Dish | undefined {
    let dish;
    for (let i = 0; i < this.dishes.length; i++) {
      const currentId = this.dishes[i].id;
      if (currentId === id) {
        dish = this.dishes[i];
        break;
      }
    }
    return dish;
  }
}
