import { UserProject } from './../../../shared/user-project.model';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/category.model';
import { Project } from '../../../shared/project.model';
import { User } from '../../../shared/user.model';
import { TranslateService } from 'ng2-translate';
import { MessagesService, MsgType } from '../../../services/messages.service';
import { CategoryService } from '../../../services/category.service';
import { UsersService } from '../../../services/users.service';
import { ProjectsService } from '../../../services/projects.service';
import _ = require('lodash');
import { CanComponentDeactivate } from '../../../services/can-deactivate-guard.service';
import { Observable } from 'rxjs';
import { UsersProjectService } from '../../../services/user-project.service';

import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-mng-project-user-by-project',
  templateUrl: './mng-project-user-by-project.component.html',
  styleUrls: ['./mng-project-user-by-project.component.css']
})
export class MngProjectUserByProjectComponent implements OnInit,CanComponentDeactivate {

  //global lists
  categories: Category[];
  projects: Project[];
  users: User[];
  isDataChanged : boolean = false;
  isDataReady : boolean = false;


  draggedEUser: User;
  availableUsers: User[] = [];
  selectedUsers: User[] = [];
  userProject: UserProject[] = [];
  selectedProject : Project;

  constructor(
    private usersProjectService : UsersProjectService,
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private categoryService: CategoryService,
    private messagesService: MessagesService,
    private translate: TranslateService) { }


  ngOnInit() {
    //Load  data
    Observable.forkJoin(
      this.projectsService.getAll(),
      this.categoryService.getAll(),
      this.usersService.getAll(),
      this.usersProjectService.getAll()
    ).subscribe( 
        r => {

          //load from replay
          this.projects = r[0]; 
          this.categories = r[1]; 
          this.users = r[2]; 
          this.userProject = r[3]; 

          this.selectedProject = this.projects[0];

          this.isDataReady = true;

           this.loadProjectUsers(this.selectedProject );

        },
        e => {this.messagesService.setMsg(e,'Action failed',MsgType.error);  this.isDataReady = true;},
        () => console.log('onCompleted')
    )
    
  }

  private loadProjectUsers(project:Project) {
    let group = _.groupBy(this.users, (u) => {
      return _.findIndex(this.userProject, (up) => {
        return up.ProjectID === project.ProjectID &&
          up.UserID === u.UserID;
      }) >= 0;
    });
    this.availableUsers = group['false'] || [];
    this.selectedUsers = group['true'] || [];
  }

  userDragStart(event, user: User) {
    this.draggedEUser = user;
  }

  userDrop(event) {

    if (this.draggedEUser) {
      this.userSelected(this.draggedEUser);
      this.draggedEUser = null;
    }
  }

  userDropBack(event) {
    if (this.draggedEUser) {
      this.userRemoved(this.draggedEUser);
      this.draggedEUser = null;
    }
  }

  userDragEnd(event) {
    this.draggedEUser = null;
  }

  userSelected(user : User) {
    this.selectedUsers.push(user);
    this.availableUsers = this.availableUsers.filter((val, i) => val.UserID != user.UserID);
    this.isDataChanged = true;
  }

  userRemoved(user : User) {
    this.availableUsers.push(user);
    this.selectedUsers = this.selectedUsers.filter((val, i) => val.UserID != user.UserID);
    this.isDataChanged = true;
  }

  canDeactivate(){

    let confirmmsg = this.translate.instant("dictionery.global." + "confirm data lost");

    if(this.isDataChanged)    {
      return confirm(confirmmsg)
    }
    return true;
  };

  onRevert(){
    this.loadProjectUsers(this.selectedProject );
    this.isDataChanged = false;
  }

  onSave(){
    this.usersProjectService.updateProject(this.selectedProject.ProjectID,this.selectedUsers)
        .subscribe( r => {
          this.userProject = this.userProject.filter( up => up.ProjectID !== r.ProjectID);
          this.userProject.push(...r.UserProjectList);
          this.isDataChanged = false;
        });
  
  }

  onSelectionChanged(event){
    this.isDataChanged = true;
  }

  onProjectChanged(project:Project){

    this.selectedProject = project;
    this.loadProjectUsers(project) ;

  }
  
}
