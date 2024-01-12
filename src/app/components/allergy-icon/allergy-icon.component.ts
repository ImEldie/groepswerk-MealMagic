import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-allergy-icon',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './allergy-icon.component.html',
  styleUrl: './allergy-icon.component.css'
})
export class AllergyIconComponent {
  @Input({required: true}) iconType!: string;
  @Input() iconSize!: string;
  @Input() withText: boolean = false;
  @Input() hideTooltip: boolean = false;

  getImagePath(): string{
    if (this.withText) {
      return this.getImagePathWithText();
    } else {
      return this.getImagePathWithoutText();
    }
  }
  private getImagePathWithText(): string {
    const pathWithText: string = '/assets/images/allergiesWithText/' + this.iconType.toUpperCase() + '.png';
    return pathWithText;
  }
  private getImagePathWithoutText(): string {
    const pathWithoutText: string = '/assets/images/allergies/' + this.iconType.toUpperCase() + '.png';
    return pathWithoutText;
  }

  getSize(): string {
    const defaultSize: string = '2.2rem'

    if (this.iconSize) {
      return this.iconSize;
    } else {
      return defaultSize;
    }
  }

  getTooltip(): string {
    const tooltip: string = 'Contains traces of ' + this.iconType.toLowerCase(); 
    return tooltip;
  }
}
