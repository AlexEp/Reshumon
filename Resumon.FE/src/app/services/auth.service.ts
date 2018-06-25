import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { AppErrorHandleService } from './error-handle.service';
import { JwtHelper } from 'angular2-jwt';
import "rxjs/add/operator/map"

@Injectable()
export class AuthService {

  private url = ""
  private jwtHelperService = null;
  private isUserLogedin : boolean = false;

  constructor(private http : HttpClient ,private appConfig : AppConfigService, private errorHandle : AppErrorHandleService)
  { 
    this.jwtHelperService = new JwtHelper();
    this.url = appConfig.getSiteURL() + "/authentication";

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
