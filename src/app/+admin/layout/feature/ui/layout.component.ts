import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NzLayoutModule,
    RouterLink,
    RouterModule,
    CommonModule,
  ],
  template: ` <nz-content>
    <div>
      <router-outlet></router-outlet>
    </div>
  </nz-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
