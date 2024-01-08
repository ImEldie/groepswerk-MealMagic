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
    return this.loadIngredientsFromAPI();
  }

  getIngredientFromId(searchId: number): Ingredient | undefined{
    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].id === searchId) {
        return this.ingredients[i];
      }
    }
    return undefined;
  }

  private loadIngredientsFromAPI(): Ingredient[]{
    this.ingredientObservable().subscribe((data: Ingredient[]) => {
      this.ingredients = data;
      console.log(this.ingredients);
    }
    );

    return this.ingredients;
  }

  private ingredientObservable(): Observable<Ingredient[]>{
    const targetLink: string = "https://syntra2023.code-coaching.dev/api/group-2/ingredients/";
    const token: string = "210|cd1DqD4EWoLvZeTUtRfjPZtDSbNHaADzmwtomSTK04e8ad79";

    return this.http
      .get<IngredientApiResponse>(targetLink, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map((data: IngredientApiResponse) => data.data));
  }
}
