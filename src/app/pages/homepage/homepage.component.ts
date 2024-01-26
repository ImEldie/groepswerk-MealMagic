import { Component, OnInit } from '@angular/core';
import { DishCardComponent } from '../../components/homepage-components/dish-card/dish-card.component';
import { Dish } from '../../interfaces/interfaces-dishes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DishesApiService } from '../../services/api-calls/dishes-api.service';
import { Router, RouterOutlet } from '@angular/router';
import { AuthApiService } from '../../services/api-calls/auth-api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FridgeApiService } from '../../services/api-calls/fridge-api.service';
import {
  CompactFridgeIngredient,
  FridgeIngredient,
} from '../../interfaces/interfaces-fridge';
import { LargeCardComponent } from '../../components/standard-components/large-card/large-card.component';
import { LoadingVisualiserComponent } from '../../components/standard-components/loading-visualiser/loading-visualiser.component';
import { FridgeComponent } from '../../components/homepage-components/fridge/fridge.component';
import { IngredientsApiService } from '../../services/api-calls/ingredients-api.service';
import { LocalstorageService } from '../../services/functions/localstorage.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    FridgeComponent,
    DishCardComponent,
    LoadingVisualiserComponent,
    MatToolbarModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterOutlet,
    LargeCardComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  private dishList: Array<Dish> = this.dishesApi.getDishList();
  searchInput: string = '';
  filterOnFridge: boolean;
  loadingResults: boolean = false;
  private fridgeIngredients: Array<FridgeIngredient> = [];
  constructor(
    public dishesApi: DishesApiService,
    public auth: AuthApiService,
    public fridgeService: FridgeApiService,
    public router: Router,
    public ingredientAPI: IngredientsApiService,
    public storage: LocalstorageService,
  ) {
    this.filterOnFridge = false;
  }
  ngOnInit() {
    this.dishesApi.loadDishesFromApi();
    this.ingredientAPI.loadIngredientsFromAPI();
  }
  getSearchResultAmount(): number {
    return this.getSearchResults().length;
  }
  getDishes(): Array<Dish> {
    this.filterDishesFromSearch();
    return this.dishList;
  }
  private filterDishesFromSearch() {
    const recipesFromSearch: Array<Dish> = this.getSearchResults();
    const hasResults = recipesFromSearch.length !== 0;

    if (hasResults) {
      this.dishList = recipesFromSearch;
    }
  }
  private getSearchResults(): Array<Dish> {
    const searchResults: Array<Dish> = this.dishesApi
      .getDishList()
      .filter((dish: Dish) => {
        const includesSearchInput = dish.name
          .toLocaleLowerCase()
          .includes(this.searchInput.toLowerCase());
        return !this.filterOnFridge
          ? includesSearchInput
          : includesSearchInput && this.MatchingIngredients(dish);
      });
    return this.filterOnFridge
      ? this.sortMatchingIngredients(searchResults)
      : searchResults;
  }
  private MatchingIngredients(dish: Dish): boolean {
    const fridgeIngredientIds = this.fridgeIngredients.map(
      (fridgeIngredient) => fridgeIngredient.ingredient_id,
    );
    return dish.ingredients.some((ingredient) =>
      fridgeIngredientIds.includes(ingredient.id),
    );
  }
  private sortMatchingIngredients(dishes: Array<Dish>): Array<Dish> {
    return dishes.sort((dishOne, dishTwo) => {
      const countDishOne = this.countMatchingIngredients(dishOne);
      const countDishTwo = this.countMatchingIngredients(dishTwo);
      return countDishTwo - countDishOne;
    });
  }
  private countMatchingIngredients(dish: Dish): number {
    const fridgeIngredientIds = this.fridgeIngredients.map(
      (fridgeIngredient) => fridgeIngredient.ingredient_id,
    );
    return dish.ingredients.filter((ingredient) =>
      fridgeIngredientIds.includes(ingredient.id),
    ).length;
  }
  filterForFridge() {
    this.filterOnFridge = !this.filterOnFridge;
    this.loadingResults = true;
    if (this.filterOnFridge) {
      this.fridgeService.getFridgeIngredients().subscribe((data) => {
        this.fridgeIngredients = data;
        this.loadingResults = false;
      });
    } else {
      this.dishList = this.dishesApi.getDishList();
      this.loadingResults = false;
    }
  }
  getCompactFridgeIngredients(): Array<CompactFridgeIngredient> {
    const ingredientList = this.ingredientAPI
      .getIngredientList()
      .map((ingredient) => {
        return { id: ingredient.id, name: ingredient.name };
      });

    if (ingredientList) {
      return ingredientList;
    } else {
      return [];
    }
  }
}
