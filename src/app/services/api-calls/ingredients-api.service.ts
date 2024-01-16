import { Injectable } from '@angular/core';
import { Ingredient, IngredientApiResponse } from '../../interfaces/interfaces-ingredients';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsApiService {
  private ingredients: Array<Ingredient> = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
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
    const targetLink: string = "https://syntra2023.code-coaching.dev/api/group-2/ingredients/";
    const token = this.auth.getBearerToken();

    this.http
      .get<IngredientApiResponse>(targetLink, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map((data: IngredientApiResponse) => data.data))
      .subscribe((data: Ingredient[]) => {
        this.ingredients = data;
      });
  }
}