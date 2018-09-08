import { Project } from './../../../shared/project.model';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/category.model';
import { User } from '../../../shared/user.model';
import { TranslateService } from 'ng2-translate';
import { MessagesService } from '../../../services/messages.service';
import { CategoryService } from '../../../services/category.service';
import { UsersService } from '../../../services/users.service';
import { ProjectsService } from '../../../services/projects.service';
import _ = require('lodash');

@Component({
  selector: 'app-mng-project-user-by-user',
  templateUrl: './mng-project-user-by-user.component.html',
  styleUrls: ['./mng-project-user-by-user.component.css']
})
export class MngProjectUserByUserComponent implements OnInit {

  categories: Category[];
  projects: Project[];
  users: User[];


  usersIn: User[];
  draggedEProject : Project;
  availableProject: Project[] = [];
  selectedProject: Project[] = [];

  constructor(
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private categoryService: CategoryService,
    private messagesService: MessagesService,
    private translate: TranslateService) { }


  ngOnInit() {
    //Load  data
    this.projectsService.getAll().subscribe(
      response => {this.projects = response;
      this.availableProject = _.cloneDeep(this.projects);
    }
    );

    this.usersService.getAll().subscribe(
      response => this.users = response
    );

    this.categoryService .getAll().subscribe(
      response => {
        this.categories = response;
      }
    );
  }

  userDragStart(event, project: Project) {
    this.draggedEProject = project;
  }

  userDrop(event) {

    if (this.draggedEProject) {
      this.userSelected(this.draggedEProject);
      this.draggedEProject = null;
    }
  }

  userDropBack(event) {
    if (this.draggedEProject) {
      this.userRemoved(this.draggedEProject);
      this.draggedEProject = null;
    }
  }

  userDragEnd(event) {
    this.draggedEProject = null;
  }

  userSelected(project : Project) {
    this.selectedProject.push(project);
    this.availableProject = this.availableProject.filter((val, i) => val.ProjectID != project.ProjectID);
  }

  userRemoved(project : Project) {
    this.availableProject.push(project);
    this.selectedProject = this.selectedProject.filter((val, i) => val.ProjectID != project.ProjectID);
  }

}
