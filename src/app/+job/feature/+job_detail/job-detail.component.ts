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
        <div class="tw-w-full tw-gap-y-2 tw-flex tw-flex-col">
            <p class="tw-text-2xl tw-font-bold tw-border-b">{{ job?.title }}</p>
            <p> {{ job?.created_at }} by {{ job?.company }} </p>
            <div class="tw-flex tw-gap-y-2 tw-gap-x-3">
                <span class="tw-bg-black tw-p-2 tw-rounded-lg tw-text-white tw-my-auto">{{ job?.type }}</span>
                <span class="tw-my-auto"><i class="fa-solid fa-location-dot"></i> {{ job?.location }} </span>
            </div>
            <div>
                <div class="tw-bg-sky tw-rounded-lg tw-px-3 tw-py-2 tw-flex tw-gap-x-6 tw-shadow-xl">
                    <img class="tw-rounded-full tw-object-cover tw-h-20 tw-w-20" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAGvRhdg1vaZyhkn5zzE7p35e70SUgv0TVCw&s">
                    <div>
                        <div class="tw-border-b tw-flex tw-justify-between">
                            <p class="tw-text-lg tw-font-semibold"> {{ job?.company }}</p>
                            <span>
                                <a class="tw-text-link tw-font-semibold" href="{{job?.company_url}}">Website</a>
                                &nbsp;
                                <a class="tw-text-link tw-font-semibold" href="{{job?.company_url}}">How to apply</a>
                            </span>
                        </div>
                        <div>
                            <p class="tw-text-lg"> {{ job?.company }} is a company that we are creating values through bla bla bla bla
                            bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</p>
                        </div>
                    </div>
                </div>
                <div class="tw-mt-6 tw-text-lg" [innerHTML]="job?.description">
                    
                </div>
            </div>
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