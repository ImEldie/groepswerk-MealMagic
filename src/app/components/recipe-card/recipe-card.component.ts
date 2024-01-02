import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { Dish } from '../interfaces-recipes';
import { AllergyIconComponent } from '../allergy-icon/allergy-icon.component';
import { MatIconModule } from '@angular/material/icon'

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

  ngOnInit(){
    this.loadDishAllergies();
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

  loadDishAllergies(): void{ // UNFINISHED FUNCTION

    /*
      TO-DO: API-Calls to get the allergies associated with this dish's ingredients
    */

    /* ### TEMPORARY HARD-CODED LOGIC ###*/
    const randomAmount = Math.round((Math.random()*3)); // MAKE RANDOM AMOUNT OF ALLERGIES
    for (let index = 0; index < randomAmount; index++) { // ADD RANDOM ALLERGIES TO ARRAY
      const randomInt = Math.round((Math.random()*14));
      let allergy: string;
      switch (randomInt){
        case 1:
          allergy = "CELERY";
          break;
        case 2:
          allergy = "CRUSTACEANS";
          break;
        case 3:
          allergy = "EGG";
          break;
        case 4:
          allergy = "FISH";
          break;
        case 5:
          allergy = "GLUTEN";
          break;
        case 6:
          allergy = "LUPIN";
          break;
        case 7:
          allergy = "MILK";
          break;
        case 8:
          allergy = "MOLLUSCS";
          break;
        case 9:
          allergy = "MUSTARD";
          break;
        case 10:
          allergy = "NUTS";
          break;
        case 11:
          allergy = "PEANUTS";
          break;
        case 12:
          allergy = "SESAME";
          break;
        case 13:
          allergy = "SOYA";
          break;
        case 14:
          allergy = "SULPHITE"
          break;
        default:
          allergy = "GLUTEN";
      }
      this.allergies.push(allergy);
    }
    /* ################################# */

    console.log("Allergies for " + this.dish.name + ": " + this.allergies);
  }
}
