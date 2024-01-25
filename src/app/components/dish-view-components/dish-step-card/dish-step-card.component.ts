import { Component, Input } from '@angular/core';
import { DishStep } from '../../../interfaces/interfaces-steps';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dish-step-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './dish-step-card.component.html',
  styleUrl: './dish-step-card.component.css'
})
export class DishStepCardComponent {
  @Input({required: true}) step?: DishStep

}
