import { MessagesService } from './../services/messages.service';
import { UsersFavorite } from './../shared/users-favorite.model';
import { Category } from './../shared/category.model';
import { CategoryService } from './../services/category.service';
import { ProjectsService } from './../services/projects.service';
import { Project } from './../shared/project.model';
import { DailyActivity } from './../shared/daily-activity.model';
import { Component, OnInit, Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { DailyActivityService } from '../services/daily-activity.service';
import { Observable, Subscription } from 'rxjs';
import _ = require('lodash');
import { UsersFavoriteService } from '../services/users-favorite.service';
import { MsgType } from '../services/messages.service';

@Component({
  selector: 'app-daily-activity',
  templateUrl: './daily-activity.component.html',
  styleUrls: ['./daily-activity.component.css']
})
export class DailyActivityComponent implements OnInit, OnDestroy {

  isDataReady = false;
  isDataLodingFailed = false;
  loadingDataSubscription : Subscription ;
  
  dailyActivity: DailyActivity[];
  projects: Project[];
  categories: Category[];
  projectsAvailable: Project[];
  usersFavorite: UsersFavorite[];

  constructor(private dailyActivityService: DailyActivityService,
    private projectsService: ProjectsService,
    private categoryService: CategoryService,
    private usersFavoriteService: UsersFavoriteService,
    private messagesService  : MessagesService) { }

  ngOnInit() {
    this.ReloadData();
  }

  private ReloadData() {
    this.isDataReady = false;
    this.isDataLodingFailed = false;

    this.loadingDataSubscription =  Observable.forkJoin(
      this.dailyActivityService.getAll(),
      this.projectsService.getAll(),
      this.categoryService.getAll(),
      this.usersFavoriteService.getAll()
    ).subscribe((response) => {
      this.dailyActivity = response[0];
      this.projects = response[1];
      this.categories = response[2];
      this.usersFavorite = response[3];
      this.isDataReady = true;
      this.projectsAvailable = _.differenceWith(this.projects ,  this.dailyActivity, (p,a) => {return a.ProjectID == p.ProjectID });
    }, e => {
      this.messagesService.setMsg(e, MsgType.error);
      this.isDataLodingFailed = true;
    });
  }

  

  translateWorld(world, path) {
    return path ? path + world : 'dictionery.pages.daily-activity.' + world
  }

  onProjectSelected(project : Project){

    let newActivity = new DailyActivity();
    newActivity.ProjectID = project.ProjectID;

    this.projectsAvailable =  this.projectsAvailable.filter((p) => p.ProjectID != project.ProjectID);
    this.dailyActivity.push(newActivity);
  }

  ngOnDestroy(): void {
    this.loadingDataSubscription.unsubscribe();
  }


  onActivityDeleted(activity : DailyActivity){

    let project : Project = this.getProjectById(activity.ProjectID);
    this.projectsAvailable.push(project);

    this.dailyActivity =  this.dailyActivity.filter((a) => a.ProjectID != activity.ProjectID);
  }

  getProjectById(projectId : number){
    return _.find(this.projects,p => p.ProjectID == projectId);
  }

  addFavorite(project : Project){

    let usersFavorite = new UsersFavorite();
    usersFavorite.ProjectID = project.ProjectID;
    usersFavorite.UserID = 0;
 
    this.usersFavorite.push(usersFavorite);
    //this.usersFavoriteService.create(project)
  }

  removeFavorite(project : Project){
    this.usersFavorite = this.usersFavorite.filter(f => f.ProjectID != project.ProjectID );
  }

}




