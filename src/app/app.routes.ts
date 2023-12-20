import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/homepage/homepage.component').then(
            (c) => c.HomepageComponent
          ),
      },
      {
        path: 'userpanel',
        loadComponent: () =>
          import('./pages/userpanel/userpanel.component').then(
            (c) => c.UserpanelComponent
          ),
      },
    ],
  },
];
