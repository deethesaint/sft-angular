import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { JobManagerService } from '../data-access/service/job-manager.service';
import { ResponseResult } from '../../../../shared/data-access/interface/response.type';
import { JobApi } from '../data-access/model/job-manager.model';
import { catchError, of, tap } from 'rxjs';

@Component({
    selector: 'job-form',
    standalone: true,
    imports: [
        NzButtonModule,
        NzModalModule,
        ReactiveFormsModule
    ],
    template: `
        <div class="tw-w-full tw-grid tw-justify-items-end">
            <button nz-button nzType="primary" (click)="isCreate = true">Create new job</button>
        </div>
        <nz-modal [(nzVisible)]="isCreate" nzTitle="Create new job" nzCancelText="Cancel" nzOkText="Create" (nzOnCancel)="isCreate = false" (nzOnOk)="isCreate = false; onCreateSubmit()">
        <ng-container *nzModalContent>
            <form [formGroup]="jobCreatingFormGroup">
            <div class="tw-flex tw-flex-col tw-flex-wrap tw-gap-y-1">
            <label>Type</label>
                <select class="tw-border tw-rounded-lg tw-h-8" formControlName="type">
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                </select>
                <label>Company</label>
                <input class="tw-border tw-rounded-lg tw-h-8" type="text" formControlName="company">
                <label>Company Url</label>
                <input class="tw-border tw-rounded-lg tw-h-8" type="text" formControlName="company_url">
                <label>Location</label>
                <input class="tw-border tw-rounded-lg tw-h-8" type="text" formControlName="location">
                <label>Tilte</label>
                <input class="tw-border tw-rounded-lg tw-h-8" type="text" formControlName="title">
                <label>Description</label>
                <textarea class="tw-border tw-rounded-lg tw-h-20" type="text" formControlName="description"></textarea>
                <label>How to Apply</label>
                <input class="tw-border tw-rounded-lg tw-h-8" type="text" formControlName="how_to_apply">
                <label>Company Logo</label>
                <input class="tw-border tw-rounded-lg tw-h-8" type="text" formControlName="company_logo">
                <label>Url</label>
                <input class="tw-border tw-rounded-lg tw-h-8" type="text" formControlName="url">
            </div>
            </form>
        </ng-container>
        </nz-modal>
    `
})

export class JobFormComponent implements OnInit {

    isCreate: boolean = false;

    jobCreatingFormGroup: FormGroup;

    constructor(private _fb: FormBuilder, private _service: JobManagerService) {
        this.jobCreatingFormGroup = this._fb.group({
            type: ['Full Time', Validators.required],
            company: ['', Validators.required],
            company_url: ['', Validators.required],
            location: ['', Validators.required],
            title: ['', Validators.required],
            description: ['', Validators.required],
            how_to_apply: ['', Validators.required],
            company_logo: ['', Validators.required],
            url: ['', Validators.required],
        });
    }

    ngOnInit() {

    }

    onCreateSubmit() {
        const data = this.jobCreatingFormGroup.value;
        if (!this.jobCreatingFormGroup.valid) {
            Object.values(this.jobCreatingFormGroup.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
            return;
        }
        this.jobCreatingFormGroup.markAllAsTouched();
        this._service.jobsPost(data)
            .pipe(
                tap((response: ResponseResult<JobApi.Request>) => {
                    console.log(response);
                }),
                catchError((err) => {
                    return of(null);
                })
            )
            .subscribe();
    }

    onEditSubmit() {

    }

    
}