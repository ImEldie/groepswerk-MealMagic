import { Component } from '@angular/core';
import { AdddishCardComponent } from '../adddish-card/adddish-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DishStep } from '../../../interfaces/interfaces-steps';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-adddish-steps-list',
  standalone: true,
  imports: [AdddishCardComponent, MatExpansionModule, MatButtonModule, FormsModule, MatInputModule, MatIconModule],
  templateUrl: './adddish-steps-list.component.html',
  styleUrl: './adddish-steps-list.component.css'
})
export class AdddishStepsListComponent {
  stepToAdd: DishStep = {title: '', description: '', order: 0};
  createdSteps: Array<DishStep> = [];
  currentPanel: number = 0;

  setOpenedPanel(panelNumber: number){
    this.currentPanel = panelNumber;
    console.log(this.currentPanel);
  }

  addStep(){
    if (this.stepToAddIsValid()){
      let tempList: Array<DishStep> = [...this.createdSteps];

      tempList.push(this.stepToAdd);
      this.createdSteps = tempList;
  
      this.sortCreatedStepsOrders();
      this.initialiseUserStepInput();
    }
  }
  removeStep(stepToRemove: DishStep){
    let removalIndex: number = this.createdSteps.indexOf(stepToRemove);

    const tempList: Array<DishStep> = this.createdSteps.filter(step => step !== stepToRemove); // We make a templist and then overwrite the selectedIngredientslist => Angular needs this to properly update the table.
    this.createdSteps = tempList;

    this.sortCreatedStepsOrders();
  }
  stepToAddIsValid(): boolean{
    const titleIsValid: boolean = (this.stepToAdd.title !== '');
    const descriptionIsValid: boolean = (this.stepToAdd.description!.length <= 255);

    return (titleIsValid && descriptionIsValid);
  }
  moveStepUp(stepToMove: DishStep){
    const stepIsNotFirst: boolean = (stepToMove.order > 1);
    if (stepIsNotFirst) {
      let tempList: Array<DishStep> = [...this.createdSteps];

      const oldIndex: number = this.createdSteps.indexOf(stepToMove);
      const newIndex: number = oldIndex - 1;

      tempList[oldIndex] = tempList[newIndex];
      tempList[newIndex] = stepToMove;

      this.createdSteps = tempList;
      
      this.sortCreatedStepsOrders();
      this.setOpenedPanel(tempList[newIndex].order);
    }
  }
  moveStepDown(stepToMove: DishStep){
    const stepIsNotLast: boolean = (stepToMove.order < this.createdSteps.length);
    if (stepIsNotLast) {
      let tempList: Array<DishStep> = [...this.createdSteps];

      const oldIndex: number = this.createdSteps.indexOf(stepToMove);
      const newIndex: number = oldIndex + 1;

      tempList[oldIndex] = tempList[newIndex];
      tempList[newIndex] = stepToMove;

      this.createdSteps = tempList;
      
      this.sortCreatedStepsOrders();
      this.setOpenedPanel(tempList[newIndex].order);
    }
  }
  private initialiseUserStepInput(){
    this.stepToAdd = {title: '', description: '', order: 0};
  }
  private sortCreatedStepsOrders(){
    for (let i = 0; i < this.createdSteps.length; i++) {
      this.createdSteps[i].order = i + 1;
    }
  }
}
