import { Component } from '@angular/core';
import { AdddishDetailsFormComponent } from '../../components/add-dish-components/adddish-details-form/adddish-details-form.component';
import { AdddishNameInputsComponent } from '../../components/add-dish-components/adddish-name-inputs/adddish-name-inputs.component';
import { AdddishIngredientListComponent } from '../../components/add-dish-components/adddish-ingredient-list/adddish-ingredient-list.component';
import { AdddishStepsListComponent } from '../../components/add-dish-components/adddish-steps-list/adddish-steps-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DishesApiService } from '../../services/api-calls/dishes-api.service';
import { AddDishCreatedSteps, AddDishDetailInputs, AddDishNameInputs, AddDishSelectedIngredients } from '../../interfaces/interfaces-add-dish-forms';
import { DishPostData } from '../../interfaces/interfaces-dishes';

@Component({
  selector: 'app-add-dish',
  standalone: true,
  imports: [AdddishDetailsFormComponent, AdddishNameInputsComponent, AdddishIngredientListComponent, AdddishStepsListComponent, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './add-dish.component.html',
  styleUrl: './add-dish.component.css'
})
export class AddDishComponent {
  nameInputData: AddDishNameInputs | undefined = undefined;
  detailInputData: AddDishDetailInputs | undefined = undefined;
  selectedIngredients: AddDishSelectedIngredients | undefined = undefined;
  createdSteps: AddDishCreatedSteps | undefined = undefined;

  constructor(
    private dishApi: DishesApiService,
  ){}

  postDish(){
    if (this.allUserInputsValid()) {
      const postData: DishPostData = {
        name: this.nameInputData!.name,
        description: this.nameInputData!.description,
        image_url: this.nameInputData!.image,
        duration: this.detailInputData!.prepTime,
        amount_of_people: this.detailInputData!.portionSize,
        season_id: this.detailInputData!.seasonId,
        ingredients: this.selectedIngredients!.ingredientIds,
        dish_types: this.detailInputData!.selectedTypeIds,
        dish_steps: [],
      }     

      this.dishApi.postNewDish(postData, this.createdSteps!.createdSteps);
    }
  }

  private allUserInputsDefined(): boolean {
    const namesDefined = (this.nameInputData !== undefined);
    const detailsDefined = (this.detailInputData !== undefined);
    const ingredientsDefined = (this.selectedIngredients !== undefined);
    const stepsDefined = (this.createdSteps !== undefined);

    return (namesDefined && detailsDefined && ingredientsDefined && stepsDefined)
  }

  allUserInputsValid(): boolean {
    let returnValue: boolean = false;
    
    if (this.allUserInputsDefined()) {
      const nameValid = this.nameInputData!.dataIsValid;
      const detailValid = this.detailInputData!.dataIsValid;
      const ingredientsValid = this.selectedIngredients!.dataIsValid;
      const stepsValid =  this.createdSteps!.dataIsValid;

      returnValue = nameValid && detailValid && ingredientsValid && stepsValid;
    }

    return returnValue ;
  }

  setNameInputs(newData: AddDishNameInputs){
    this.nameInputData = newData;
  }
  setDetailInputs(newData: AddDishDetailInputs){
    this.detailInputData = newData;
  }
  setSelectedIngredients(newData: AddDishSelectedIngredients){
    this.selectedIngredients = newData;
  }
  setCreatedSteps(newData: AddDishCreatedSteps){
    this.createdSteps = newData;
  }
}
