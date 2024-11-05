import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private _service: AuthService, private _router: Router) {}
  canActivate(): boolean {
    return !this._service.isLoggedIn();
  }
}
