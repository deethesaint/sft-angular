import { Route } from "@angular/router";

const JOB_MANANGER_ROUTES: Route[] = [
    {
        path: '',
        loadComponent: () =>
            import('./feature/job.component').then((m) => m.JobComponent),
    }
]
export default JOB_MANANGER_ROUTES