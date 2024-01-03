import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  constructor(
    public router: Router
    ){};
  navigateToHomepage(){
    this.router.navigate(['']);
  }
}
