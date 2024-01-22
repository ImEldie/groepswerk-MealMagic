import { Component, EventEmitter, Output } from '@angular/core';
import { AdddishCardComponent } from '../adddish-card/adddish-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DishStep } from '../../../interfaces/interfaces-steps';
import { MatIconModule } from '@angular/material/icon';
import { AddDishCreatedSteps } from '../../../interfaces/interfaces-add-dish-forms';

@Component({
  selector: 'app-adddish-steps-list',
  standalone: true,
  imports: [AdddishCardComponent, MatExpansionModule, MatButtonModule, FormsModule, MatInputModule, MatIconModule],
  templateUrl: './adddish-steps-list.component.html',
  styleUrl: './adddish-steps-list.component.css'
})
export class AdddishStepsListComponent {
  stepToAdd: DishStep = {title: '', description: '', order: 0, picture: ''};
  createdSteps: Array<DishStep> = [];
  currentPanel: number = 0;

  // CARD-OUTPUT
  @Output() UserInputData = new EventEmitter<AddDishCreatedSteps>();

  emitUserInput(){
    this.UserInputData.emit(this.getEmitData());
  }

  private getEmitData(): AddDishCreatedSteps {
    const emitData: AddDishCreatedSteps = {
      createdSteps: this.createdSteps,
      dataIsValid: this.checkInputsValidity()
    }
    
    return emitData;
  }

  // CARD FUNCTIONS
  setOpenedPanel(panelNumber: number){
    this.currentPanel = panelNumber;
  }

  checkInputsValidity(): boolean {
    const stepsCreated = (this.createdSteps.length !== 0);
    return stepsCreated;
  }

  addStep(){
    if (this.stepToAddIsValid()){
      let tempList: Array<DishStep> = [...this.createdSteps];

      tempList.push(this.stepToAdd);
      this.createdSteps = tempList;
  
      this.sortCreatedStepsOrders();
      this.initialiseUserStepInput();
      this.emitUserInput();
    }
  }
  removeStep(stepToRemove: DishStep){
    const tempList: Array<DishStep> = this.createdSteps.filter(step => step !== stepToRemove); // templist to overwrite visualised list required by Angular to update the table.
    this.createdSteps = tempList;
    this.sortCreatedStepsOrders();
    this.emitUserInput();
  }
  stepToAddIsValid(): boolean{
    const titleIsValid: boolean = (this.stepToAdd.title !== '');
    const descriptionIsValid: boolean = (this.stepToAdd.description!.length <= 255 && this.stepToAdd.description !== '');
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
      this.emitUserInput();
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
      this.emitUserInput();
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
