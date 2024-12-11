import { Routes } from '@angular/router';
import { LayoutComponent } from '../ui/layout.component';
import { AdminGuard } from '../../+login/data-access/guard/admin.guard';
import { LoginGuard } from '../../+login/data-access/guard/login.guard';

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
        canActivate: [LoginGuard],
        loadChildren: () => import('../../+login/login.routes'),
      }
    ]
  },
  {
    path: 'jobs',
    component: LayoutComponent,
    children: [
      {
        path: '',
        canActivate: [],
        loadChildren: () => import('../../+job/job.routes')
      }
    ]
  }
];
