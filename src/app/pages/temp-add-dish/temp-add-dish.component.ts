import { Component } from '@angular/core';
import { AdddishDetailsFormComponent } from '../../components/add-dish-components/adddish-details-form/adddish-details-form.component';
import { AdddishNameInputsComponent } from '../../components/add-dish-components/adddish-name-inputs/adddish-name-inputs.component';
import { AdddishIngredientListComponent } from '../../components/add-dish-components/adddish-ingredient-list/adddish-ingredient-list.component';
import { AdddishStepsListComponent } from '../../components/add-dish-components/adddish-steps-list/adddish-steps-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-temp-add-dish',
  standalone: true,
  imports: [AdddishDetailsFormComponent, AdddishNameInputsComponent, AdddishIngredientListComponent, AdddishStepsListComponent, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './temp-add-dish.component.html',
  styleUrl: './temp-add-dish.component.css'
})
export class TempAddDishComponent {

}
