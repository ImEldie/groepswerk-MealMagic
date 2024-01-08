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

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [AllergyIconComponent, MatButtonModule, MatCardModule, MatChipsModule, MatDividerModule, CommonModule, MatIconModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {
  @Input() dish!: Dish;
  allergies: Array<string> = [];

  constructor(
    private ingredientAPI: IngredientsApiService,
  ){};

  ngOnInit(){
    this.loadDishAllergies();
    this.ingredientAPI.getIngredientList();
  }
  
  generateHtmlElementId(id: number): string{
    // Used to give the recipe-card a unique ID (Not used yet)
    const prefix: string = "dish-";
    return (prefix + id);
  }

  onCardClick(){ // UNFINISHED FUNCTION, will be used to get the associated allergies from the ingredients
    /*
     TO-DO: ADD CARD ROUTING
    */
    console.log("No routing to dish-page yet...");
  }

  loadDishAllergies(): void{
    let newAllergies: Array<string> = [];

    // Check every ingredient in the dish
    for (let i = 0; i < this.dish.ingredients.length; i++) {
      let ingredientData = this.ingredientAPI.getIngredientFromId(this.dish.ingredients[i].id); // Get IngredientData
      console.log(ingredientData);
      // IF ID FOUND
      if (ingredientData !== undefined) {
        // Check every allergy in ingredient
        for (let j = 0; j < ingredientData.allergies.length; j++) {
          const allergyToAdd = ingredientData.allergies[j].name; // Initialise current allergy
          // Check if current allergy is NOT already in list
          if (!newAllergies.includes(allergyToAdd)){
            newAllergies.push(allergyToAdd); // Push allergy to list
          }
        }
      }
    }

    this.allergies = newAllergies;
    console.log("Allergies for " + this.dish.name + ": " + this.allergies);
  }
}
