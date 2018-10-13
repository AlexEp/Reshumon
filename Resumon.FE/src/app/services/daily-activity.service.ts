
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
import { DailyActivity } from '../shared/daily-activity.model';

import * as Moment from 'moment'; 
import _ = require('lodash');





@Injectable()
export class DailyActivityService  {

  protected url : string
  constructor( protected http : HttpClient ,private appConfig : AppConfigService, private errorHandle : AppErrorHandleService) {
    this.url = appConfig.getSiteURL() + "/api/v1/daily-activity";
  }

  // getAll() : Observable<DailyActivity[]> {
  //   return this.http.get(this.url).map(
  //       (response : Response)=> response
  //   )
  //   .catch((error : Response) => {
  //     return  Observable.throw(new AppError(error));
  //   })
  // };

  getByDates(from :Date, to : Date) : Observable<DailyActivity[]> {

    let fromFormatted = from ? Moment(from).format('YYYY-MM-DDTHH:mm:ss'): null;
    let toFormatted = to ? Moment(to).format('YYYY-MM-DDTHH:mm:ss'): null;
    
    return this.http.get(this.url + `?from=${fromFormatted}&to=${toFormatted}`).map(
        (response : Response)=> response
    )
    .catch((error : Response) => {
      return  Observable.throw(new AppError(error));
    })
  };

  update(dailyActivity : DailyActivity) : Observable<DailyActivity> {

    const newActivity = _.cloneDeep(dailyActivity);
    newActivity.StartDate = newActivity.StartDate? Moment(newActivity.StartDate).format('YYYY-MM-DDTHH:mm:ss') : null;
    newActivity.EndDate = newActivity.StartDate? Moment(newActivity.StartDate).add(dailyActivity.Hours,'hour').format('YYYY-MM-DDTHH:mm:ss'): null;


      return this.http.put<DailyActivity>(this.url,
      newActivity).map(
        article => {
          return article;
        },
        error => {
          console.log(error);
        });
    }

    delete(dailyActivity : DailyActivity) : Observable<DailyActivity> {
      return this.http.delete<DailyActivity>(this.url + "?id=" + dailyActivity.ActivityID)
          .map(
            response => {
              return response
            }
          )
          .catch((error : Response) => {
            return  Observable.throw(new AppError(error));
          })
    }

    create(dailyActivity : DailyActivity) : Observable<DailyActivity> {
    
     const newActivity = _.cloneDeep(dailyActivity);
     newActivity.StartDate = newActivity.StartDate? Moment(newActivity.StartDate).format('YYYY-MM-DDTHH:mm:ss') : null;
     newActivity.EndDate = newActivity.EndDate? Moment(newActivity.EndDate).format('YYYY-MM-DDTHH:mm:ss'): null;

      return this.http.post<DailyActivity>(this.url,newActivity)
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
