
import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';

/* Rxjs */
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';
import  'rxjs/add/observable/throw';

/* App Classes */
import { AppError } from './../errors/app-error';
import { AppConfigService } from './app-config.service';
import { ResourceService } from './resource.service';
import { AppErrorHandleService } from './error-handle.service';


@Injectable()
export class ProjectsService extends ResourceService<any> {

  constructor( http : HttpClient ,private appConfig : AppConfigService, private errorHandle : AppErrorHandleService) {
    super(http,appConfig.getSiteURL() + "/api/values");
  }

    getAll() {
      return this.http.get(this.url)
      .catch((error : Response) => {
        return  Observable.throw(new AppError(error));
      })
    };
    getById(projId: number) : Observable<any> {

      let params = new HttpParams();
      params.append("id",projId.toString());

      return this.http.get(this.url,{"params":params})
          .catch((error : Response) => {
            return  Observable.throw(new AppError(error));
          })
    }

    getPost() : Observable<any> {
      return this.http.get(this.url)
          .catch((error : Response) => {
            return  Observable.throw(new AppError(error));
          })
    }
}
