import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor() {}
  canActivate(): boolean {
    return true;
    // return false if user role is not admin
    // return false;
  }
}
