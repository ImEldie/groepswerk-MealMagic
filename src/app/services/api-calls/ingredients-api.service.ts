import { Injectable } from '@angular/core';
import { Ingredient } from '../../interfaces/interfaces-ingredients';
import { ApiRequestsService } from '../functions/api-requests-service/api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsApiService {
  private ingredients: Array<Ingredient> = [];

  constructor(
    private api: ApiRequestsService,
  ) {
    this.loadIngredientsFromAPI();
  }

  getIngredientList(): Array<Ingredient>{
    return this.ingredients;
  }
  getIngredientFromId(searchId: number): Ingredient | undefined{
    const searchedIngredient = this.ingredients.find(ingredient => ingredient.id === searchId);
    return searchedIngredient;
  }
  loadIngredientsFromAPI(): void{
    this.api.get('/ingredients')
      .subscribe((data: Array<Ingredient>) => {this.ingredients = data;});
  }
}