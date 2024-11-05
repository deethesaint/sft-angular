import { Route } from "@angular/router";

const JOB_MANANGER_ROUTES: Route[] = [
    {
        path: '',
        loadComponent: () =>
            import('./feature/job-list.component').then((m) => m.JobListComponent),
    }
]
export default JOB_MANANGER_ROUTES