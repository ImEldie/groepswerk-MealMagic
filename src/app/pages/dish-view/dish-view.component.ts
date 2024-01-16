import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { AllergyIconComponent } from '../../components/allergy-icon/allergy-icon.component';

@Component({
  selector: 'app-dish-view',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, AllergyIconComponent],
  templateUrl: './dish-view.component.html',
  styleUrl: './dish-view.component.css'
})
export class DishViewComponent {

}
