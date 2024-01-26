import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthApiService } from '../../../services/api-calls/auth-api.service';
import { LargeCardComponent } from '../large-card/large-card.component';

@Component({
  selector: 'app-loading-visualiser',
  standalone: true,
  imports: [MatProgressBarModule, LargeCardComponent],
  templateUrl: './loading-visualiser.component.html',
  styleUrl: './loading-visualiser.component.css'
})
export class LoadingVisualiserComponent {
  @Input() loadingText: string = '';

  constructor(
    public auth: AuthApiService
  ){};
}
