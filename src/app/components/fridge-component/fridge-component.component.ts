import { Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import { FridgeService } from '../../services/api-calls/fridge.service';
import { Router } from '@angular/router';
import { FridgeIngredientsComponent } from '../../components/fridge-ingredients/fridge-ingredients.component';
import { Ingredients } from '../../interfaces/fridge-interface';


@Component({
  selector: 'app-fridge-component',
  standalone: true,
  imports: [MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatListModule, 
    FridgeIngredientsComponent],
    templateUrl: './fridge-component.component.html',
    styleUrl: './fridge-component.component.css'
  
})
export class FridgeComponent implements OnInit {
 
  constructor(
    public router: Router,
    public fridgeService: FridgeService
    ){}
  
  ingredientInput = new FormControl();
  options: string[] = [];
  ingredientList: {id: number; name: string}[] = [];
  filteredOptions!: Observable<string[]>;
  selectedIngredient: {id: number; name: string} = {id: 0, name: ''};
  fridgeId: number = 2;
  ingredientsInFridge?: Ingredients[] = []

  ngOnInit() {
      this.fridgeService.getIngredientIdsInFridge(this.fridgeId)
      .subscribe({ 
        next: (response) => {
          this.ingredientsInFridge = response;
        }
      });
      this.filteredOptions = this.ingredientInput.valueChanges.pipe(
        startWith(''),
        map(value => 
          this._filter(value || '')),
      );
      this.fridgeService.loadIngredients()
      .subscribe({ 
        next: (response) => {
          this.ingredientList = response;
          this.options = [...new Set(response.map(ingredientInfo => ingredientInfo.name))];
          }})
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    clearInput() {
      this.ingredientInput.reset();
    }

    setSelectedIngredient(ingredient: {id: number; name: string}){
      this.selectedIngredient = ingredient;
    }

    postIngredient() { 
      const selectedOption = this.ingredientInput.value;
      const selectedIngredient = this.ingredientList.find(ingredientList => ingredientList.name === selectedOption);
      const fridgeIngredientIdList = this.ingredientsInFridge?.map(d => d.ingredient_id);

      if (selectedIngredient && fridgeIngredientIdList) {
        const ingredientNotInFridge = !fridgeIngredientIdList.includes(selectedIngredient.id);

        if (ingredientNotInFridge){
          this.fridgeService.postIngredientsFridge( this.fridgeId, selectedIngredient.id, 1)
        }
      }
    }

      setNewIngredientAmount(newAmount: number, index: number) {
        if (this.ingredientsInFridge) {
          this.ingredientsInFridge[index].amount = newAmount;
         }
      }

      saveFridgeToApi() {
        let ingredientsToDelete: Ingredients[] = [];
        let ingredientAmountsToPut: Ingredients[] = [];
        
        if (this.ingredientsInFridge) {
          for (let i = 0; i < this.ingredientsInFridge.length; i++) {
            const amount = this.ingredientsInFridge[i].amount;
            
            if (amount <= 0 ){
              ingredientsToDelete.push(this.ingredientsInFridge[i])
            } else {
              ingredientAmountsToPut.push(this.ingredientsInFridge[i])
            }
          }
          this.fridgeService.putUpdatedFridgeIngredients(ingredientAmountsToPut);
          this.fridgeService.deleteUpdatedFridgeIngredients(ingredientsToDelete);
        }
      }
    }