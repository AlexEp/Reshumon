
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* Rxjs */
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';

/* App Classes */
import { AppError } from './../errors/app-error';
import { AppConfigService } from './app-config.service';


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

    updae(resource : T) : Observable<any> {
      return this.http.get(this.url)
          .catch((error : Response) => {
            return  Observable.throw(new AppError(error));
          })
    }
}

