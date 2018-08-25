
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
import { ResourceService } from './resource.service';
import { AppErrorHandleService } from './error-handle.service';
import { Project } from '../management/project.model';



@Injectable()
export class ProjectsService extends ResourceService<any> {

  constructor( http : HttpClient ,private appConfig : AppConfigService, private errorHandle : AppErrorHandleService) {
    super(http,appConfig.getSiteURL() + "/api/projects");
  }

  getAll() : Observable<Project[]> {
    return this.http.get(this.url).map(
        (response : Response)=> response
    )
    .catch((error : Response) => {
      return  Observable.throw(new AppError(error));
    })
  };


  update(project : Project) : Observable<Project> {

      return this.http.put<Project>(this.url + "?id=" + project.CategoryID,
      project).map(
        article => {
          return article;
        },
        error => {
          console.log(error);
        });
    }

    delete(project : Project) : Observable<Project> {
      return this.http.delete<Project>(this.url + "?id=" + project.CategoryID)
          .map(
            response => {
              return response
            }
          )
          .catch((error : Response) => {
            return  Observable.throw(new AppError(error));
          })
    }

    create(project : Project) : Observable<Project> {
      return this.http.post<Project>(this.url,project)
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
