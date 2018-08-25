import { Injectable } from '@angular/core';

import { AppConfigService } from './app-config.service';
import { AppErrorHandleService } from './error-handle.service';
import { JwtHelper, AuthModule, AuthHttp } from 'angular2-jwt';
import * as auth0 from 'auth0-js';
import "rxjs/add/operator/map"
import { Router } from '@angular/router';



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

  constructor(private authHttp : AuthHttp ,
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

  // public logIn(username : string, password :string,){
  //   return this.http.post(this.url,JSON.stringify({'username' : username , 'password':password }))
  //   .map( (response : Response)=> {
  //     let result : any = response.json();

  //     if(result && result.token) {
  //       localStorage.setItem("authToken",result.token)
  //       return true;
  //     } 
  //     return false;
  
  //   })
  // }

  public handleAuthentication(): void {
    // this.auth0.parseHash((err, authResult) => {
    //   if (authResult && authResult.accessToken && authResult.idToken) {
    //     window.location.hash = '';
    //     this.setSession(authResult);
    //     this.router.navigate(['/home']);
    //   } else if (err) {
    //     this.router.navigate(['/home']);
    //     console.log(err);
    //   }
    // });



    //----------------- DEV  ----------------
        let authResult = {
          accessToken : "m5vbmNlIjoibTlTN24zTGRBS1QxaFZSTEo5VVIxRlY1ZjZlbF",
          idToken : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6Ik1FWkRPREUzTkRReE9URTJSREE0UWpCRVF6TTFNREE1TWpZd1FUbEZOamcwUkRKQlFrSTVRZyJ9.eyJuaWNrbmFtZSI6ImFsZXhlcHAiLCJuYW1lIjoiYWxleGVwcEBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNjQwNGE5OTY5MzIyNWNjZjhiY2UxNzQ5MDQyYzkyNGY_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZhbC5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0wOC0wOFQxNzo1ODoxNS45MDdaIiwiaXNzIjoiaHR0cHM6Ly9hbGV4ZXBwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1YjIzYzA4M2I2OTI4NjQyN2MyYjAwOWQiLCJhdWQiOiJHbDBZMTNYcWdZcWRsZzdjaGU1cjdRdm16UDZCMlRIQyIsImlhdCI6MTUzMzc1MTA5NSwiZXhwIjoxNTMzNzg3MDk1LCJhdF9oYXNoIjoiaGhsY21UbHFKRFNDYnZfVS1rYXpzZyIsIm5vbmNlIjoibTlTN24zTGRBS1QxaFZSTEo5VVIxRlY1ZjZlbFFFckciLCJhcHBfbWV0YWRhdGEiOnsicm9sZXMiOlsiYWRtaW4iXX19.dngOd9mABbsI-uWeigzZHC7IzxJiXkj_kwEKGdyHGOI",
          expiresIn : new Date(2050,1,1).getTime()
        };
        this.setSession(authResult);

        var decodedToken = this.jwtHelperService.decodeToken(authResult.idToken);
        this.userProfile = decodedToken;
        this.router.navigate(['/home']);
        
      //----------------- DEV  ----------------
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
        this.getUserProfile();
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

  public isAdmin(): boolean {
    // Check whether the current time is past the
    return this.getUserRols().indexOf('admin') >= 0;
  }
  
  public getUserProfile(): boolean {
    var token = localStorage.getItem('id_token');
    var decodedToken = this.jwtHelperService.decodeToken(token);

    var url = "https://" + "alexepp.auth0.com" + "api/v2/users/" + decodedToken.sub;
    this.authHttp.get(url).subscribe(r => console.log(r));
    // Check whether the current time is past the
    return 
  }

/* OLd */
  public getUserRols()  : string[] {
    if(!this.userProfile || !this.userProfile.app_metadata.roles){
      return []
    }  
    return this.userProfile.app_metadata.roles;
  }

}
