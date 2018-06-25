
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* Rxjs */
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';

/* App Classes */
import { AppError } from './../errors/app-error';
import { AppConfigService } from './app-config.service';
import { RequestOptions } from '@angular/http';


@Injectable()
export class ResourceService<T> {

  constructor(protected http : HttpClient ,protected url : string) { }

    getAll() {};
    get(resourceId: number) : Observable<T> {
      return this.http.get(this.url)
          .catch((error : Response) => {
            return  Observable.throw(new AppError(error));
          })
    }

    updae(resource : T) : Observable<T> {
      return this.http.put<T>(this.url,resource)
          .map(
            response => {
              return <T>response
            }
          )
          .catch((error : Response) => {
            return  Observable.throw(new AppError(error));
          })
    }

    delete(resource : T) : Observable<T> {
      return this.http.delete<T>(this.url,resource)
          .map(
            response => {
              return <T>response
            }
          )
          .catch((error : Response) => {
            return  Observable.throw(new AppError(error));
          })
    }
}

