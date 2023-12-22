import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { Dish } from '../interfaces-recipes';
import { AllergyIconComponent } from '../allergy-icon/allergy-icon.component';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [AllergyIconComponent, MatButtonModule, MatCardModule, MatChipsModule, MatDividerModule, CommonModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {
  @Input() dish!: Dish;
  
  generateHtmlElementId(id: number): string{
    // Used to give the recipe-card a unique ID (Not used yet)
    const prefix: string = "dish-";
    return (prefix + id);
  }
}
