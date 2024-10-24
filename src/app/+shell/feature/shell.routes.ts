import { Routes } from '@angular/router';
import { LayoutComponent } from '../ui/layout.component';
import { LoginComponent } from '../../+login/feature/login.component';
import { AuthGuard } from '../../+login/data-access/guard/auth.guard';
import { AdminGuard } from '../../+login/data-access/guard/admin.guard';

export const shellRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        canActivate: [], //not have guard yet, set up later
        loadChildren: () => import('../../+home/home.routes'),
      },
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        canActivate: [AdminGuard],
        loadChildren: () => import('../../+admin/admin.routes'),
      },
    ],
  },
  {
    path: 'login',
    component: LayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('../../+login/login.routes'),
      }
    ]
  },
];
