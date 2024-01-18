import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dish, DishApiResponse } from '../../components/interfaces/interfaces-dishes';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';
import { ApiRequestsService } from '../api-requests/api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class DishesApiService {
  private dishes: Array<Dish> = [];

  constructor(
    private api: ApiRequestsService,
    private auth: AuthService
  ) {
    this.loadDishesFromApi();
  }

  loadDishesFromApi(): void{
    this.api.getFromApi('/dishes')
      .subscribe((dishes: Array<Dish>) => {this.dishes = dishes;});
  }

  getDishList(): Array<Dish>{
    return this.dishes;
  }
}
