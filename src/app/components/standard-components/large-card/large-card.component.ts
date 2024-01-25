import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-large-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './large-card.component.html',
  styleUrl: './large-card.component.css'
})
export class LargeCardComponent {

}
