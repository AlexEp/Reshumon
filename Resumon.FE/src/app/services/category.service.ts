import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';

/* Rxjs */
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';
import  'rxjs/add/observable/throw';


import {TableModule} from 'primeng/table';

/* App Classes & Services */
import { AppError } from './../errors/app-error';
import { AppConfigService } from './app-config.service';
import { ResourceService } from './resource.service';
import { AppErrorHandleService } from './error-handle.service';
import { Category } from '../management/panels/mng-categories/category.model';

@Injectable()
export class CategoryService extends ResourceService<Category>  {

  constructor( http : HttpClient ,private appConfig : AppConfigService, private errorHandle : AppErrorHandleService) {
    super(http,appConfig.getSiteURL() + "/api/categories");
  }

  getAll() : Observable<Category[]> {
    return this.http.get(this.url).map(
        (response : Response)=> response
    )
    .catch((error : Response) => {
      return  Observable.throw(new AppError(error));
    })
  };


  updae(category : Category) : Observable<Category> {

      return this.http.put<Category>(this.url + "?id=" + category.CategoryID,
      category).map(
        article => {
          return article;
        },
        error => {
          console.log(error);
        });
    }

    delete(category : Category) : Observable<Category> {
      return this.http.delete<Category>(this.url + "?id=" + category.CategoryID)
          .map(
            response => {
              return response
            }
          )
          .catch((error : Response) => {
            return  Observable.throw(new AppError(error));
          })
    }

    create(category : Category) : Observable<Category> {
      return this.http.post<Category>(this.url,category)
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
