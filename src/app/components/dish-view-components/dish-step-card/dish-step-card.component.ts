import { Component, Input } from '@angular/core';
import { DishStep } from '../../../interfaces/interfaces-steps';
import { MatCardModule } from '@angular/material/card';
import { SmallCardComponent } from '../../standard-components/small-card/small-card.component';

@Component({
  selector: 'app-dish-step-card',
  standalone: true,
  imports: [MatCardModule, SmallCardComponent],
  templateUrl: './dish-step-card.component.html',
  styleUrl: './dish-step-card.component.css'
})
export class DishStepCardComponent {
  @Input({required: true}) step?: DishStep

}
