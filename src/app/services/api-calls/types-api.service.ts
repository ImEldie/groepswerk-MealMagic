import { Injectable } from '@angular/core';
import { DishType } from '../../interfaces/interfaces-types';
import { ApiRequestsService } from '../functions/api-requests-service/api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class TypesApiService {
  private types: Array<DishType> = [];

  constructor(
    private api: ApiRequestsService
  ) {
    this.loadTypesFromApi();
  }

  loadTypesFromApi(){
    this.api.get("types")
      .subscribe((dishes: Array<DishType>) => {
        this.types = dishes;
      });
  }

  getTypesList(): Array<DishType>{
    return this.types;
  }
}
