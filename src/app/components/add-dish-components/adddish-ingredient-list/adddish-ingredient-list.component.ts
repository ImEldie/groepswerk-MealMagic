import { Component, OnInit } from '@angular/core';
import { AdddishCardComponent } from '../adddish-card/adddish-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { IngredientsApiService } from '../../../services/api-calls/ingredients-api.service';
import { Ingredient } from '../../../interfaces/interfaces-ingredients';
import { IngredientPostData } from '../../../interfaces/interfaces-dishes';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-adddish-ingredient-list',
  standalone: true,
  imports: [AdddishCardComponent, MatFormFieldModule, MatAutocompleteModule, FormsModule, MatTableModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './adddish-ingredient-list.component.html',
  styleUrl: './adddish-ingredient-list.component.css'
})
export class AdddishIngredientListComponent {
  suggestedIngredients: Array<IngredientPostData> = [];
  selectedIngredients: Array<IngredientPostData> = [];
  ingredientToAdd: IngredientPostData = {id: 0, name: '', amount: {value: 0, unit: 'gr'}};


  constructor(
    private ingredientsApi: IngredientsApiService,
  ){}

  ngOnInit(){
    this.ingredientsApi.loadIngredientsFromAPI();
  }

  addIngredient(){
    if (this.ingredientToAddIsValid()) {
      let tempList = [...this.selectedIngredients];

      tempList.push(this.ingredientToAdd);
      this.selectedIngredients = tempList;

      this.initialiseUserIngredientInput();
    }
  }
  removeIngredient(ingredientToRemove: IngredientPostData){
    let removalIndex: number = this.selectedIngredients.indexOf(ingredientToRemove);

    const tempList = this.selectedIngredients.filter(ingredient => ingredient !== ingredientToRemove);
    this.selectedIngredients = tempList;
  }
  setIngredientToAddData(selectedIngredient: IngredientPostData){
    this.ingredientToAdd.id = selectedIngredient.id;
    this.ingredientToAdd.name = selectedIngredient.name;
    this.ingredientToAdd.amount.unit = selectedIngredient.amount.unit;
  }
  ingredientToAddIsValid(): boolean{
    const apiIngredients = this.ingredientsApi.getIngredientList();
    const nameIsValid: boolean = (apiIngredients.some((ingredient)=> ingredient.name === this.ingredientToAdd.name));

    // Check if ID is correct
    let idIsValid: boolean = false;
    if (nameIsValid && (this.ingredientToAdd.id !== 0)) {
      const index: number = apiIngredients.findIndex((ingredient)=> ingredient.name === this.ingredientToAdd.name);
      idIsValid = (apiIngredients[index].id === this.ingredientToAdd.id);
    }

    // Check amount is NOT 0 or empty
    const amountIsValid: boolean = ((this.ingredientToAdd.amount.value !== 0) && (this.ingredientToAdd.amount.value !== null));

    // Return result
    return (idIsValid && nameIsValid && amountIsValid);
  }
  filterIngredients(){
    const ingredientFilterInput = this.ingredientToAdd.name.toLowerCase();

    const ingredientsFilteredByInput: Array<IngredientPostData> = this.ingredientsApi.getIngredientList()
      .map(ingredient => this.convertToIngredientPostData(ingredient)) // Convert list from type Array<Ingredients> to Array<IngredientPostData>
      .filter(ingredient => ingredient.name.toLowerCase().includes(ingredientFilterInput)); // Filter for names that match the userinput

    const selectedIngredientNames: Array<string> = this.selectedIngredients.map(ingredient => ingredient.name);
    this.suggestedIngredients = ingredientsFilteredByInput.filter(ingredient => !selectedIngredientNames.includes(ingredient.name));
  }
  private initialiseUserIngredientInput() {
    this.ingredientToAdd = {
      id: 0,
      name: '',
      amount: {value: 0, unit: 'gr'}
    };
  }
  private convertToIngredientPostData(ingredient: Ingredient): IngredientPostData{
    return {
      id: ingredient.id,
      name: ingredient.name,
      amount: {value: 0, unit: 'gr'}
    }
  }
}
