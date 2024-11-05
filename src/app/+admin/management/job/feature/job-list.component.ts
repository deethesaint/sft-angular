import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { JobManagerService } from '../data-access/service/job-manager.service';
import { catchError, of, tap } from 'rxjs';
import { ResponseResult, Rows } from '../../../../shared/data-access/interface/response.type';
import { Jobs } from '../data-access/model/job-manager.model';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
    selector: 'job-list',
    standalone: true,
    imports: [
        CommonModule,
        NzLayoutModule,
        NzTableModule,
        NzButtonModule
    ],
    template: `
        <nz-content class="tw-my-3">
            <button nz-button nzType="primary">Create new job</button>
            <nz-table 
                #rowTable
                [nzData]="jobsList"
                [nzPageSize]="5"
                nzShowPagination
                nzShowSizeChanger
                [nzPageSizeOptions]="[5, 10, 25, 50, 100]"
                class="tw-my-3"
                >
                <thead>
                    <tr>
                        <th class="tw-text-start">
                            Title
                        </th>
                        <th class="tw-text-start">
                            Company
                        </th>
                        <th class="tw-text-start">
                            Created at
                        </th>
                        <th class="tw-text-start">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let job of rowTable.data" class="tw-border-b">
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
                            <button nz-button nzType="primary" class="tw-mx-0.5">Edit</button>
                            <button nz-button nzType="primary" nzDanger class="tw-mx-0.5">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </nz-table>
        </nz-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobListComponent implements OnInit {

    pageIndex: number = 1;
    pageSize: number = 999;
    jobsList: Jobs.Job[] = [];
    @Output() pageIndexChange: EventEmitter<number> = new EventEmitter<number>;

    constructor(private _service: JobManagerService, private _cdr: ChangeDetectorRef) { }
    ngOnInit(): void {
        this.getAllJobs(this.pageIndex, this.pageSize);
    }

    getAllJobs(pageIndex: number = 1, pageSize: number = 5) {
        this._service.jobsGet(pageIndex, pageSize)
            .pipe(
                tap((response: ResponseResult<Rows<Jobs.Job>>) => {
                    this.jobsList = response.responseData?.rows || [];
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
        this.getAllJobs(index, this.pageSize);
    }
}
