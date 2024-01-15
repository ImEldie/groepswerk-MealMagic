import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FridgeService } from '../../services/api-calls/fridge.service';
import {MatButtonModule} from '@angular/material/button';
import { Subscription } from 'rxjs';

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
  loadedIngredient: string[] = [];
  ingredientId: number = 0;



  ngOnInit() {
    this.fridgeService.loadIngredients()
    .subscribe({ 
      next: (Response) => {
        this.loadedIngredient = Response;
      }}) 
      
}

ingredientValue(){
   this.ingredient = this.fridgeService.getAddIngredients();
   
}

  plusOne(){
    this.count  += 1;
      } 
    minOne(){
        this.count  -= 1;
      }
  resetCount() {
     if (this.count < 1) {
       this.count = 1;
      console.log(this.count)
    }
  }

  postIngredient() {

  }
  
}


