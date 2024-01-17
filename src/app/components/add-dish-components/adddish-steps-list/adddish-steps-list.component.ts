import { Component } from '@angular/core';
import { AdddishCardComponent } from '../adddish-card/adddish-card.component';

@Component({
  selector: 'app-adddish-steps-list',
  standalone: true,
  imports: [AdddishCardComponent],
  templateUrl: './adddish-steps-list.component.html',
  styleUrl: './adddish-steps-list.component.css'
})
export class AdddishStepsListComponent {

}
