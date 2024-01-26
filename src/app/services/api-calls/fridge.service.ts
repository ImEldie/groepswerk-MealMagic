import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { FridgeIngredient, Fridge } from '../../interfaces/fridge-interface';
import { LocalstorageService } from '../functions/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {
  constructor(
    private http: HttpClient,
    private storage: LocalstorageService,
  ) {}

  postIngredientsFridge(
    fridgeId: number,
    ingredientId: number,
    amount: number) {
    
    const postData = {
      fridge_id: fridgeId,
      ingredient_id: ingredientId,
      amount: amount
    }
    this.http.post<FridgeIngredient>(`ingredients-fridges`, postData).subscribe();
  }

  getUniqueFridgeIngredients(fridgeId: number){
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
    return forkJoin(ingredientsToPut.map(ingredient => this.putFridgeIngredient(ingredient)));
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
    return forkJoin(ingredientsToDelete.map(ingredient => this.deleteFridgeIngredient(ingredient)));
  }

  private deleteFridgeIngredient(ingredient: FridgeIngredient) {
    return this.http.delete("ingredients-fridges/" + ingredient.id);
  }

  getFridgeIngredients(): Observable<Array<FridgeIngredient>> {
    const fridgeId = this.storage.fridgeId.get();
    return this.http
      .get<Fridge>('fridges/' + fridgeId)
      .pipe(map((response) => response.ingredients));
  }
}