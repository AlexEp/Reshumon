import { Injectable } from '@angular/core';
import { CanActivate, Routes, Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  
  constructor(private route: Router, private  auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
 
    if(this.auth.isAuthenticated())
      return true;
      //
      this.route.navigate(['\login'], {queryParams: {returnUrl : state.url}});
      return false;
    
  }
  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute,state)
  }


}
