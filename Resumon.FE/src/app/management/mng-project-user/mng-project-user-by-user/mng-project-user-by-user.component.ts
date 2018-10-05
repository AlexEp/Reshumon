import { User } from './../../../shared/user.model';
import { UserProject } from './../../../shared/user-project.model';
import { Project } from './../../../shared/project.model';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/category.model';

import { TranslateService } from 'ng2-translate';
import { MessagesService, MsgType } from '../../../services/messages.service';
import { CategoryService } from '../../../services/category.service';
import { UsersService } from '../../../services/users.service';
import { ProjectsService } from '../../../services/projects.service';
import _ = require('lodash');
import { UsersProjectService } from '../../../services/user-project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mng-project-user-by-user',
  templateUrl: './mng-project-user-by-user.component.html',
  styleUrls: ['./mng-project-user-by-user.component.css']
})
export class MngProjectUserByUserComponent implements OnInit {


  //global lists
  categories: Category[];
  projects: Project[];
  users: User[];
  isDataChanged: boolean = false;
  isDataReady: boolean = false;
  isDataLodingFailed: boolean = false;

  draggedProject: Project;
  availableProject: Project[] = [];
  selectedProject: Project[] = [];
  userProject: UserProject[] = [];
  selectedUser: User;


  constructor(
    private usersProjectService: UsersProjectService,
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private categoryService: CategoryService,
    private messagesService: MessagesService,
    private translate: TranslateService) { }


  ngOnInit() {
    //Load  data
     this.reloadData();
  }

  private reloadData() {

    this.isDataReady = false;
    this.isDataChanged= false;
    
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

        this.selectedUser = this.users[0];

        this.isDataReady = true;

        this.loadProjectUsers(this.selectedUser);

      },
      e => { this.isDataLodingFailed = true; },
      () => console.log('onCompleted')
    )
  }


  projectDragStart(event, project: Project) {
    this.draggedProject = project;
  }

  projectDrop(event) {

    if (this.draggedProject) {
      this.userSelected(this.draggedProject);
      this.draggedProject = null;
    }
  }

  projectDropBack(event) {
    if (this.draggedProject) {
      this.userRemoved(this.draggedProject);
      this.draggedProject = null;
    }
  }

  userDragEnd(event) {
    this.draggedProject = null;
  }

  userSelected(project: Project) {
    this.selectedProject.push(project);
    this.availableProject = this.availableProject.filter((val, i) => val.ProjectID != project.ProjectID);
    this.isDataChanged = true;
  }

  userRemoved(project: Project) {
    this.availableProject.push(project);
    this.selectedProject = this.selectedProject.filter((val, i) => val.ProjectID != project.ProjectID);
    this.isDataChanged = true;
  }

  onSelectionChanged(user: User) {

    this.selectedUser = user;
    this.loadProjectUsers(user);

  }

  onRevert() {
    this.loadProjectUsers(this.selectedUser);
    this.isDataChanged = false;
  }

  onSave() {
    this.usersProjectService.updateUser(this.selectedUser.UserID, this.selectedProject)
      .subscribe(r => {
        this.userProject = this.userProject.filter(up => up.UserID !== r.UserID);
        this.userProject.push(...r.UserProjectList);
        this.isDataChanged = false;
      });

  }

  private loadProjectUsers(user: User) {

    let group = _.groupBy(this.projects, (p) => {
      return _.findIndex(this.userProject, (up) => {
        return up.ProjectID === p.ProjectID &&
          up.UserID === user.UserID;
      }) >= 0;
    });
    this.availableProject = group['false'] || [];
    this.selectedProject = group['true'] || [];
  }

  canDeactivate() {
    let confirmmsg = this.translate.instant("dictionery.global." + "confirm data lost");

    if (this.isDataChanged) {
      return confirm(confirmmsg)
    }
    return true;
  };
}


