
import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';

/* Rxjs */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


import { TableModule } from 'primeng/table';

/* App Classes & Services */
import { AppError } from '../errors/app-error';
import { AppConfigService } from './app-config.service';

import { AppErrorHandleService } from './error-handle.service';
import { Category } from '../shared/category.model';

@Injectable()
export class CategoryService {

  protected url: string

  constructor(protected http: HttpClient, private appConfig: AppConfigService, private errorHandle: AppErrorHandleService) {
    this.url = appConfig.getSiteURL() + "/api/v1/categories";
  }

  getAll(): Observable<Category[]> {
    return this.http.get(this.url).map(
      (response: Response) => response
    )
      .catch((error: Response) => {
        return Observable.throw(new AppError(error));
      })
  };

  getAllActive() : Observable<Category[]> {
    return this.http.get(this.url + '/active').map(
        (response : Response)=> response
    )
    .catch((error : Response) => {
      return  Observable.throw(new AppError(error));
    })
  };

  getAllRelevant() : Observable<Category[]> {
    return this.http.get(this.url + '/relevant').map(
        (response : Response)=> response
    )
    .catch((error : Response) => {
      return  Observable.throw(new AppError(error));
    })
  };


  update(category: Category): Observable<Category> {

    return this.http.put<Category>(this.url + "?id=" + category.CategoryID,
      category).map(
        article => {
          return article;
        })
      .catch((error: Response) => {
        return Observable.throw(new AppError(error));
      })
  }

  
  updateRange(projects : Category[]) : Observable<Category[]> {

    return this.http.put<Category[]>(this.url,
      projects).map(
        response => {
        return response;
      })
      .catch((error : Response) => {
        return  Observable.throw(new AppError(error));
      })
  }

  delete(category: Category): Observable<Category> {
    return this.http.delete<Category>(this.url + "?id=" + category.CategoryID)
      .map(
        response => {
          return response
        }
      )
      .catch((error: Response) => {
        return Observable.throw(new AppError(error));
      })
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url, category)
      .map(
        response => {
          return response
        }
      )
      .catch((error: Response) => {
        return Observable.throw(new AppError(error));
      })
  }
}
