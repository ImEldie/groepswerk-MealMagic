import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { Dish } from '../../interfaces/interfaces-dishes';
import { AllergyIconComponent } from '../allergy-icon/allergy-icon.component';
import { MatIconModule } from '@angular/material/icon';
import { IngredientsApiService } from '../../services/api-calls/ingredients-api.service';
import { MatRippleModule } from '@angular/material/core';
import { Ingredient } from '../../interfaces/interfaces-ingredients';

@Component({
  selector: 'app-dish-card',
  standalone: true,
  imports: [
    MatRippleModule,
    AllergyIconComponent,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './dish-card.component.html',
  styleUrl: './dish-card.component.css',
})
export class DishCardComponent {
  @Input() dish!: Dish;

  constructor(private ingredientAPI: IngredientsApiService) {}

  ngOnInit() {
    this.ingredientAPI.loadIngredientsFromAPI();
  }

  getDishAllergies(): Array<string> {
    let allergies: Array<string> = [];

    if (this.ingredientAPI.getIngredientList().length !== 0) {
      for (let i = 0; i < this.dish.ingredients.length; i++) {
        const ingredientId = this.dish.ingredients[i].id;
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
}
