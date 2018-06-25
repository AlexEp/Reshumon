import { Component, OnInit } from '@angular/core';

import * as moment from 'moment'; // add this 1 of 4

import {CalendarModule} from 'primeng/calendar';

@Component({
  selector: 'app-time-registration',
  templateUrl: './time-registration.component.html',
  styleUrls: ['./time-registration.component.css']
})
export class TimeRegistrationComponent implements OnInit {

  selectedDate : any;
  
  constructor() { }

  ngOnInit() {
    console.log("next date selected !");
    this.selectedDate = moment(new Date()).toDate();
  }

  nextDate(){
    this.selectedDate = moment(this.selectedDate).add(1,'day').toDate();
  }

  prevDate(){
    this.selectedDate = moment(this.selectedDate).add(-1,'day').toDate();
  }
  
}
