import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-allergy-icon',
  standalone: true,
  imports: [],
  templateUrl: './allergy-icon.component.html',
  styleUrl: './allergy-icon.component.css'
})
export class AllergyIconComponent {
  @Input() iconType!: string;
  @Input() iconSize!: string;

  basePath: string = "../../../assets/images/allergies/"

  getImagePath(): string {
    return (this.basePath + this.iconType.toUpperCase() + ".png");
  }

  getSize(): string{
    if (this.iconSize) {
      return (this.iconSize);
    } else {
      // Default size: 5vh
      return ("5vh");
    }
  }
}
