import { Route } from '@angular/router';
import { AdminLayoutComponent } from './layout/feature/ui/layout.component';

const ADMIN_ROUTES: Route[] = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'configuration',
      },
    ],
  },
];
export default ADMIN_ROUTES;
