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
import { UserProject } from '../shared/user-project.model';
import { User } from '../shared/user.model';




@Injectable()
export class UsersProjectService  {

  protected url : string
  constructor( protected http : HttpClient ,private appConfig : AppConfigService, private errorHandle : AppErrorHandleService) {
    this.url = appConfig.getSiteURL() + "/api/v1/user-project";
  }

  getAll() : Observable<UserProject[]> {
    return this.http.get(this.url).map(
        (response : Response)=> response
    )
    .catch((error : Response) => {
      return  Observable.throw(new AppError(error));
    })
  };

  update(userProject : UserProject) : Observable<UserProject> {

    return this.http.put<UserProject>(this.url + "?id=" + userProject.ID,
    userProject).map(
      article => {
        return article;
      },
      error => {
        console.log(error);
      });
  }

  updateProject(projectID,users : User[]) : Observable<{ProjectID : number, UserProjectList : UserProject[]}> {

      return this.http.post<any>(this.url + `/project/${projectID}/update`,users)
      .map(
        article => {
          return article;
        },
        error => {
          console.log(error);
        });
    }

    updateUser(userID,projects : Project[]) : Observable<{UserID : number, UserProjectList : UserProject[]}> {

      return this.http.post<any>(this.url + `/user/${userID}/update`,projects)
      .map(
        article => {
          return article;
        },
        error => {
          console.log(error);
        });
    }

    delete(userProject : UserProject) : Observable<UserProject> {
      return this.http.delete<UserProject>(this.url + "?id=" + userProject.ID)
          .map(
            response => {
              return response
            }
          )
          .catch((error : Response) => {
            return  Observable.throw(new AppError(error));
          })
    }

    create(userProject : UserProject) : Observable<UserProject> {
    
      return this.http.put<UserProject>(this.url,userProject)
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
