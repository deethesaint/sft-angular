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
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular'
import { CommonModule } from '@angular/common';

@Component({
    selector: 'job-form',
    standalone: true,
    imports: [
        CommonModule,
        NzButtonModule,
        NzModalModule,
        ReactiveFormsModule,
        NzFormModule,
        EditorComponent,
    ],
    providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
    template: `
        <div class="tw-w-full tw-grid tw-justify-items-end">
            <button nz-button nzType="primary" (click)="isCreate = true">Create new job</button>
        </div>
        <nz-modal [(nzVisible)]="isCreate" nzTitle="Create new job" nzCancelText="Cancel" nzOkText="Create" (nzOnCancel)="isCreate = false" (nzOnOk)="onCreateSubmit()" nzWidth="720px">
        <ng-container *nzModalContent>
            <form nz-form [formGroup]="jobCreatingFormGroup">
            <div class="tw-grid tw-grid-cols-3 tw-gap-2">
                <div>
                    <label>Type</label>
                    <select class="tw-border tw-rounded-lg tw-w-full tw-h-8" formControlName="type">
                        <option *ngFor="let item of jobTypeItems" (value)="item"> {{ item }} </option>
                    </select>
                </div>
                <div class="tw-col-span-2">
                    <label>Company</label>
                    <nz-form-item>
                        <nz-form-control nzErrorTip="Please enter company!">
                            <nz-input-group>
                                <input class="tw-border tw-rounded-lg tw-w-full tw-h-8" type="text" formControlName="company">
                            </nz-input-group>
                        </nz-form-control>
                    </nz-form-item>
                </div>
                <div>
                    <label>Company Url</label>
                    <nz-form-item>
                        <nz-form-control nzErrorTip="Please enter company url!">
                            <nz-input-group>
                            <input class="tw-border tw-rounded-lg tw-w-full tw-h-8" type="text" formControlName="company_url">
                            </nz-input-group>
                        </nz-form-control>
                    </nz-form-item>
                </div>
                <div class="tw-col-span-2">
                    <label>Location</label>
                    <nz-form-item>
                        <nz-form-control nzErrorTip="Please enter location!">
                            <nz-input-group>
                            <input class="tw-border tw-rounded-lg tw-w-full tw-h-8" type="text" formControlName="location">
                            </nz-input-group>
                        </nz-form-control>
                    </nz-form-item>
                </div>
                <div class="tw-col-span-full">
                    <label>Title</label>
                    <nz-form-item>
                        <nz-form-control nzErrorTip="Please enter title!">
                            <nz-input-group>
                            <input class="tw-border tw-rounded-lg tw-w-full tw-h-8" type="text" formControlName="title">
                            </nz-input-group>
                        </nz-form-control>
                    </nz-form-item>
                </div>
                <div class="tw-col-span-full">
                    <label>Description</label>
                    <nz-form-item>
                        <nz-form-control nzErrorTip="Please enter description!">
                            <nz-input-group>
                            <editor apiKey="4nrurq8srrs4laamy5l9tbrd2je0huj4bu3z3mweu864gkfj" [init]="init" formControlName="description"></editor>
                            </nz-input-group>
                        </nz-form-control>
                    </nz-form-item>
                </div>
                <div class="tw-col-span-full">
                    <label>How to Apply</label>
                    <nz-form-item>
                        <nz-form-control nzErrorTip="Please enter 'How to Apply'!">
                            <nz-input-group>
                            <input class="tw-border tw-rounded-lg tw-w-full tw-h-8" type="text" formControlName="how_to_apply">
                            </nz-input-group>
                        </nz-form-control>
                    </nz-form-item>
                </div>
                <div class="tw-col-span-full">
                    <label>Company Logo</label>
                    <nz-form-item>
                        <nz-form-control nzErrorTip="Please enter Company Logo!">
                            <nz-input-group>
                            <input class="tw-border tw-rounded-lg tw-w-full tw-h-8" type="text" formControlName="company_logo">
                            </nz-input-group>
                        </nz-form-control>
                    </nz-form-item>
                </div>
                <div class="tw-col-span-full">
                    <label>Url</label>
                    <nz-form-item>
                        <nz-form-control nzErrorTip="Please enter Url!">
                            <nz-input-group>
                            <input class="tw-border tw-rounded-lg tw-w-full tw-h-8" type="text" formControlName="url">
                            </nz-input-group>
                        </nz-form-control>
                    </nz-form-item>
                    </div>
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
    jobTypeItems = ['Full Time', 'Part Time'];

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

    init: EditorComponent['init'] = {
        plugins: 'lists link image table code help wordcount'
    };

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