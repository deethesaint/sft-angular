import { Component, OnInit } from '@angular/core';
import { JobListComponent } from './job-list.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { JobFormComponent } from './job-form.component';

@Component({
    selector: 'job-parent',
    standalone: true,
    imports: [
        JobListComponent,
        JobFormComponent,
        NzButtonModule
    ],
    template: `
    <h1 class="tw-text-center tw-text-3xl tw-font-semibold tw-my-3">Jobs</h1>
    <div class="tw-w-full tw-grid tw-justify-items-end">
        <button nz-button nzType="primary">Create new job</button>
    </div>
    <job-form></job-form>
    <job-list></job-list>
    `
})

export class JobComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}