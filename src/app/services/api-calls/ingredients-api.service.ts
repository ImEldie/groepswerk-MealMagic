import { Injectable } from '@angular/core';
import { Ingredient, IngredientApiResponse } from '../../components/interfaces/interfaces-ingredients';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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

  ngOnInit(){
    this.loadIngredientsFromAPI();
  }

  getIngredientList(): Array<Ingredient>{
    this.loadIngredientsFromAPI();
    return this.ingredients;
  }

  getIngredientFromId(searchId: number): Ingredient | undefined{
    this.loadIngredientsFromAPI();
    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].id === searchId) {
        return this.ingredients[i];
      }
    }
    return undefined;
  }

  private async loadIngredientsFromAPI(){
    const targetLink: string = "https://syntra2023.code-coaching.dev/api/group-2/ingredients/";
    const token: string = "210|cd1DqD4EWoLvZeTUtRfjPZtDSbNHaADzmwtomSTK04e8ad79";

    this.http
      .get<IngredientApiResponse>(targetLink, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map((data: IngredientApiResponse) => data.data))
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
        //console.log("Ingredients received:", this.ingredients);
      });
  }
}
