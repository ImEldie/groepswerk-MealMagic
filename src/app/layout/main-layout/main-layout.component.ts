import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthApiService } from '../../services/api-calls/auth-api.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  hideAddDishButton: boolean = false;
  hideMyAccountButton: boolean = false;
  constructor(
    public router: Router,
    public authService: AuthApiService,
  ) {}
  navigateToHomepage() {
    this.router.navigate(['']);
  }
  ngOnInit() {
    this.hideAddDishButton = !this.router.url.includes('/add-dish');
    this.hideMyAccountButton = !this.router.url.includes('userpanel');
    this.router.events.subscribe((hideButton) => {
      if (hideButton instanceof NavigationEnd) {
        this.hideAddDishButton = !this.router.url.includes('/add-dish');
        this.hideMyAccountButton = !this.router.url.includes('userpanel');
      }
    });
  }
}
