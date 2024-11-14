import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule, JsonPipe } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../data-access/service/auth.service';
import { validateUsername } from '../../shared/utils/form-validator/username.validator';
import { catchError, of, tap } from 'rxjs';
import { ResponseResult } from '../../shared/data-access/interface/response.type';
import { Login } from '../data-access/model/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'meu-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzCheckboxModule,
    NzAlertModule,
    NzFormModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  passwordVisible: boolean = false;
  errorMsg: string = "";
  signInFormGroup: FormGroup;
  // isEdit: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.signInFormGroup = this._fb.group({
      username: ['', [Validators.required, validateUsername]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  onLogin() {
    const data = this.signInFormGroup.value;
    if (!this.signInFormGroup.valid) {
      Object.values(this.signInFormGroup.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      return;
    }
    this.signInFormGroup.markAllAsTouched();
    this._authService.loginPost(data)
      .pipe(
        tap((response: ResponseResult<Login.Response>) => {
          this.onSuccess(response);
        }),
        catchError((error: ResponseResult<any>) => {
          this.onError(error);
          return of(null);
        })
      )
      .subscribe();
  }

  onSuccess(response: ResponseResult<Login.Response>) {
    console.log(response.responseData?.token);
    localStorage.setItem("token", response.responseData?.token ?? "");
    localStorage.setItem("role", response.responseData?.role ?? "");
    this._router.navigate(['/home']);
  }

  onError(error: ResponseResult<any>) {

  }
}
