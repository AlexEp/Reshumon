import { Injectable } from '@angular/core';
import { CanActivate, Routes, Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuardService implements CanActivate,CanActivateChild {
 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
 
    if(this.auth.isAuthenticated() && this.auth.isAdmin())
      return true;
      //
      this.route.navigate(['/daily-activity'], {queryParams: {returnUrl : state.url}});
      return false;
    
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
   return this.canActivate(childRoute,state)
  }

  constructor(private route: Router, private  auth: AuthService) { }

}
