import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'meu-header',
  standalone: true,
  imports: [CommonModule, NzLayoutModule, NzCardModule, NzMenuModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {}
}
