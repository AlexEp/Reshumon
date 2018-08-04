import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { AppErrorHandleService } from './error-handle.service';
import { JwtHelper, AuthModule } from 'angular2-jwt';
import "rxjs/add/operator/map"

declare var Auth0Lock: any;


@Injectable()
export class AuthService {

  private url = ""
  private jwtHelperService = null;
  private isUserLogedin : boolean = false;
  //private lock = new AuthLock();

    // Initializing our Auth0Lock
   lock = new Auth0Lock(
      'bFMJ0_20YLm8R6kZ-QEyNluu3LNk380R',
      'alexepp.auth0.com'
    );

  constructor(private http : HttpClient ,private appConfig : AppConfigService, private errorHandle : AppErrorHandleService)
  { 
    this.jwtHelperService = new JwtHelper();
    this.url = appConfig.getSiteURL() + "/authentication";


    // Listening for the authenticated event
    this.lock.on("authenticated", function(authResult) {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      this.lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          return;
        }

        //document.getElementById('nick').textContent = profile.nickname;

        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
      });
    });







    let token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';//this.getToken();
    //debugger
    if (token) {
      const decodedToken = this.jwtHelperService.decodeToken(token);
      const expirationDate = this.jwtHelperService.getTokenExpirationDate(token);
      const isExpired = this.jwtHelperService.isTokenExpired(token);
    }
    localStorage.setItem("authToken",token);
  }

  public logIn(username : string, password :string){
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

  public logOut(){
    
  }

  public isLogedin()  : boolean{

    return this.getToken() != null;
  }

  public showDialog() {
    this.lock.show();
  }

  

  public getUserRols()  : string[] {

    let token = this.getToken();

    if(!token){
      return []
    }  
    return token.roles;
  }

  private getToken():any{

    var token = localStorage.getItem("authToken");

    if (!token) {
      return null;
    }

    let decodedToken = this.jwtHelperService.decodeToken(token);

  
    let expirationDate = this.jwtHelperService.getTokenExpirationDate(token);
    let isExpired = this.jwtHelperService.isTokenExpired(token);
  
    if(isExpired)
      return null;

    return decodedToken;
  }

}
