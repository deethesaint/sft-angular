import { Route } from '@angular/router';

const LOGIN_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/login.component').then((m) => m.LoginComponent),
  },
];
export default LOGIN_ROUTES;
