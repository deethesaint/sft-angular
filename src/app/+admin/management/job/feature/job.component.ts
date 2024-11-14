import { Component, OnInit } from '@angular/core';
import { JobListComponent } from './job-list.component';
import { JobFormComponent } from './job-form.component';

@Component({
    selector: 'job-parent',
    standalone: true,
    imports: [
        JobListComponent,
        JobFormComponent,
    ],
    template: `
    <h1 class="tw-text-center tw-text-3xl tw-font-semibold tw-my-3">Jobs</h1>
    <job-form></job-form>
    <job-list></job-list>
    `
})

export class JobComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}