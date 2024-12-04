import { Component, OnInit, ViewChild } from '@angular/core';
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
    <job-form (ReloadData)="sendReloadRequest()"></job-form>
    <job-list #jobList></job-list>
    `
})

export class JobComponent implements OnInit {
    @ViewChild('jobList') jobList!: JobListComponent;
    constructor() { }
    ngOnInit() { }

    sendReloadRequest() {
        this.jobList.getAllJobs();
    }
}