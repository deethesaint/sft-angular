import { Route } from '@angular/router';

const JOB_ROUTES: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./feature/job.component').then((m) => m.JobComponent),
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('./feature/+job_detail/job-detail.component').then((m) => m.JobDetailComponent),
      }
    ],
  },
];
export default JOB_ROUTES;
