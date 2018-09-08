import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/category.model';
import { Project } from '../../../shared/project.model';
import { User } from '../../../shared/user.model';
import { TranslateService } from 'ng2-translate';
import { MessagesService } from '../../../services/messages.service';
import { CategoryService } from '../../../services/category.service';
import { UsersService } from '../../../services/users.service';
import { ProjectsService } from '../../../services/projects.service';
import _ = require('lodash');
import { CanComponentDeactivate } from '../../../services/can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mng-project-user-by-project',
  templateUrl: './mng-project-user-by-project.component.html',
  styleUrls: ['./mng-project-user-by-project.component.css']
})
export class MngProjectUserByProjectComponent implements OnInit,CanComponentDeactivate {
  


  categories: Category[];
  projects: Project[];
  users: User[];


  usersIn: User[];
  draggedEUser: User;
  availableUsers: User[] = [];
  selectedUsers: User[] = [];

  constructor(
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private categoryService: CategoryService,
    private messagesService: MessagesService,
    private translate: TranslateService) { }


  ngOnInit() {
    //Load  data
    this.projectsService.getAll().subscribe(
      response => this.projects = response
    );

    this.categoryService.getAll().subscribe(
      response => this.categories = response
    );

    this.usersService.getAll().subscribe(
      response => {
      this.users = response;
        this.availableUsers = _.cloneDeep(this.users);
      }
    );
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
  }

  userRemoved(user : User) {
    this.availableUsers.push(user);
    this.selectedUsers = this.selectedUsers.filter((val, i) => val.UserID != user.UserID);
  }

  canDeactivate(){
    return confirm("do you wont to exit ?")
  };
}
