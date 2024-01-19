import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-adddish-card',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatIconModule],
  templateUrl: './adddish-card.component.html',
  styleUrl: './adddish-card.component.css',
})
export class AdddishCardComponent {
  @Input({required: true}) inputValid = false;
}
