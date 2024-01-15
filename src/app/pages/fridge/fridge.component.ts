import { Component, Input, OnInit} from '@angular/core';
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

  constructor(
    public router: Router,
    public fridgeService: FridgeService
    ){}
  

  ingredientInput = new FormControl('');
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  loadedIngredient: string[] = [];

    ngOnInit() {
      this.filteredOptions = this.ingredientInput.valueChanges.pipe(
        startWith(''),
        map(value => 
          this._filter(value || '')),
      );
      this.fridgeService.loadIngredients()
      .subscribe({ 
        next: (Response) => {
          this.loadedIngredient = Response;
          this.options = this.loadedIngredient;
          console.log(this.loadedIngredient);
          }})
          const ingredient = this.ingredientInput.value;
      this.fridgeService.setAddIngredients(ingredient);
    this.clearInput();
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    saveData(): void {
      this.fridgeService.setAddIngredients(this.ingredientInput.value);
    }

    ingredientValue() {
      const ingredient = this.ingredientInput.value;
      this.fridgeService.setAddIngredients(ingredient);
    }

    clearInput() {
      console.log(this.ingredientInput.value);
      this.ingredientInput.reset();
    }

    postIngredient () {
      if (this.ingredientInput.value !== null){
        
      }
    }
  
  }

     
      
  
  

