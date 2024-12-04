import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";

@Component({
    selector: 'meu-admin-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [
      CommonModule,
      NzLayoutModule,
      NzMenuModule,
      RouterOutlet,
      RouterLink,
      RouterLinkActive
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class AdminHeaderComponent implements OnInit {
    ngOnInit(): void {
        
    }
  }