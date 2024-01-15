import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: "",
        component: MainLayoutComponent,
        children: [
        {
            path: "",
            loadComponent: () =>
                import("./pages/homepage/homepage.component").then(
                    (c) => c.HomepageComponent
                ),
        },
        {
          path: 'login',
          loadComponent: () =>
            import('./pages/login/login.component').then((c) => c.LoginComponent),
        },
        {
          path: 'userpanel/:id',
          loadComponent: () =>
            import('./pages/userpanel/userpanel.component').then(
              (c) => c.UserpanelComponent
            ),
        },
        ]
    }
];
