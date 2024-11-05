import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _service: AuthService, private _router: Router) {}
  canActivate(): boolean {
    const isLoggedIn = this._service.isLoggedIn();
    const isAdmin = this._service.isAdmin();
    if (!isLoggedIn || !isAdmin) {
      this._router.navigate(['/']);
      return false;
    }
    return true;
  }
}
