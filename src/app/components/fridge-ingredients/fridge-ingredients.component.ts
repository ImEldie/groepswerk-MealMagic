import { Component, OnInit, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FridgeService } from '../../services/api-calls/fridge.service';
import {MatButtonModule} from '@angular/material/button';
import { FridgeIngredient } from '../../interfaces/fridge-interface';

@Component({
  selector: 'app-fridge-ingredients',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './fridge-ingredients.component.html',
  styleUrl: './fridge-ingredients.component.css'
})

export class FridgeIngredientsComponent implements OnInit {


  constructor( 
    private fridgeService: FridgeService,
  ){}
  
  count: number = 1;
  ingredient: string | null = '';
  @Input({required: true}) loadedFridgeId: number = 0; //FridgeIngredient = {id: 0, name: ''};
  ingredientId: number | null = null ;
  ingredientsFridgeId: number | null = null;
  fridgeId: number | null = null;

  ngOnInit() {
 // this.getFridgeId();
  if ( this.ingredientsFridgeId !== null) {
  this.fridgeService.getIngredientsFridgesDetails(this.ingredientsFridgeId!)
  .subscribe( {next: (response) => {
    this.count = response.amount;
    this.ingredientId = response.ingredient_id
  }})
} 
this.fridgeService.getIngredientDetails(this.ingredientId!)
  .subscribe( {next: (response) => {
    this.ingredient = response.name; 
  }})
}

getIngredientData() {
  const data = this.fridgeService.getAddIngredients()
  if ( data.id !== null) {
    // this.ingredientId = data.id;
    // this.ingredient = data.name;
  }
}

  plusOne(){
    this.count  += 1;
    this.putCount();
      } 
    minOne(){
        this.count  -= 1;
        this.putCount();
      }
  resetCount() {
     if (this.count < 1) {
       this.fridgeService.deleteIngredientsFridge(this.ingredientsFridgeId!)
      }
  }
/*
  postIngredient() {
this.fridgeService.postIngredientsFridge( this.fridgeId!, this.ingredientId!, 1)
.subscribe({
  next: (data) => {
    this.ingredientsFridgeId = data.id;}})
  }
*/
  putCount(){
    this.fridgeService.putAmount(this.ingredientsFridgeId!, this.fridgeId!, this.ingredientId!, this.count)
  }
/*
  getFridgeId() {
    this.fridgeService.getFridgeIdFromFridges(1)
    .subscribe({
      next: (data) => {
        this.fridgeId = data;
      }
    }
    )
  }
  */
}


