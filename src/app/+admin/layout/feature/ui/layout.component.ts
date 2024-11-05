import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from "./components/header/feature/header.component";
import { AdminFooterComponent } from "./components/footer/feature/footer.component";
import { JobListComponent } from "../../../management/job/feature/job-list.component";

@Component({
  selector: 'admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NzLayoutModule,
    RouterLink,
    RouterModule,
    CommonModule,
    AdminHeaderComponent,
    AdminFooterComponent,
    JobListComponent
],
  template: ` <nz-content>
    <div class="tw-container">
      <nz-layout>
      <meu-admin-header>
        <router-outlet></router-outlet>
      </meu-admin-header>
      <meu-admin-footer></meu-admin-footer>
      </nz-layout>
    </div>
  </nz-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
