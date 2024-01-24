import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FridgeIngredient } from '../../interfaces/fridge-interface';
import { IngredientsApiService } from '../../services/api-calls/ingredients-api.service';

@Component({
  selector: 'app-fridge-ingredients',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './fridge-ingredients.component.html',
  styleUrl: './fridge-ingredients.component.css'
})

export class FridgeIngredientsComponent implements OnInit {
  constructor( 
    private ingredientApi: IngredientsApiService
  ){}
  
  count: number = 1;
  @Input({required: true}) fridgeIngredient: FridgeIngredient = {id: 0, ingredient_id: 0, fridge_id: 0, amount: 0};
  @Output() fridgeIngredientOutput = new EventEmitter<number>();

  ngOnInit() {
    this.ingredientApi.loadIngredientsFromAPI();
    this.count = this.fridgeIngredient.amount;
  }

  emitUserInput() {
    this.fridgeIngredientOutput.emit(this.count);
  }

  getIngredientName() {
    const ingredientData = this.ingredientApi.getIngredientFromId(this.fridgeIngredient.ingredient_id);
    let ingredientName = "";
    if (ingredientData) {
    ingredientName = ingredientData.name;
    }
    return ingredientName;
  }

  plusOne(){
    this.count  += 1;
    this.emitUserInput();
  } 
  minOne(){
    this.count  -= 1;
    this.emitUserInput();
  }
}


