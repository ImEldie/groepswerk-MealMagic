import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { Dish } from '../interfaces/interfaces-dishes';
import { AllergyIconComponent } from '../allergy-icon/allergy-icon.component';
import { MatIconModule } from '@angular/material/icon'
import { IngredientsApiService } from '../../services/api-calls/ingredients-api.service';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-dish-card',
  standalone: true,
  imports: [MatRippleModule ,AllergyIconComponent, MatButtonModule, MatCardModule, MatChipsModule, MatDividerModule, CommonModule, MatIconModule],
  templateUrl: './dish-card.component.html',
  styleUrl: './dish-card.component.css'
})
export class DishCardComponent {
  @Input() dish!: Dish;
  allergies: Array<string> = [];

  constructor(
    private ingredientAPI: IngredientsApiService,
  ){};

  ngOnInit(){
    this.ingredientAPI.getIngredientList();
    this.loadDishAllergies();
  }

  onCardClick(){
    /*
      ADD CARD ROUTING
    */
    console.log("No routing to dish-page yet...");
  }

  loadDishAllergies(): void{
    let newAllergies: Array<string> = [];

    // Check every ingredient in the dish
    setTimeout(() => {
      for (let i = 0; i < this.dish.ingredients.length; i++) {
        let ingredientData = this.ingredientAPI.getIngredientFromId(this.dish.ingredients[i].id); // Get IngredientData

        // IF ID FOUND
        if (ingredientData !== undefined) {
          // Check every allergy in ingredient
          for (let j = 0; j < ingredientData.allergies.length; j++) {
            const allergyToAdd: string = ingredientData.allergies[j].name; // Initialise current allergy
            // Check if current allergy is NOT already in list
            if (!newAllergies.includes(allergyToAdd)){
              newAllergies.push(allergyToAdd); // Push allergy to list
            }
          }
        }
      }
      this.allergies = newAllergies;
    }, 1000);
  }
}


