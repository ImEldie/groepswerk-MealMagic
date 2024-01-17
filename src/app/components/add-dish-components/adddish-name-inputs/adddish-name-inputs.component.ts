import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AdddishCardComponent } from '../adddish-card/adddish-card.component';
import { AddDishNameInputs } from '../../../interfaces/interfaces-add-dish-forms';

@Component({
  selector: 'app-adddish-name-inputs',
  standalone: true,
  imports: [AdddishCardComponent, MatInputModule, MatCardModule, MatIconModule, MatFormFieldModule, FormsModule],
  templateUrl: './adddish-name-inputs.component.html',
  styleUrl: './adddish-name-inputs.component.css'
})
export class AdddishNameInputsComponent {
  nameInput: string = '';
  descriptionInput: string = '';
  imageInput: string = '';

  // CARD-OUTPUT
  @Output() UserInputData = new EventEmitter<AddDishNameInputs>();

  emitUserInput(){
    this.UserInputData.emit(this.getEmitData());
  }

  private getEmitData(): AddDishNameInputs {
    const emitData: AddDishNameInputs = {
      name: this.nameInput,
      description: this.descriptionInput,
      image: this.imageInput,
      dataIsValid: this.checkInputsValidity()
    }
    
    return emitData;
  }

  // CARD FUNCTIONS
  checkInputsValidity(): boolean {
    const nameValid: boolean = (this.nameInput !== '');
    const imageInput: boolean = (this.imageInput !== '');

    return nameValid && imageInput;
  }
}
