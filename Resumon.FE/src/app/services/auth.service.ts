import { User, RegistrationModel } from './../shared/user.model';
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

  public userProfile: { 'userName' : string, 'roles' : string[] };;

  constructor(protected http: HttpClient ,
    private appConfig : AppConfigService,
     private errorHandle : AppErrorHandleService,
     private router : Router)
  { 

    this.url = appConfig.getSiteURL(); 

    if(!this.userProfile && localStorage.getItem("token")){ //recreate userProfile from token
      this.recreateUserProfile();
    }
  }

  public logIn(userName : string, password :string) : Observable<boolean>{

    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });

    return this.http.post(this.url + '/token',data, { headers: reqHeader })
    .map( (authResult : any)=> {

      if(authResult && authResult.access_token) {
        this.setSession(authResult);

        return true;
      } 
      return false;
  
    })
  }

  getAllRoles(){
  
    //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });

    return this.http.get(this.url + '/api/v1/account/getallroles')      
    .map(
      response => {
        return response
      }
    )
    .catch((error: Response) => {
      return Observable.throw(new AppError(error));
    })
  
  }
  

  registerUser(user : RegistrationModel){

    return this.http.post<User>(this.url + '/api/v1/account/register', user)
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


  private setSession(authResult : AuthToken): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expires_in * 1000) + new Date().getTime());


    localStorage.setItem("token",JSON.stringify(authResult))
    localStorage.setItem("access_token",authResult.access_token)
    localStorage.setItem('expires_at', expiresAt);

    this.recreateUserProfile();
  
  }

  recreateUserProfile(){
    let token =  localStorage.getItem("token");

    if(token){
      let authResult = JSON.parse(token);
      this.userProfile =  { 'userName' : authResult.userName, 'roles' : JSON.parse( authResult.role) };
    }
  }

  public logOut(){
        // Remove tokens and expiry time from localStorage
    this.cleanData();
    // Go back to the home route
    this.router.navigate(['/']);
  }


  private cleanData() {
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    this.userProfile = null;
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    if  (!localStorage.getItem('expires_at')){
      return false
    }

    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    let isAuthValid = new Date().getTime() < expiresAt;

    if  (!isAuthValid)
    
        this.cleanData();
    return isAuthValid;
  }


  public isAdmin(): boolean {
    // Check whether the current time is past the
    return this.getUserRols().indexOf('Admin') >= 0;
  }
  

  public getUserRols()  : string[] {
    if(!this.userProfile || !this.userProfile.roles){
      return []
    }  
    return this.userProfile.roles;
  }

  public getToken(): string{
    if  (localStorage.getItem('access_token'))
      return  localStorage.getItem('access_token');

    return null;
  }

}


export class AuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  role: string;
  userName: string;

}