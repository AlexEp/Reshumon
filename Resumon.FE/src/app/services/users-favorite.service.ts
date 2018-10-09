import { Project } from './../shared/project.model';

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
import { UsersFavorite } from '../shared/users-favorite.model';



@Injectable()
export class UsersFavoriteService {

  protected url : string
  constructor( protected http : HttpClient ,private appConfig : AppConfigService, private errorHandle : AppErrorHandleService) {
    this.url = appConfig.getSiteURL() + "/api/v1/user-favorite";
  }

  getAll() : Observable<UsersFavorite[]> {
    return this.http.get(this.url).map(
        (response : Response)=> response
    )
    .catch((error : Response) => {
      return  Observable.throw(new AppError(error));
    })
  };

  getAllRelevant() : Observable<UsersFavorite[]> {
    return this.http.get(this.url + '/relevant').map(
        (response : Response)=> response
    )
    .catch((error : Response) => {
      return  Observable.throw(new AppError(error));
    })
  };


    delete(project : Project) : Observable<UsersFavorite> {
      return this.http.delete<Project>(this.url + "?id=" + project.ProjectID)
          .map(
            response => {
              return response
            }
          )
          .catch((error : Response) => {
            return  Observable.throw(new AppError(error));
          })
    }

    create(project : Project) : Observable<UsersFavorite> {
    
      return this.http.post<UsersFavorite>(this.url,project)
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
