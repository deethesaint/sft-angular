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
      {
        path: 'jobs',
        children: [
          {
            path: '',
            loadChildren: () => import('./management/job/job-manager.routes'),
          }
        ]
      }
    ],
  },
];
export default ADMIN_ROUTES;
