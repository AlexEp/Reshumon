import { AuthService } from './../services/auth.service';
import { AuthGuardService } from './../services/auth-guard.service';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from './../services/messages.service';
import { UsersFavorite } from './../shared/users-favorite.model';
import { Category } from './../shared/category.model';
import { CategoryService } from './../services/category.service';
import { ProjectsService } from './../services/projects.service';
import { Project } from './../shared/project.model';
import { DailyActivity } from './../shared/daily-activity.model';
import { Component, OnInit, PipeTransform, OnDestroy } from '@angular/core';
import { DailyActivityService } from '../services/daily-activity.service';
import { Observable, Subscription } from 'rxjs';
import _ = require('lodash');
import { UsersFavoriteService } from '../services/users-favorite.service';
import { MsgType } from '../services/messages.service';
import * as Moment from 'moment';
import { FilterProjectByActivity } from './filterProjectByActivity.pipe';
import { DiningRoomService } from '../services/dining-room.service';
import { DiningRoomUse } from '../shared/dining-room.model';

@Component({
  selector: 'app-daily-activity',
  templateUrl: './daily-activity.component.html',
  styleUrls: ['./daily-activity.component.css'],
  providers: [FilterProjectByActivity]
})
export class DailyActivityComponent implements OnInit, OnDestroy {

  isDataReady = false;
  isDataLodingFailed = false;
  loadingDataSubscription: Subscription;

  dailyActivity: DailyActivity[];
  projects: Project[];
  categories: Category[];
  selectedCategories: Category[];
  //projectsAvailable: Project[];
  usersFavorite: UsersFavorite[];
  diningRoomUse?: DiningRoomUse = null;

  selectedDate: Date;
  maxDateValue: Date;
  constructor(private dailyActivityService: DailyActivityService,
    private projectsService: ProjectsService,
    private categoryService: CategoryService,
    private usersFavoriteService: UsersFavoriteService,
    private messagesService: MessagesService,
    private filterProjectByActivity: FilterProjectByActivity,
    private diningRoomService: DiningRoomService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.selectedDate = Moment().startOf('day').toDate();
    this.maxDateValue = Moment().startOf('day').toDate();

    this.isDataReady = false;
    this.isDataLodingFailed = false;
    this.reloadData();
  }

  private reloadData() {

    this.loadingDataSubscription = Observable.forkJoin(
      this.dailyActivityService.getByDates(this.selectedDate, this.selectedDate),
      this.projectsService.getAllRelevant(),
      this.categoryService.getAllRelevant(),
      this.usersFavoriteService.getAllRelevant(),
      this.diningRoomService.getByDates(this.selectedDate, this.selectedDate)
    ).subscribe((response) => {

      this.dailyActivity = response[0];

      //calculate hours
      this.dailyActivity.forEach(da => {
        calculateAndSetHours(da);
      })

      this.projects = response[1];
      this.categories = response[2];
      this.usersFavorite = response[3];
      this.diningRoomUse = response[4] !=null && response[4].length > 0  ? response[4][0] : null;
      this.isDataReady = true;
      // this.projectsAvailable = _.differenceWith(this.projects ,  this.dailyActivity, (p,a) => {return a.ProjectID == p.ProjectID });
    }, e => {

      this.isDataLodingFailed = true;
    });
  }

  ngOnDestroy(): void {
    this.loadingDataSubscription.unsubscribe();
  }


  //  ================== table function  ==================

  getAvailableProjects() {
    return this.filterProjectByActivity.transform(this.projects, this.dailyActivity);
  }



  getProjectById(projectId: number) {
    return _.find(this.projects, p => p.ProjectID == projectId);
  }

  getCategoryById(categoryId: number) {
    return _.find(this.categories, c => c.CategoryID == categoryId);
  }


  addDailyActivity(activity: DailyActivity) {
    this.dailyActivityService.create(activity).subscribe(
      response => {
        calculateAndSetHours(response);
        this.dailyActivity.push(response);

        //Adding dining room usage
        if(this.authService.userProfile.isUseDiningRoom){
          this.addDiningRoomUsed();
        }
        else  {
          this.addDiningRoomNotUsed();
        }

        

      },
      e => { this.messagesService.error('Failed to create activity recored', 'Action failed') })
  }

  removeDailyActivity(activity: DailyActivity) {

    this.dailyActivityService.delete(activity).subscribe(
      response => this.dailyActivity = this.dailyActivity.filter((a) => a.ProjectID != response.ProjectID),
      e => { this.messagesService.error('Failed to remove activity recored', 'Action failed') })
  }


  updateDailyActivity(activity: DailyActivity) {


    this.dailyActivityService.update(activity).subscribe(
      response => { /*do nothing*/ },
      e => { this.messagesService.error('Failed to update activity recored', 'Action failed') })
  }



  //  ================== projects / favoriets  ==================
  addFavorite(project: Project) {

    this.usersFavoriteService.create(project).subscribe(
      response => this.usersFavorite.push(response)
    );
    // this.usersFavorite.push(usersFavorite);
  }

  removeFavorite(project: Project) {
    this.usersFavorite = this.usersFavorite.filter(f => f.ProjectID != project.ProjectID);
  }


  onProjectSelected(project: Project) {

    let newActivity = new DailyActivity();
    newActivity.ProjectID = project.ProjectID;
    newActivity.StartDate = this.selectedDate;
    newActivity.EndDate = this.selectedDate;
    this.addDailyActivity(newActivity);
    //this.projectsAvailable =  this.projectsAvailable.filter((p) => p.ProjectID != project.ProjectID);

  }

  //  ================== calendar settings/fuctions ==================
  isPrevDateAllowed() {
    return true
  }

  isNextDateAllowed() {
    return !Moment(this.selectedDate).isSameOrAfter(Moment().startOf('day'))
  }

  nextDate() {
    this.selectedDate = Moment(this.selectedDate).add(1, 'day').toDate();
    this.reloadData();
  }

  praveDate() {
    this.selectedDate = Moment(this.selectedDate).add(-1, 'day').toDate();
    this.reloadData();
  }

  oncalendarSelect() {
    this.reloadData();
  }



  //  ================== else  ==================

  addDiningRoomUsed() {

    let diningRoomUse = new DiningRoomUse();
    diningRoomUse.IsDiningRoomUse = true;
    diningRoomUse.Date = this.selectedDate;
    this.diningRoomService.create(diningRoomUse).subscribe(
      response => this.diningRoomUse = response
    );

  }


  addDiningRoomNotUsed() {

    let diningRoomUse = new DiningRoomUse();
    diningRoomUse.IsDiningRoomUse = false;
    diningRoomUse.Date = this.selectedDate;
    this.diningRoomService.create(diningRoomUse).subscribe(
      response => this.diningRoomUse = response
    );

  }

  removeDiningRoom() {
    this.diningRoomService.delete(this.diningRoomUse).subscribe(
      Response => this.diningRoomUse = null
    );

  }


  translateWorld(world, path) {
    return path ? path + world : 'dictionery.pages.daily-activity.' + world
  }



}



function calculateAndSetHours(da: DailyActivity) {
  if (!da.StartDate || !da.EndDate) {
    da.Hours = 0;
  }
  else {
    let minutes = Moment(da.EndDate).diff(da.StartDate, 'minutes');
    da.Hours = +(minutes / 60).toFixed(2);
  }
}

