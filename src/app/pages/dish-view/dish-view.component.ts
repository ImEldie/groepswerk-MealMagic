import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { AllergyIconComponent } from '../../components/allergy-icon/allergy-icon.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dish } from '../../interfaces/interfaces-dishes';
import { IngredientsApiService } from '../../services/api-calls/ingredients-api.service';
import { MatRippleModule } from '@angular/material/core';
import { Ingredient } from '../../interfaces/interfaces-ingredients';
import { DishesApiService } from '../../services/api-calls/dishes-api.service';

@Component({
  selector: 'app-dish-view',
  standalone: true,
  imports: [
    MatRippleModule,
    MatDividerModule,
    MatChipsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    AllergyIconComponent,
  ],
  templateUrl: './dish-view.component.html',
  styleUrl: './dish-view.component.css',
})
export class DishViewComponent {
  getDish(): Dish | undefined {
    return this.dishAPI.getDishByID(1);
  }

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private ingredientAPI: IngredientsApiService,
    private dishAPI: DishesApiService,
  ) {}

  ngOnInit() {
    this.ingredientAPI.loadIngredientsFromAPI();
    this.dishAPI.loadDishesFromApi();
  }

  getDishAllergies(): Array<string> {
    let allergies: Array<string> = [];

    if (this.ingredientAPI.getIngredientList().length !== 0) {
      for (let i = 0; i < this.getDish()!.ingredients.length; i++) {
        const ingredientId = this.getDish()!.ingredients[i].id;
        const ingredientData =
          this.ingredientAPI.getIngredientFromId(ingredientId);

        if (ingredientData !== undefined) {
          allergies = this.getNewIngredientAllergies(ingredientData, allergies);
        }
      }
    }
    return allergies;
  }

  private getNewIngredientAllergies(
    ingredientData: Ingredient,
    allergiesToAddTo: Array<string>,
  ): Array<string> {
    for (let i = 0; i < ingredientData.allergies.length; i++) {
      const allergyToAdd: string = ingredientData.allergies[i].name;

      if (!allergiesToAddTo.includes(allergyToAdd)) {
        allergiesToAddTo.push(allergyToAdd);
      }
    }
    return allergiesToAddTo;
  }

  copyUrlToClipboard() {
    const currentUrl = window.location.href;
    this.clipboard.copy(currentUrl);

    this.snackBar.open('Recipe copied to clipboard', 'Dismiss', {
      duration: 3000,
    });
  }
}
