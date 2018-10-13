
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


import * as Moment from 'moment'; 
import _ = require('lodash');
import { DiningRoomUse } from '../shared/dining-room.model';





@Injectable()
export class DiningRoomService  {

  protected url : string
  constructor( protected http : HttpClient ,private appConfig : AppConfigService, private errorHandle : AppErrorHandleService) {
    this.url = appConfig.getSiteURL() + "/api/v1/dining-room";
  }

  getByDates(from :Date, to : Date) : Observable<DiningRoomUse[]> {

    let fromFormatted = from ? Moment(from).format('YYYY-MM-DDTHH:mm:ss'): null;
    let toFormatted = to ? Moment(to).format('YYYY-MM-DDTHH:mm:ss'): null;
    
    return this.http.get(this.url + `?from=${fromFormatted}&to=${toFormatted}`).map(
        (response : Response)=> response
    )
    .catch((error : Response) => {
      return  Observable.throw(new AppError(error));
    })
  };

  
    delete(DiningRoomUse : DiningRoomUse) : Observable<DiningRoomUse> {
      return this.http.delete<DiningRoomUse>(this.url + "?id=" + DiningRoomUse.DiningRoomUseID)
          .map(
            response => {
              return response
            }
          )
          .catch((error : Response) => {
            return  Observable.throw(new AppError(error));
          })
    }

    create(diningRoomUse : DiningRoomUse) : Observable<DiningRoomUse> {
    
     const newDiningRoomUse= _.cloneDeep(diningRoomUse);
     newDiningRoomUse.Date= newDiningRoomUse.Date? Moment(newDiningRoomUse.Date).format('YYYY-MM-DDTHH:mm:ss') : null;
  

      return this.http.put<DiningRoomUse>(this.url,newDiningRoomUse)
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
