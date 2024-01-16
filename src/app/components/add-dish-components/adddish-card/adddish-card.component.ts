import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-adddish-card',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './adddish-card.component.html',
  styleUrl: './adddish-card.component.css',
})
export class AdddishCardComponent {

}
