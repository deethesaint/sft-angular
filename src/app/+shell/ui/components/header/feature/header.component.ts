import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../../+login/data-access/service/auth.service';

@Component({
  selector: 'meu-header',
  standalone: true,
  imports: [CommonModule, NzLayoutModule, NzCardModule, NzMenuModule, RouterLink, RouterLinkActive, NzDropDownModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(private _service: AuthService) {}
  ngOnInit(): void {}

  isLoggedIn(): boolean {
    return this._service.isLoggedIn();
  }

  isAdmin(): boolean {
    return this._service.isAdmin();
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }
}
