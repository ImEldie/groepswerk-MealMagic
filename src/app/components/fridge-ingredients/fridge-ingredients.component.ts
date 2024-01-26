import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CompactFridgeIngredient, FridgeIngredient } from '../../interfaces/fridge-interface';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fridge-ingredients',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './fridge-ingredients.component.html',
  styleUrl: './fridge-ingredients.component.css'
})

export class FridgeIngredientsComponent implements OnInit {
  count: number = 1;
  @Input({required: true}) fridgeIngredient: FridgeIngredient = {id: 0, ingredient_id: 0, fridge_id: 0, amount: 0};
  @Input({required: true}) ingredients: Array<CompactFridgeIngredient> = [];
  @Output() fridgeIngredientOutput = new EventEmitter<number>();
  private originalValue: number = 0;
  
  constructor( 
  ){}
  
  ngOnInit() {
    this.count = this.fridgeIngredient.amount;
    this.originalValue = this.fridgeIngredient.amount;
  }

  emitUserInput() {
    this.fridgeIngredientOutput.emit(this.count);
  }

  getIngredientName() {
    const ingredientData = this.ingredients?.find((ingredient) => ingredient.id === this.fridgeIngredient.ingredient_id);
    let ingredientName = "";
    if (ingredientData) {
    ingredientName = ingredientData.name;
    }
    return ingredientName;
  }

  setCountToZero() {
    this.count = 0;
    this.emitUserInput();
  }

  setCountToOriginal() {
    this.count = this.originalValue;
    this.emitUserInput();
  }
}


