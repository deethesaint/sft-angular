import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
    selector: 'meu-admin-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    imports: [
      CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class AdminFooterComponent implements OnInit {
    ngOnInit(): void {
        
    }
  }