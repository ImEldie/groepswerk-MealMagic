import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AdddishCardComponent } from '../adddish-card/adddish-card.component';
import { AddDishNameInputs } from '../../../interfaces/interfaces-add-dish-forms';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';

@Component({
  selector: 'app-adddish-maininfo-form',
  standalone: true,
  imports: [ImagePreviewComponent, AdddishCardComponent, MatInputModule, MatCardModule, MatIconModule, MatFormFieldModule, FormsModule],
  templateUrl: './adddish-maininfo-form.component.html',
  styleUrl: './adddish-maininfo-form.component.css'
})
export class AdddishMaininfoFormComponent {
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
    const nameValid = (this.nameInput !== '');
    const imageValid = (this.imageInput !== '');
    const descriptionValid = (this.descriptionInput !== '');

    return nameValid && imageValid && descriptionValid;
  }
}
