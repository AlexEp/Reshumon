import { Injectable } from '@angular/core';
import { CanActivate, Routes, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
 
    if(this.auth.isLogedin())
      return true;
      //
      this.route.navigate(['\login'], {queryParams: {returnUrl : state.url}});
      return false;
    
  }
  constructor(private route: Router, private  auth: AuthService) { }

}
