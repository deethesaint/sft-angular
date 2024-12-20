import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';

import { CommonModule, DatePipe, JsonPipe, NgFor } from '@angular/common';
import { JobService } from '../data-access/service/job.service'
import { ResponseResult, Rows } from '../../shared/data-access/interface/response.type';
import { Jobs } from '../data-access/model/job.model';
import { catchError, of, tap } from 'rxjs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'meu-job-list-page',
  standalone: true,
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  imports: [
    CommonModule,
    NgFor,
    NzCardModule,
    NzAvatarModule,
    NzPaginationModule,
    DatePipe,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobComponent implements OnInit {
  jobList: Rows<Jobs.Job> | null = null;
  pageIndex: number = 1;
  pageSize: number = 5;
  tagItems = ['Laravel', 'React', 'React Native', 'VueJS', 'Vite', 'Svelte', 'CodeIgniter', 'Flask', 'Python',
    'C++', 'C', 'C#', 'Java', 'Dart', 'Flutter']
  @Output() pageIndexChange: EventEmitter<number> = new EventEmitter<number>;

  constructor(
    private _service: JobService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    
  }

  ngOnInit(): void {
    this.getAllJobs();
  }

  onPageIndexChange(index: number) {
    this.getAllJobs(index, 5);
  }

  getAllJobs(index: number = 1, pageSize: number = 5) {
    this._service.jobsGet(index, pageSize)
    .pipe(
      tap((response: ResponseResult<Rows<Jobs.Job>>) => {
        this.jobList = response.responseData;
        this._changeDetectorRef.markForCheck();
      }),
      catchError((error: ResponseResult<any>) => {
        return of(null);
      })
    )
    .subscribe();
  }

  rand() {
    return Math.floor(Math.random() * 20000);
  }
}
