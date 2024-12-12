import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { JobManagerService } from '../data-access/service/job-manager.service';
import { Observable, Observer, catchError, of, tap } from 'rxjs';
import { ResponseResult, Rows } from '../../../../shared/data-access/interface/response.type';
import { JobApi } from '../data-access/model/job-manager.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
    selector: 'job-list',
    standalone: true,
    imports: [
        CommonModule,
        NzLayoutModule,
        NzTableModule,
        NzButtonModule,
        NzModalModule,
        NzPaginationModule,
        ReactiveFormsModule,
        NzFormModule,
        NzIconModule,
        FormsModule,
        NzUploadModule,
    ],
    styles: `
        nz-table[_ngcontent-jjj-c198] nz-pagination[_ngcontent-jjj-c198] {
                justify-content: center;
        }
    `,
    template: `
        <nz-modal [(nzVisible)]="isDeleting" nzTitle="Warning" nzCancelText="No" nzOkText="Yes" (nzOnCancel)="isDeleting = false" (nzOnOk)="onDelete()">
        <ng-container *nzModalContent>
            <p>Are you sure you want to delete this job?</p>
        </ng-container>
        </nz-modal>
        <nz-modal [(nzVisible)]="isEdit" nzTitle="Create new job" nzCancelText="Cancel" nzOkText="Confirm" (nzOnCancel)="isEdit = false" (nzOnOk)="onEditSubmit()" nzWidth="720px">
        <ng-container *nzModalContent>
            <form nz-form [formGroup]="jobEdittingFormGroup">
            <div class="tw-grid tw-grid-cols-3 tw-gap-2">
                <div>
                    <label>Type</label>
                    <select class="tw-border tw-rounded-lg tw-w-full tw-h-8" formControlName="type">
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
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
                            <textarea class="tw-border tw-rounded-lg tw-w-full tw-h-40" type="text" formControlName="description"></textarea>
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
                    <nz-upload
                        class="avatar-uploader"
                        nzName="avatar"
                        nzListType="picture-card"
                        [nzShowUploadList]="false"
                        (nzChange)="handleChange($event)"
                        >
                        @if (!avatarUrl) {
                            <span class="upload-icon" nz-icon [nzType]="loading ? 'loading' : 'plus'"></span>
                            <div class="ant-upload-text">Upload</div>
                        } @else {
                            <img [src]="avatarUrl" style="width: 100%" />
                        }
                    </nz-upload>
                </div>
                <div class="tw-col-span-full">
                    <label>Url</label>
                    <nz-form-item>
                        <nz-form-control nzErrorTip="Please enter Url!">
                            <nz-input-group>
                            <input (change)="getAllJobs()" class="tw-border tw-rounded-lg tw-w-full tw-h-8" type="text" formControlName="url">
                            </nz-input-group>
                        </nz-form-control>
                    </nz-form-item>
                    </div>
            </div>
            </form>
        </ng-container>
        </nz-modal>
        <nz-content class="tw-my-3">
            <div class="tw-flex tw-gap-3">
            <nz-form-item class="tw-flex-1">
                <nz-form-control>
                    <nz-input-group>
                        <input class="tw-border tw-rounded-lg tw-w-full tw-h-8" [(ngModel)]="searchString">
                    </nz-input-group>
                </nz-form-control>
            </nz-form-item>
            <button type="button" class="tw-border tw-rounded-md tw-h-8 tw-px-3 tw-bg-sky"><span nz-icon nzType="search" nzTheme="outline"></span></button>
        </div>
            <nz-table 
                #rowTable
                [nzData]="['']"
                [nzPageSize]="pageSize"
                [nzFrontPagination]="false"
                class="tw-my-3"
                >
                <thead>
                    <tr>
                        <th nzWidth="100px">
                            Ord.
                        </th>
                        <th nzWidth="100px">
                            Title
                        </th>
                        <th nzWidth="100px">
                            Company
                        </th>
                        <th nzWidth="100px"> 
                            Created at
                        </th>
                        <th nzWidth="100px">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let job of jobsList?.rows; let idx = index" class="tw-border-b">
                        <td>
                            <p>{{ idx + ((pageIndex - 1) * pageSize) + 1}}</p>
                        </td>
                        <td>
                            <p>{{ job.title }}</p>
                        </td>
                        <td>
                            <p>{{ job.company }}</p>
                        </td>
                        <td>
                            <p>{{ job.created_at | date: 'dd/MM/yyyy' }}</p>
                        </td>
                        <td>
                            <button nz-button nzType="primary" nzShape="circle" class="tw-mx-0.5" (click)="onEditOpen(job.id)">
                                <span nz-icon nzType="edit" nzTheme="outline"></span>
                            </button>
                            <button nz-button nzType="primary" nzDanger nzShape="circle" class="tw-mx-0.5" (click)="showConfirmModal(job.id)">
                                <span nz-icon nzType="delete" nzTheme="outline"></span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </nz-table>
        </nz-content>
        <div class="tw-w-full tw-grid tw-justify-items-center tw-my-3">
      <div class="tw-flex tw-flex-row tw-gap-x-6">
      <nz-pagination
        (nzPageIndexChange)="onPageIndexChange($event)"
        [nzPageIndex]="pageIndex"
        [nzPageSize]="pageSize"
        [nzTotal]="jobsList?.itemCount || 0 * 10"
      >
      </nz-pagination>
        <div class="tw-my-auto">
            <label>Item per page</label>
            <select class="tw-h-8 tw-border tw-ms-3" [(ngModel)]="pageSize" (change)="onPageSizeChanged()">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
            </select>
        </div>
      </div>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobListComponent implements OnInit {
    pageIndex: number = 1;
    pageSize: number = 5;
    jobsList: Rows<JobApi.Response> | null = null;

    isDeleting: boolean = false;
    isEdit: boolean = false;

    searchString: string = "";
    deletetingId: string = "";
    edittingId: string = "";

    jobEdittingFormGroup: FormGroup;

    loading = false;
    avatarUrl?: string;
    
    @Output() pageIndexChange: EventEmitter<number> = new EventEmitter<number>;

    constructor(
        private _service: JobManagerService,
        private _fb: FormBuilder,
        private _notification: NzNotificationService,
        private _cdr: ChangeDetectorRef,
    ) {
        this.jobEdittingFormGroup = this._fb.group({
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

    ngOnInit(): void {
        this.getAllJobs(this.pageIndex, this.pageSize);
    }

    createNotification(type: string, title: string, message: string) {
        this._notification.create(
            type,
            title,
            message
        );
    }

    getAllJobs(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
        this._service.jobsGet(pageIndex, pageSize)
            .pipe(
                tap((response: ResponseResult<Rows<JobApi.Response>>) => {
                    this.jobsList = response.responseData;
                    this._cdr.markForCheck();
                }),
                catchError((err) => {
                    return of(null);
                })
            )
            .subscribe();
    }

    onPageIndexChange(index: number) {
        this.pageIndex = index;
        this.getAllJobs(this.pageIndex, this.pageSize);
    }

    onPageSizeChanged() {
        this.pageIndex = 1;
        this.getAllJobs(this.pageIndex, this.pageSize);
    }

    showConfirmModal(id: string) {
        this.isDeleting = true;
        this.deletetingId = id;
    }

    onDelete() {
        this._service.jobsDelete(this.deletetingId).
            pipe(
                tap((response: ResponseResult<JobApi.Request>) => {
                    this.getAllJobs();
                    this.createNotification(
                        'success',
                        'Success!',
                        'You have deleted a job successfully!'
                    );
                }),
                catchError((err) => {
                    this.createNotification(
                        'error',
                        'Error!',
                        'An error has occurred! Please try later!'
                    );
                    return of(null);
                })
            )
            .subscribe();
        this.isDeleting = false;
        this.deletetingId = "";
    }

    onEditSubmit() {
        const data = this.jobEdittingFormGroup.value;
        if (!this.jobEdittingFormGroup.valid) {
            Object.values(this.jobEdittingFormGroup.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
            return;
        }
        this.jobEdittingFormGroup.markAllAsTouched();
        this._service.jobsPut(this.edittingId, data)
            .pipe(
                tap((response: ResponseResult<JobApi.Request>) => {
                    this.createNotification(
                        'success',
                        'Success!',
                        'You have updated job successfully!'
                    )
                    this.getAllJobs();
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
        this.isEdit = false;
    }

    onEditOpen(id: string) {
        this.isEdit = true;
        this.edittingId = id;
        this._service.jobsGetOne(id)
            .pipe(
                tap((response: ResponseResult<JobApi.Response>) => {
                    this.jobEdittingFormGroup.patchValue({
                        type: response.responseData?.type,
                        company: response.responseData?.company,
                        company_url: response.responseData?.company_url,
                        location: response.responseData?.location,
                        title: response.responseData?.title,
                        description: response.responseData?.description,
                        how_to_apply: response.responseData?.how_to_apply,
                        company_logo: response.responseData?.company_logo,
                        url: response.responseData?.url,
                    });
                }),
                catchError((err) => {
                    return of(null);
                })
            )
            .subscribe();
    }

    private getBase64(img: File, callback: (img: string) => void): void {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result!.toString()));
        reader.readAsDataURL(img);
    }

    handleChange(info: { file: NzUploadFile }): void {
        switch (info.file.status) {
        case 'uploading':
            this.loading = true;
            break;
        case 'done':
            this.getBase64(info.file!.originFileObj!, (img: string) => {
            this.loading = false;
            this.avatarUrl = img;
            });
            break;
        case 'error':
            this.loading = false;
            break;
        }
    }
}
