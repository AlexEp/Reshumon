import { User } from './../shared/user.model';
import { Injectable } from '@angular/core';

import { AppConfigService } from './app-config.service';
import { AppErrorHandleService } from './error-handle.service';
import { JwtHelper, AuthModule, AuthHttp } from 'angular2-jwt';
import * as auth0 from 'auth0-js';
import "rxjs/add/operator/map"
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppError } from '../errors/app-error';
import { promise } from 'protractor';



@Injectable()
export class AuthService {


  private url = ""
  //private jwtHelperService = null;
  private isUserLogedin : boolean = false;
  public userProfile: any;

  constructor(protected http: HttpClient ,
    private appConfig : AppConfigService,
     private errorHandle : AppErrorHandleService,
     private router : Router)
  { 
    //this.jwtHelperService = new JwtHelper();
    this.url = appConfig.getSiteURL(); // + "/authentication";


    // let token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';//this.getToken();
    // //debugger
    // if (token) {
    //   const decodedToken = this.jwtHelperService.decodeToken(token);
    //   const expirationDate = this.jwtHelperService.getTokenExpirationDate(token);
    //   const isExpired = this.jwtHelperService.isTokenExpired(token);
    // }
    // localStorage.setItem("authToken",token);
  }

  public logIn(userName : string, password :string) : Observable<boolean>{

    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });

    return this.http.post(this.url + '/token',data, { headers: reqHeader })
    .map( (authResult : any)=> {

      if(authResult && authResult.access_token) {
        this.setSession(authResult);

        this.getUserClaims().subscribe(r =>  
          this.userProfile  = r);

        return true;
      } 
      return false;
  
    })
  }

  registerUser(user : User){

    let body: User = new User() ;

      body.UserName= user.UserName;
      body.Password= user.Password;
      body.Email= user.Email;
      body.FirstName= user.FirstName;
      body.LastName= user.LastName;
    
    return this.http.post<User>(this.url + '/api/v1/account/register', body)
      .map(
        response => {
          return response
        }
      )
      .catch((error: Response) => {
        return Observable.throw(new AppError(error));
      })
  }

  getUserClaims(){

    
    var reqHeader = new HttpHeaders({
   'Content-Type': 'application/x-www-urlencoded',
    'authorization':`bearer ${localStorage.getItem('access_token')}` });
    return  this.http.get(this.url +'/api/v1/account/GetUserClaims',{ headers: reqHeader });
   }


  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expires_in * 1000) + new Date().getTime());
    localStorage.setItem("access_token",authResult.access_token)
    localStorage.setItem('expires_at', expiresAt);
  }


  public logOut(){
        // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');

    this.userProfile = null;
    // Go back to the home route
    this.router.navigate(['/']);
  }


  


  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }


  public isAdmin(): boolean {
    // Check whether the current time is past the
    return this.getUserRols().indexOf('admin') >= 0;
  }
  
  // public getUserProfile(): boolean {
  //   var token = localStorage.getItem('id_token');
  //   var decodedToken = this.jwtHelperService.decodeToken(token);

  //   var url = "https://" + "alexepp.auth0.com" + "api/v2/users/" + decodedToken.sub;
  //   this.authHttp.get(url).subscribe(r => console.log(r));
  //   // Check whether the current time is past the
  //   return 
  // }

/* OLd */
  public getUserRols()  : string[] {
    if(!this.userProfile || !this.userProfile.app_metadata.roles){
      return []
    }  
    return this.userProfile.app_metadata.roles;
  }

}
