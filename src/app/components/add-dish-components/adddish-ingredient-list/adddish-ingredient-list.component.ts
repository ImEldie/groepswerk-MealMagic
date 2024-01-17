import { Component } from '@angular/core';
import { AdddishCardComponent } from '../adddish-card/adddish-card.component';

@Component({
  selector: 'app-adddish-ingredient-list',
  standalone: true,
  imports: [AdddishCardComponent],
  templateUrl: './adddish-ingredient-list.component.html',
  styleUrl: './adddish-ingredient-list.component.css'
})
export class AdddishIngredientListComponent {

}
