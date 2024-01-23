import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { IngredientInfo, Ingredient, Ingredients, Fridge } from '../../interfaces/fridge-interface';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {

 constructor(
  private http: HttpClient,
  
  ) { }

  loadIngredients(): Observable<Array<{ id: number, name: string }>> {
    
    return this.http.get<IngredientInfo>(`ingredients`)
    .pipe(map((data) => {
      return data.data.map((ingredient) =>  ({ id: ingredient.id, name: ingredient.name }));
  }))
  }
 
 getIngredientDetails(id: number): Observable<Ingredient> {
  return this.http.get<Ingredient>(`ingredients/${id}`)
  .pipe(map
    ((data) => {
       const ingredientInfo: Ingredient = { 
             id: data.id,
             name: data.name,
             kcal: data.kcal,
             protein: data.protein,
             carbohydrates: data.carbohydrates,
             fat: data.fat,
             allergy_ids: data.allergy_ids,
           };
         return  ingredientInfo 
        })
    );
  }

 postIngredientsFridge(
  fridgeId: number,
  ingredientId: number,
  amount: number) {
  
  const postData = {
    fridge_id: fridgeId,
    ingredient_id: ingredientId,
    amount: amount
  }
  this.http.post<Ingredients>(`ingredients-fridges`, postData);
}

getIngredientIdsInFridge(fridgeId: number){
  return this.http.get<Fridge>(`fridges/${fridgeId}`)
  .pipe(
    map((data) => {
      return data.ingredients?.map((ingredients) => {
        const ingredientsFridgeInfo: Ingredients = {
          id: ingredients.id,
          fridge_id: ingredients.fridge_id,
          ingredient_id: ingredients.ingredient_id,
          amount: ingredients.amount,
      };
      return ingredientsFridgeInfo
    })
  },))
}

  putUpdatedFridgeIngredients(ingredientsToPut: Ingredients[]){
    const observables = ingredientsToPut.map(ingredient => this.putFridgeIngredient(ingredient));
    forkJoin(observables)
  }

  private putFridgeIngredient(ingredient: Ingredients) {
    const postData = {
      fridge_id: ingredient.fridge_id,
      ingredient_id: ingredient.ingredient_id,
      amount: ingredient.amount
    }
    return this.http.put("ingredients-fridges/" + ingredient.id, postData);
  }

  deleteUpdatedFridgeIngredients(ingredientsToDelete: Ingredients[]){
    const observables = ingredientsToDelete.map(ingredient => this.deleteFridgeIngredient(ingredient));
    forkJoin(observables)
  }
  private deleteFridgeIngredient(ingredient: Ingredients) {
    return this.http.delete("ingredients-fridges/" + ingredient.id);
  }
}

