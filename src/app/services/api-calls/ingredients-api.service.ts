import { Injectable } from '@angular/core';
import { Ingredient, IngredientList } from '../../interfaces/interfaces-ingredients';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientsApiService {
  private ingredients: Array<Ingredient> = [];

  constructor(
    private http: HttpClient,
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
    this.http.get<IngredientList>('/ingredients')
      .pipe(map(d => d.data))
      .subscribe((data) => this.ingredients = data);
  }
}