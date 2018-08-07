import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { AppErrorHandleService } from './error-handle.service';
import { JwtHelper, AuthModule } from 'angular2-jwt';
import * as auth0 from 'auth0-js';
import "rxjs/add/operator/map"
import { Router } from '../../../node_modules/@angular/router';

declare var Auth0Lock: any;


@Injectable()
export class AuthService {


  private url = ""
  private jwtHelperService = null;
  private isUserLogedin : boolean = false;
  public userProfile: any;
  //private lock = new AuthLock();

  auth0 = new auth0.WebAuth({
    clientID: 'Gl0Y13XqgYqdlg7che5r7QvmzP6B2THC',
    domain: 'alexepp.auth0.com',
    responseType: 'token id_token',
    audience: 'https://alexepp.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200',
    scope: 'openid profile'
  });

  constructor(private http : HttpClient ,
    private appConfig : AppConfigService,
     private errorHandle : AppErrorHandleService,
     private router : Router)
  { 
    this.jwtHelperService = new JwtHelper();
    this.url = appConfig.getSiteURL() + "/authentication";


    // let token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';//this.getToken();
    // //debugger
    // if (token) {
    //   const decodedToken = this.jwtHelperService.decodeToken(token);
    //   const expirationDate = this.jwtHelperService.getTokenExpirationDate(token);
    //   const isExpired = this.jwtHelperService.isTokenExpired(token);
    // }
    // localStorage.setItem("authToken",token);
  }

  public logIn(username : string, password :string,){
    return this.http.post(this.url,JSON.stringify({'username' : username , 'password':password }))
    .map( (response : Response)=> {
      let result : any = response.json();

      if(result && result.token) {
        localStorage.setItem("authToken",result.token)
        return true;
      } 
      return false;
  
    })
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }


  public logOut(){
        // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.userProfile = null;
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }
  
    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public showDialog() {
    this.auth0.authorize();
  }

  
/* OLd */
  public getUserRols()  : string[] {
    if(!this.userProfile || !this.userProfile.roles){
      return []
    }  
    return this.userProfile.roles;
  }

}
