import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HeaderComponent } from './components/header/feature/header.component';
import { FooterComponent } from './components/footer/feature/footer.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'meu-layout',
  standalone: true,
  imports: [
    RouterModule,
    DatePipe,
    HeaderComponent,
    FooterComponent,
    NzButtonModule,
    NzIconModule,
    CommonModule,
    NzToolTipModule,
    NzLayoutModule
  ],
  template: `
    <div class="tw-container">
      <nz-layout>
      <meu-header></meu-header>
      <div class="tw-relative tw-min-h-[92dvh]">
        <router-outlet></router-outlet>
      </div>
      <meu-footer></meu-footer>
      </nz-layout>
    </div>
  `,
  animations: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  isSmallScreen = signal(false);

  constructor(private breakpointObserver: BreakpointObserver) {}
  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((res) => {
      this.isSmallScreen.set(res.matches);
    });

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      const root = document.documentElement;
      root.style.setProperty('--color-theme', '31 31 31');
      root.style.setProperty('--color-paper', '255 255 255');
    }
  }
}
