import { Component, OnInit } from '@angular/core';
import { DishCardComponent } from '../../components/dish-card/dish-card.component';
import { Dish } from '../../interfaces/interfaces-dishes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DishesApiService } from '../../services/api-calls/dishes-api.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../services/api-calls/auth.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [DishCardComponent, MatToolbarModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule, FormsModule, MatProgressBarModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})

export class HomepageComponent implements OnInit {
  private dishList: Array<Dish> = this.dishesApi.getDishList();
  searchInput: string = '';

  constructor(
    public dishesApi: DishesApiService,
    public auth: AuthService
  ){};

  ngOnInit(){
    this.dishesApi.loadDishesFromApi();
  }

  getSearchResultAmount(): number {
    return this.getSearchResults().length;
  }

  getDishes(): Array<Dish> {
    this.filterDishesFromSearch();

    return this.dishList;
  }
  private filterDishesFromSearch(){
    const recipesFromSearch: Array<Dish> = this.getSearchResults();
    const hasResults = (recipesFromSearch.length !== 0);

    if (hasResults) {
      this.dishList = recipesFromSearch;
    }
  }
  private getSearchResults(): Array<Dish> {
    const searchResults: Array<Dish> = this.dishesApi.getDishList().filter(
      (dish: Dish) => dish.name.toLocaleLowerCase().includes(this.searchInput.toLowerCase())
    );

    return searchResults;
  }

}
