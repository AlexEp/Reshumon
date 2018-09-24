
import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';

/* Rxjs */
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';
import  'rxjs/add/observable/throw';

/* App Classes */
import { AppError } from '../errors/app-error';
import { AppConfigService } from './app-config.service';
import { AppErrorHandleService } from './error-handle.service';
import { User } from '../shared/user.model';



@Injectable()
export class UsersService  {

  protected url : string
  constructor( protected http : HttpClient ,private appConfig : AppConfigService, private errorHandle : AppErrorHandleService) {
    this.url = appConfig.getSiteURL() + "/api/v1/users";
  }

  getAll() : Observable<User[]> {
    return this.http.get(this.url).map(
        (response : Response)=> response
    )
    .catch((error : Response) => {
      return  Observable.throw(new AppError(error));
    })
  };

  getAllActive() : Observable<User[]> {
    return this.http.get(this.url + '/active').map(
        (response : Response)=> response
    )
    .catch((error : Response) => {
      return  Observable.throw(new AppError(error));
    })
  };


  update(user : User) : Observable<User> {

      return this.http.put<User>(this.url + "?id=" + user.UserID,
      user).map(
        article => {
          return article;
        })
        .catch((error : Response) => {
          return  Observable.throw(new AppError(error));
        })
    }

    delete(user : User) : Observable<User> {
      return this.http.delete<User>(this.url + "?id=" + user.UserID)
          .map(
            response => {
              return response
            }
          )
          .catch((error : Response) => {
            return  Observable.throw(new AppError(error));
          })
    }

    create(user : User) : Observable<User> {
    
      return this.http.put<User>(this.url,user)
          .map(
            response => {
              return response
            }
          )
          .catch((error : Response) => {
            return  Observable.throw(new AppError(error));
          })
    }
}
