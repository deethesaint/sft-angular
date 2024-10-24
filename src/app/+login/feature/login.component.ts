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
    JsonPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  errorMsg?: string;
  signInFormGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.signInFormGroup = this._formBuilder.group({
      username: [null, [Validators.required, validateUsername]],
      password: [null, Validators.required],
    });
  }

  onLogin() {
    const data = this.signInFormGroup.value;
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
    localStorage.setItem("token", JSON.stringify(response.responseData?.accessToken) ?? "");
    localStorage.setItem("role", JSON.stringify(response.responseData?.user.role) ?? "");
    this._router.navigate(['/home']);
  }

  onError(error: ResponseResult<any>) {
    if (error.status === 401) {
      this.errorMsg = "Invalid username or password!";
    } else {
      this.errorMsg = "An error has occurred! Please try later.";
    }
    this._changeDetectorRef.markForCheck();
  }
}
