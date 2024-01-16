import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AdddishCardComponent } from '../adddish-card/adddish-card.component';

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
}
