import { DailyActivity } from './../shared/daily-activity.model';
import { Component, OnInit } from '@angular/core';
import { DailyActivityService } from '../services/daily-activity.service';

@Component({
  selector: 'app-daily-activity',
  templateUrl: './daily-activity.component.html',
  styleUrls: ['./daily-activity.component.css']
})
export class DailyActivityComponent implements OnInit {
  dailyActivity : DailyActivity[];

  constructor(private dailyActivityService : DailyActivityService) { }

  ngOnInit() {
    this.dailyActivityService.getAll().subscribe(
      r => this.dailyActivity = r
    );

  }

  translateWorld(world,path){
    return path ? path + world : 'dictionery.pages.daily-activity.' + world
  }

}
