import { Component, OnInit } from '@angular/core';
import { DishCardComponent } from '../../components/dish-card/dish-card.component';
import { Dish } from '../../components/interfaces/interfaces-dishes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DishesApiService } from '../../services/api-calls/dishes-api.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FridgeService } from '../../services/api-calls/fridge.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    DishCardComponent,
    MatToolbarModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  private dishList: Array<Dish> = this.dishesApi.getDishList();
  searchInput: string = '';
  filterOnFridge: boolean;
  constructor(
    public dishesApi: DishesApiService,
    public auth: AuthService,
    public fridgeService: FridgeService,
  ) {
    this.filterOnFridge = false;
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
        if (!this.filterOnFridge) {
          return dish.name
            .toLocaleLowerCase()
            .includes(this.searchInput.toLowerCase());
        } else {
          return dish.name
            .toLocaleLowerCase()
            .includes(this.searchInput.toLowerCase());
        }
      });
    return searchResults;
  }
  filterForFridge() {
    this.filterOnFridge = !this.filterOnFridge;
    console.log(this.filterOnFridge);
  }

  //JASPER
  getFridgeIngredients() {
    this.fridgeService.getFridgeIngredients(1).subscribe((data) => {
      console.log(data);
    });
  }
  getFridgeIdFromFridges() {
    this.fridgeService.getFridgeIdFromFridges(1).subscribe((data) => {
      console.log(data);
    });
  }
}
