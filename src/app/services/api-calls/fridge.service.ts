import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import {
  FridgeIngredient,
  Fridge,
  CompactFridgeIngredient,
} from '../../interfaces/fridge-interface';
import {
  IngredientList,
} from '../../interfaces/interfaces-ingredients';
import { LocalstorageService } from '../functions/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class FridgeService {
  private ingredientsInFridge: Array<FridgeIngredient> = [];
  private compactIngredientList: Array<CompactFridgeIngredient> = [];

  constructor(
    private http: HttpClient,
    private storage: LocalstorageService,
  ) {}

  loadCompactIngredients() {
    this.getCompactIngredientsFromApi().subscribe({
      next: (response) => {
        this.compactIngredientList = response;
      },
    });
  }

  private getCompactIngredientsFromApi(): Observable<
    Array<CompactFridgeIngredient>
  > {
    return this.http.get<IngredientList>(`ingredients`).pipe(
      map((response) => {
        return response.data.map((ingredient) => ({
          id: ingredient.id,
          name: ingredient.name,
        }));
      }),
    );
  }

  postIngredientsFridge(ingredientId: number) {
    const postData = {
      fridge_id: this.storage.fridgeId.get(),
      ingredient_id: ingredientId,
      amount: 100,
    };
    this.http
      .post<FridgeIngredient>(`ingredients-fridges`, postData)
      .subscribe(() => this.loadUniqueFridgeIngredients());
  }

  loadUniqueFridgeIngredients() {
    this.getUniqueFridgeIngredientsFromApi().subscribe((response) => {
      this.ingredientsInFridge = response;
    });
  }

  private getUniqueFridgeIngredientsFromApi() {
    return this.http.get<Fridge>(`fridges/${this.storage.fridgeId.get()}`).pipe(
      map((data) => {
        return data.ingredients?.map((ingredients) => {
          const ingredientsFridgeInfo: FridgeIngredient = {
            id: ingredients.id,
            fridge_id: ingredients.fridge_id,
            ingredient_id: ingredients.ingredient_id,
            amount: ingredients.amount,
          };
          return ingredientsFridgeInfo;
        });
      }),
    );
  }

  putUpdatedFridgeIngredients(ingredientsToPut: Array<FridgeIngredient>) {
    return forkJoin(
      ingredientsToPut.map((ingredient) =>
        this.putFridgeIngredient(ingredient),
      ),
    );
  }

  private putFridgeIngredient(ingredient: FridgeIngredient) {
    const postData = {
      fridge_id: ingredient.fridge_id,
      ingredient_id: ingredient.ingredient_id,
      amount: ingredient.amount,
    };
    return this.http.put('ingredients-fridges/' + ingredient.id, postData);
  }

  deleteUpdatedFridgeIngredients(ingredientsToDelete: Array<FridgeIngredient>) {
    return forkJoin(
      ingredientsToDelete.map((ingredient) =>
        this.deleteFridgeIngredient(ingredient),
      ),
    );
  }

  private deleteFridgeIngredient(ingredient: FridgeIngredient) {
    return this.http.delete('ingredients-fridges/' + ingredient.id);
  }

  getFridgeIngredients(): Observable<Array<FridgeIngredient>> {
    const fridgeId = this.storage.fridgeId.get();
    return this.http
      .get<Fridge>('fridges/' + fridgeId)
      .pipe(map((response) => response.ingredients));
  }

  getIngredientsInFridge() {
    return this.ingredientsInFridge;
  }

  getCompactIngredients() {
    return this.compactIngredientList;
  }
}
