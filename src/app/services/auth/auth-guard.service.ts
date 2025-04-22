import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
    providedIn:'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthServiceService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['employee/cycleHome']);
      return false;
    }
    return true;
  }
}