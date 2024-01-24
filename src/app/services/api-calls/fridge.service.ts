import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { FridgeIngredient, Fridge, CompactFridgeIngredient, Fridges } from '../../interfaces/fridge-interface';
import { Ingredient, IngredientList } from '../../interfaces/interfaces-ingredients';
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

  getFridgeIdFromFridges(): Observable<Fridge | null> {
    return this.http.get<Fridges>('fridges/').pipe(
      map((response) => {
        let fridge = response.data.find(
          (object) => object.user_detail_id === this.storage.userId.get(),
        );
        return fridge ? fridge : null;
      }),
    );
  }

  getFridgeIngredients(): Observable<Array<FridgeIngredient>> {
    return this.getFridgeIdFromFridges().pipe(
      switchMap((fridge) => {
        if (fridge !== null) {
          return this.http
            .get<Fridge>('fridges/' + fridge.id)
            .pipe(map((response) => response.ingredients));
        } else {
          return of([]);
        }
      }),
    );
  }
}