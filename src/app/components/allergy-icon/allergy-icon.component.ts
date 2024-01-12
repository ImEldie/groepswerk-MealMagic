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
  @Input() withText: boolean = false; // DEFAULT: Image without text
  @Input() hideTooltip: boolean = false; // DEFAULT: With tooltip

  getImagePath(): string {
    const basePathWithoutText: string = "assets/images/allergies/";
    const basePathWithText: string = "assets/images/allergiesWithText/";

    if (this.withText) {
      // IMAGE WITH TEXT
      return (basePathWithText + this.iconType.toUpperCase() + ".png");
    } else {
      // IMAGE WITHOUT TEXT (DEFAULT)
      return (basePathWithoutText + this.iconType.toUpperCase() + ".png");
    }
  }

  getSize(): string {
    if (this.iconSize) {
      return (this.iconSize);
    } else {
      // Default size: 6vh
      return ("6vh");
    }
  }

  getTooltip(): string {
    const tooltip: string = 'Contains traces of ' + this.iconType.toLowerCase(); 
    return tooltip;
  }
}
