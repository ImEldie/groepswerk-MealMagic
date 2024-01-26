import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { FridgeService } from '../../services/api-calls/fridge.service';
import { Router } from '@angular/router';
import { FridgeIngredientsComponent } from '../../components/fridge-ingredients/fridge-ingredients.component';
import {
  ChangedFridgeIngredient,
  CompactFridgeIngredient,
  FridgeIngredient,
} from '../../interfaces/fridge-interface';

@Component({
  selector: 'app-fridge-component',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatListModule,
    FridgeIngredientsComponent,
  ],
  templateUrl: './fridge-component.component.html',
  styleUrl: './fridge-component.component.css',
})
export class FridgeComponent implements OnInit {
  @Input({ required: true }) ingredientList: Array<CompactFridgeIngredient> =
    [];
  ingredientInput = new FormControl();
  selectedIngredient: CompactFridgeIngredient = { id: 0, name: '' };
  autocompleteOptions: Array<CompactFridgeIngredient> = [];
  changedIngredients: Array<ChangedFridgeIngredient> = [];

  constructor(
    public router: Router,
    public fridgeService: FridgeService,
  ) {}

  ngOnInit() {
    this.fridgeService.loadUniqueFridgeIngredients();
    this.fridgeService.loadCompactIngredients();
    this.clearInput();
  }

  clearInput() {
    this.ingredientInput.setValue('');
  }

  setSelectedIngredient(ingredient: CompactFridgeIngredient) {
    this.selectedIngredient = ingredient;
    this.postIngredient();
  }

  postIngredient() {
    const selectedOption = this.ingredientInput.value;
    const selectedIngredient = this.fridgeService
      .getCompactIngredients()
      .find((ingredientList) => ingredientList.name === selectedOption);
    const fridgeIngredientIdList = this.fridgeService
      .getIngredientsInFridge()
      .map((d) => d.ingredient_id);

    if (selectedIngredient && fridgeIngredientIdList) {
      const ingredientNotInFridge = !fridgeIngredientIdList.includes(
        selectedIngredient.id,
      );
      if (ingredientNotInFridge) {
        this.fridgeService.postIngredientsFridge(selectedIngredient.id);
      }
    }
  }

  setNewIngredientAmount(newAmount: number, index: number) {
    if (this.fridgeService.getIngredientsInFridge()) {
      this.updateChangedIngredientsList(
        newAmount,
        this.fridgeService.getIngredientsInFridge()[index],
      );
      this.fridgeService.getIngredientsInFridge()[index].amount = newAmount;
    }
  }
  private updateChangedIngredientsList(
    newAmount: number,
    fridgeIngredient: FridgeIngredient,
  ) {
    const ingredientAlreadyChanged = this.changedIngredients
      .map((ingredient) => ingredient.id)
      .includes(fridgeIngredient.id);
    const ingredientId = fridgeIngredient.id;
    if (ingredientAlreadyChanged) {
      const index = this.changedIngredients.findIndex(
        (ingredient) => ingredient.id === ingredientId,
      );
      this.changedIngredients[index].new_amount = newAmount;
      const newAmountEqualToOriginal =
        this.changedIngredients[index].new_amount ===
        this.changedIngredients[index].original_amount;
      if (newAmountEqualToOriginal) {
        this.changedIngredients.splice(index, 1);
      }
    } else {
      const changedIngredient = {
        id: ingredientId,
        new_amount: newAmount,
        original_amount: fridgeIngredient.amount,
      };
      this.changedIngredients.push(changedIngredient);
    }
  }
  disableFridgeButtons() {
    return this.changedIngredients.length === 0;
  }

  saveFridgeToApi() {
    let ingredientsToDelete: Array<FridgeIngredient> = [];
    let ingredientAmountsToPut: Array<FridgeIngredient> = [];

    const changedIngredientIds = this.changedIngredients.map((i) => i.id);

    if (this.fridgeService.getIngredientsInFridge()) {
      for (
        let i = 0;
        i < this.fridgeService.getIngredientsInFridge().length;
        i++
      ) {
        const amount = this.fridgeService.getIngredientsInFridge()[i].amount;

        if (amount <= 0) {
          ingredientsToDelete.push(
            this.fridgeService.getIngredientsInFridge()[i],
          );
        } else {
          const currentIngredientIsChanged = changedIngredientIds.includes(
            this.fridgeService.getIngredientsInFridge()[i].id,
          );
          if (currentIngredientIsChanged) {
            ingredientAmountsToPut.push(
            this.fridgeService.getIngredientsInFridge()[i],
          );
          }
        }
        this.changedIngredients = [];
      }
      this.fridgeService
        .putUpdatedFridgeIngredients(ingredientAmountsToPut)
        .subscribe(() => this.fridgeService.loadUniqueFridgeIngredients());
      this.fridgeService
        .deleteUpdatedFridgeIngredients(ingredientsToDelete)
        .subscribe(() => this.fridgeService.loadUniqueFridgeIngredients());
    }
  }
  updateFilteredIngredientsList() {
    const selectedIngredientIds = this.fridgeService
      .getIngredientsInFridge()
      .map((ingredient) => ingredient.ingredient_id);
    const unselectedIngredients = this.ingredientList.filter(
      (ingredient) => !selectedIngredientIds.includes(ingredient.id),
    );
    if (this.ingredientInput.value) {
      const searchInput = this.ingredientInput.value.toLowerCase();
      const filteredIngredientsByInput = unselectedIngredients.filter(
        (ingredient) => ingredient.name.toLowerCase().includes(searchInput),
      );
      this.autocompleteOptions = filteredIngredientsByInput;
    } else {
      this.autocompleteOptions = unselectedIngredients;
    }
  }
}
