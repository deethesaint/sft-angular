import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { JobManagerService } from '../data-access/service/job-manager.service';
import { ResponseResult } from '../../../../shared/data-access/interface/response.type';
import { JobApi } from '../data-access/model/job-manager.model';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { catchError, of, tap } from 'rxjs';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
    selector: 'job-form',
    standalone: true,
    imports: [
        NzButtonModule,
        NzModalModule,
        ReactiveFormsModule,
        NzFormModule
    ],
    template: `
        <div class="tw-w-full tw-grid tw-justify-items-end">
            <button nz-button nzType="primary" (click)="isCreate = true">Create new job</button>
        </div>
        <nz-modal [(nzVisible)]="isCreate" nzTitle="Create new job" nzCancelText="Cancel" nzOkText="Create" (nzOnCancel)="isCreate = false" (nzOnOk)="onCreateSubmit()">
        <ng-container *nzModalContent>
            <form nz-form [formGroup]="jobCreatingFormGroup">
            <div class="tw-flex tw-flex-col tw-flex-wrap tw-gap-y-1">
            <label>Type</label>
                <select class="tw-border tw-rounded-lg tw-h-8" formControlName="type">
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                </select>
                <label>Company</label>
                <nz-form-item>
                    <nz-form-control nzErrorTip="Please enter company!">
                        <nz-input-group>
                            <input class="tw-border tw-rounded-lg tw-w-full tw-h-8" type="text" formControlName="company">
                        </nz-input-group>
                    </nz-form-control>
                </nz-form-item>
                <label>Company Url</label>
                <nz-form-item>
                    <nz-form-control nzErrorTip="Please enter company url!">
                        <nz-input-group>
                        <input class="tw-border tw-rounded-lg tw-w-full tw-h-8" type="text" formControlName="company_url">
                        </nz-input-group>
                    </nz-form-control>
                </nz-form-item>
                <label>Location</label>
                <nz-form-item>
                    <nz-form-control nzErrorTip="Please enter location!">
                        <nz-input-group>
                        <input class="tw-border tw-rounded-lg tw-w-full tw-h-8" type="text" formControlName="location">
                        </nz-input-group>
                    </nz-form-control>
                </nz-form-item>
                <label>Title</label>
                <nz-form-item>
                    <nz-form-control nzErrorTip="Please enter title!">
                        <nz-input-group>
                        <input class="tw-border tw-rounded-lg tw-w-full tw-h-8" type="text" formControlName="title">
                        </nz-input-group>
                    </nz-form-control>
                </nz-form-item>
                <label>Description</label>
                <nz-form-item>
                    <nz-form-control nzErrorTip="Please enter description!">
                        <nz-input-group>
                        <textarea class="tw-border tw-rounded-lg tw-w-full tw-h-20" type="text" formControlName="description"></textarea>
                        </nz-input-group>
                    </nz-form-control>
                </nz-form-item>
                <label>How to Apply</label>
                <nz-form-item>
                    <nz-form-control nzErrorTip="Please enter 'How to Apply'!">
                        <nz-input-group>
                        <input class="tw-border tw-rounded-lg tw-w-full tw-h-8" type="text" formControlName="how_to_apply">
                        </nz-input-group>
                    </nz-form-control>
                </nz-form-item>
                <label>Company Logo</label>
                <nz-form-item>
                    <nz-form-control nzErrorTip="Please enter Company Logo!">
                        <nz-input-group>
                        <input class="tw-border tw-rounded-lg tw-w-full tw-h-8" type="text" formControlName="company_logo">
                        </nz-input-group>
                    </nz-form-control>
                </nz-form-item>
                <label>Url</label>
                <nz-form-item>
                    <nz-form-control nzErrorTip="Please enter Url!">
                        <nz-input-group>
                        <input class="tw-border tw-rounded-lg tw-w-full tw-h-8" type="text" formControlName="url">
                        </nz-input-group>
                    </nz-form-control>
                </nz-form-item>
            </div>
            </form>
        </ng-container>
        </nz-modal>
    `
})

export class JobFormComponent {
    @Output() ReloadData = new EventEmitter();

    isCreate: boolean = false;
    jobCreatingFormGroup: FormGroup;

    constructor(private _fb: FormBuilder,
        private _service: JobManagerService,
        private _notification: NzNotificationService) {
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

    createNotification(type: string, title: string, message: string): void {
        this._notification.create(
            type,
            title,
            message
        );
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
                    this.createNotification(
                        'success',
                        'Success!',
                        'You have created a new job successfully!'
                    );
                    this.ReloadData.emit();
                }),
                catchError((err) => {
                    this.createNotification(
                        'error',
                        'Error!',
                        'An error has occurred! Please try later!'
                    )
                    return of(null);
                })
            )
            .subscribe();
            this.isCreate = false;
    }
}