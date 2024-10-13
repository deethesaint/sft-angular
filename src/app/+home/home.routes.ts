import { Route } from '@angular/router';

const HOME_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/home.component').then((m) => m.HomeComponent),
  },
];
export default HOME_ROUTES;
