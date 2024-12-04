import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JobApi } from '../../../+admin/management/job/data-access/model/job-manager.model';
import { JobService } from '../../data-access/service/job.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { Jobs } from '../../data-access/model/job.model';

@Component({
    selector: 'job-detail',
    standalone: true,
    template: `
    <div class="tw-max-w-3xl tw-mx-auto">
    <p> {{ job?.company }} </p>
    <p> {{ job?.company_logo }} </p>
    <p> {{ job?.id }} </p>
    <p> {{ job?.company }} </p>
    <p> {{ job?.company }} </p>
    <p> {{ job?.company }} </p>
    <p> {{ job?.company }} </p>
    <p> {{ job?.company }} </p>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class JobDetailComponent implements OnInit {

    id: string | null = '';
    job: Jobs.Job | null = null;

    constructor(
        private _jobService: JobService,
        private _activatedRoute: ActivatedRoute,
        private _cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.id = this._activatedRoute.snapshot.paramMap.get('id');
        this.getJob();
    }

    getJob() {
        this._jobService.jobsGetOne(this.id!)
        .pipe(
            tap((response) => {
                this.job = response?.responseData;
                
                this._cdr.markForCheck();
            }),
            catchError((err) => {
                return of(null);
            })
        )
        .subscribe();
    }
}