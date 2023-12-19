import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { Recipe } from '../../components/interfaces-recipes';
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RecipeCardComponent, MatToolbarModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  // Internal Variables
  recipeList: Array<Recipe> = []

  // Constructor
  constructor(){
    // TEST VALUES FOR RECIPES (NO API YET) => MAKES 30 TEST RECIPES
    for (let index = 0; index < 30; index++) {
      const randomRecipe: Recipe = {
        id: index, 
        name: "Recipe " + index,
        photo: "https://njam.tv/thumbnail/inline/108233/pasta-met-spicy-chorizosaus-3.jpg",
        prepTime: index * 10,
        portionSize: Math.round(Math.random()*7) + 1,
        types: ["Italian","Dinner"],
        season: "Winter",
      }
      this.recipeList.push(randomRecipe);
    }
    console.log(this.recipeList);
  };

  // Internal Functions
}
