import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JobService } from '../../data-access/service/job.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { Jobs } from '../../data-access/model/job.model';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
    selector: 'job-detail',
    standalone: true,
    imports: [
        NzButtonModule
    ],
    template: `
        <div class="tw-w-full tw-gap-y-2 tw-flex tw-flex-col">
            <p class="tw-text-2xl tw-font-bold tw-border-b">{{ job?.title }}</p>
            <p> {{ job?.created_at }} by {{ job?.company }} </p>
            <div class="tw-bg-wind tw-shadow-md tw-p-3 tw-my-3">
                <div class="tw-flex tw-gap-y-2 tw-gap-x-3 tw-text-md">
                    <span class="tw-bg-black tw-p-2 tw-rounded-lg tw-text-white tw-my-auto">{{ job?.type }}</span>
                    <span class="tw-my-auto"><i class="fa-solid fa-location-dot"></i> {{ job?.location }} </span>
                    <span class="tw-my-auto"><i class="fa-solid fa-comments-dollar"></i> Negotiable</span>
                    <div class="tw-my-auto tw-flex-1 tw-text-end">
                        <button class="tw-text-md" nz-button nzType="primary" nzShape="round">Apply now!</button>
                    </div>
                </div>
            </div>
            
            <div class="tw-relative tw-min-h-72">
                <img class="tw-w-full tw-h-52 tw-object-cover tw-blur-sm" src="https://status.riotgames.com/static/media/riotSelectorMobile.480c8eae.png">
                <div class="tw-absolute tw-top-28 tw-bg-wind tw-rounded-lg tw-px-3 tw-py-2 tw-flex tw-gap-x-6 tw-shadow-xl tw-m-6">
                    <img class="tw-rounded-full tw-object-cover tw-h-20 tw-w-20" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAGvRhdg1vaZyhkn5zzE7p35e70SUgv0TVCw&s">
                    <div class="tw-h-36">
                        <div class="tw-border-b tw-flex tw-justify-between">
                            <p class="tw-text-lg tw-font-semibold"> {{ job?.company }}</p>
                            <span>
                                <a class="tw-text-link tw-font-semibold" href="{{job?.company_url}}">Website</a>
                                &nbsp;
                            </span>
                        </div>
                        <div>
                            <p class="tw-text-lg tw-line-clamp-4"> {{ job?.company }} was founded in 2006 to develop, publish, and support the most player-focused games in the world. As we went from one game to many, we have expanded to over 4,500 Rioters across more than 20 offices around the world bringing a global perspective to the games we create and the characters in them. From the streets of Piltover to the Radianite labs of Alpha Earth, we are all about making games and serving the people who love them.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tw-mt-6 tw-text-lg" [innerHTML]="job?.description">        
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