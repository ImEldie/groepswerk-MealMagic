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
import { FridgeIngredient, Ingredients } from '../../interfaces/fridge-interface';


@Component({
  selector: 'app-fridge',
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
  templateUrl: './fridge.component.html',
  styleUrl: './fridge.component.css',
  
})
export class FridgeComponent implements OnInit {
  /*
    - ongebruikte variabele WEG
    - Prettier nakijken, staat deze aan?
  */
  constructor(
    public router: Router,
    public fridgeService: FridgeService
    ){}
  
  ingredientInput = new FormControl();
  options: string[] = [];
  ingredientList: {id: number; name: string}[] = [];
  filteredOptions!: Observable<string[]>;
  selectedIngredient: {id: number; name: string} = {id: 0, name: ''};

  ingredientsFridgeId: number = 0;
  fridgeId: number | null = null;
  ingredientsInFridge?: Ingredients[] = []

  ngOnInit() {
      this.fridgeService.getIngredientIdsInFridge(1) //FridgeId toevoegen
      .subscribe({ 
        next: (response) => {
          console.log(response)
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
    this.saveData();
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    saveData(): void {
      const selectedOption = this.ingredientInput.value;
      const selectedIngredient = this.ingredientList.find(ingredientList => ingredientList.name === selectedOption);
    
      if (selectedIngredient) {
        const selectedIngredientId = selectedIngredient.id;
        this.fridgeService.setAddIngredients(selectedOption, selectedIngredientId);
      }
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
      const ingredientNotInFridge = fridgeIngredientIdList?.includes(this.selectedIngredient.id);

      if (ingredientNotInFridge){
      this.fridgeService.postIngredientsFridge( this.fridgeId!, selectedIngredient?.id!, 1)
      .subscribe({
        next: (data) => {
          this.ingredientsFridgeId = data.id;}})
        }
      }

      getFridgeId() {
        this.fridgeService.getFridgeIdFromFridges(1)
        .subscribe({
          next: (data) => {
            this.fridgeId = data;
          }
        }
        )
      }

      setNewIngredientAmount(newAmount: number, index: number) {
        if (this.ingredientsInFridge) {
          this.ingredientsInFridge[index].amount = newAmount;
          console.log(this.ingredientsInFridge[index]);
        }
      }
  }

     
      
  
  

