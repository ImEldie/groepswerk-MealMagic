import { Component, OnInit } from '@angular/core';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { Dish } from '../../components/interfaces/interfaces-dishes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DishesApiService } from '../../services/api-calls/dishes-api.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RecipeCardComponent, MatToolbarModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule, FormsModule, MatProgressBarModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  
  /*
  TODO:
    * API-Call needs to get token from loginservice
    * Upon card click, should navigate to dish-page
    * search-bar should have red indication when search result is invalid
    * Show allergies => Load ingredients of recipe and check if they're linked to allergies
  */
  
  // Internal Variables
    // recipeList is what is displayed on the site, this is changed depending on what we want to show!
    // The list which has all recipes is stored in the dishes-api service, this is read-only! this.dishApiServ.getDishList();
  public dishList: Array<Dish> = []; // Visualised list
  searchInput: string = "";

  // Constructor
  constructor(
    public dishApiServ: DishesApiService,
  ){
  };

  ngOnInit(){
    this.dishApiServ.loadDishes();
    setTimeout(() => {
      this.dishList = this.dishApiServ.getDishList();
    }, 1000);
    
  }

  // Internal Functions
  filterRecipesFromSearch(){
    // Get array of recipes matching the searchInput
    const recipesFromSearch: Array<Dish> = this.getSearchResults();
    const htmlIdPrefix: string = "recipe-";

    if (recipesFromSearch.length !== 0) {
      // FOUND RESULTS
      this.dishList = recipesFromSearch;
      console.log("Results:");
      console.log(recipesFromSearch);
    } else {
      // NO RESULTS FOUND
      this.dishList = this.dishApiServ.getDishList();
      console.log("No results found");
    }
  }
  private getSearchResults(): Array<Dish>{
    // Looks for recipe names that match the searchInput and returns them in an Array
    const searchResults: Array<Dish> = this.dishApiServ.getDishList().filter(
      (result: Dish) => result.name.toLocaleLowerCase().includes(this.searchInput.toLowerCase())
    );

    return searchResults;
  }

}
