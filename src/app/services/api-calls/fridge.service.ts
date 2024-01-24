import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { FridgeIngredient, Fridge, CompactFridgeIngredient } from '../../interfaces/fridge-interface';
import { Ingredient, IngredientList } from '../../interfaces/interfaces-ingredients';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {

 constructor(
  private http: HttpClient,
  ) { }

  loadIngredients(): Observable<Array<CompactFridgeIngredient>> {
    return this.http.get<IngredientList>(`ingredients`)
    .pipe(map((response) => {
      return response.data.map((ingredient) =>  ({ id: ingredient.id, name: ingredient.name }));
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
             allergies: data.allergies,
           };
         return ingredientInfo 
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
  this.http.post<FridgeIngredient>(`ingredients-fridges`, postData);
}

getFridgeIngredients(fridgeId: number){
  return this.http.get<Fridge>(`fridges/${fridgeId}`)
  .pipe(
    map((data) => {
      return data.ingredients?.map((ingredients) => {
        const ingredientsFridgeInfo: FridgeIngredient = {
          id: ingredients.id,
          fridge_id: ingredients.fridge_id,
          ingredient_id: ingredients.ingredient_id,
          amount: ingredients.amount,
      };
      return ingredientsFridgeInfo
    })
  },))
}

  putUpdatedFridgeIngredients(ingredientsToPut: FridgeIngredient[]){
    ingredientsToPut.map(ingredient => this.putFridgeIngredient(ingredient));
  }

  private putFridgeIngredient(ingredient: FridgeIngredient) {
    const postData = {
      fridge_id: ingredient.fridge_id,
      ingredient_id: ingredient.ingredient_id,
      amount: ingredient.amount
    }
    return this.http.put("ingredients-fridges/" + ingredient.id, postData);
  }

  deleteUpdatedFridgeIngredients(ingredientsToDelete: FridgeIngredient[]){
    ingredientsToDelete.map(ingredient => this.deleteFridgeIngredient(ingredient));
  }
  private deleteFridgeIngredient(ingredient: FridgeIngredient) {
    return this.http.delete("ingredients-fridges/" + ingredient.id);
  }
}

