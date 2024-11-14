import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { JobManagerService } from '../data-access/service/job-manager.service';
import { catchError, of, tap } from 'rxjs';
import { ResponseResult, Rows } from '../../../../shared/data-access/interface/response.type';
import { JobApi } from '../data-access/model/job-manager.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { response } from 'express';
import { NzFormModule } from 'ng-zorro-antd/form';

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
        NzFormModule
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
        <nz-modal [(nzVisible)]="isEdit" nzTitle="Create new job" nzCancelText="Cancel" nzOkText="Confirm" (nzOnCancel)="isEdit = false" (nzOnOk)="onEditSubmit()">
        <ng-container *nzModalContent>
            <form nz-form [formGroup]="jobEdittingFormGroup">
            <div class="tw-flex tw-flex-col tw-flex-wrap tw-gap-y-1">
            <label>Type</label>
                <select class="tw-border tw-rounded-lg tw-h-8" formControlName="type">
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                </select>
                <nz-form-item>
                    <label>Company</label>
                    <nz-form-control nzErrorTip="Please input your username!">
                    <nz-input-group class="tw-h-12">
                        <input class="tw-border tw-rounded-lg tw-h-8" type="text" formControlName="company">
                    </nz-input-group>
                    </nz-form-control>
                </nz-form-item>
                
                
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
        <nz-content class="tw-my-3">
            <nz-table 
                #rowTable
                [nzData]="['']"
                [nzPageSize]="5"
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
                            <button nz-button nzType="primary" class="tw-mx-0.5" (click)="onEditOpen(job.id)">Edit</button>
                            <button nz-button nzType="primary" nzDanger class="tw-mx-0.5" (click)="showConfirmModal(job.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </nz-table>
        </nz-content>
        <div class="tw-w-full tw-grid tw-justify-items-center tw-my-3">
      <nz-pagination
        (nzPageIndexChange)="onPageIndexChange($event)"
        [nzPageIndex]="pageIndex"
        [nzPageSize]="pageSize"
        [nzTotal]="jobsList?.itemCount || 0 * 10"
      >
      </nz-pagination>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobListComponent implements OnInit {
    pageIndex: number = 1;
    pageSize: number = 5;
    jobsList: Rows<JobApi.Response> | null = null;

    isDeleting: boolean = false;
    deletetingId: string = "";

    isEdit: boolean = false;
    edittingId: string  = "";
    jobEdittingFormGroup: FormGroup;

    @Output() pageIndexChange: EventEmitter<number> = new EventEmitter<number>;

    constructor(
        private _service: JobManagerService,
        private _cdr: ChangeDetectorRef,
        private _fb: FormBuilder) {
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

    getAllJobs(pageIndex: number = 1, pageSize: number = 5) {
        this._service.jobsGet(pageIndex, pageSize)
            .pipe(
                tap((response: ResponseResult<Rows<JobApi.Response>>) => {
                    this.jobsList = response.responseData;
                    console.log(this.jobsList);
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
        this.getAllJobs(index, 5);
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
                }),
                catchError((err) => {
                    console.log(err);
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
                this.getAllJobs();
                this.isEdit = false;
            }),
            catchError((err) => {
                console.log(err);
                return of(null);
            })
        )
        .subscribe();
    }

    onEditOpen(id: string) {
        this.isEdit = true;
        this.edittingId = id;
        this._service.jobsGetOne(id)
            .pipe(
                tap((response: ResponseResult<JobApi.Response>) => {
                    this.jobEdittingFormGroup = this._fb.group({
                        type: ['', Validators.required],
                        company: [response.responseData?.company, Validators.required],
                        company_url: [response.responseData?.company_url, Validators.required],
                        location: [response.responseData?.location, Validators.required],
                        title: [response.responseData?.title, Validators.required],
                        description: [response.responseData?.description, Validators.required],
                        how_to_apply: [response.responseData?.how_to_apply, Validators.required],
                        company_logo: [response.responseData?.company_logo, Validators.required],
                        url: [response.responseData?.url],
                    });
                }),
                catchError((err) => {
                    return of(null);
                })
            )
            .subscribe();
    }
}
