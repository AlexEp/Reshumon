
import { Component, OnInit } from '@angular/core';

import { TranslateService } from 'ng2-translate';
import { Category } from '../category.model';

import _ = require('lodash');
import { DialogResult } from '../dialog.model';
import { ProjectsService } from '../../services/projects.service';
import { CategoryService } from '../../services/category.service';
import { MessagesService } from '../../services/messages.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-mng-projects',
  templateUrl: './mng-projects.component.html',
  styleUrls: ['./mng-projects.component.css']
})
export class MngProjectsComponent implements OnInit {

  categories : Category[];
  projects : Project[];
  projectToEdit : Project;
  displayEditDialog : boolean = false;
  displayConfirmDeleteDialog  : boolean = false;

  constructor(
    private projectsService : ProjectsService,
    private categoryService : CategoryService,
    private messagesService : MessagesService,
    private translate: TranslateService) { }

  ngOnInit() {
        //Load  data
        this.projectsService.getAll().subscribe(
          response => this.projects = response
        );

        this.categoryService.getAll().subscribe(
          response => this.categories = response
        );
  }

  //Edit
  onEditClicked(project : Project){
    if(project == null)  {
      this.projectToEdit = new Project() ;
    }
    else{
      this.projectToEdit = _.cloneDeep(project);
    }
  
    this.displayEditDialog = true;
  }

  onDeleteClicked(project : Project){
    this.projectToEdit = _.cloneDeep(project);
    this.displayConfirmDeleteDialog = true;
  }



  create(){
    this.displayEditDialog = false;
    this.projectsService.create(this.projectToEdit).subscribe(
      replay => {
        this.projects.push(replay);
        this.showSuccess("");
      }
    );
  }

  delete(Project : Project){
    this.displayConfirmDeleteDialog = false;
    this.projectsService.delete(this.projectToEdit).subscribe(
      replay => {
        var index = this.projects.map(function(e) { return e.ProjectID; }).indexOf(this.projectToEdit.ProjectID);
        this.projects.splice(index, 1); 
        this.showSuccess("");
      }
    );
  }


  displayDialogResults(result : DialogResult ){
    this.displayEditDialog = false;

    if(this.projectToEdit.ProjectID > 0)  {
      if((<DialogResult>result) == DialogResult.Ok){
        this.save();
      }
      else if((<DialogResult>result) == DialogResult.Cancel){
       
      }
    }
    else{
        if((<DialogResult>result) == DialogResult.Ok){
            this.create();
        }
        else if((<DialogResult>result) == DialogResult.Cancel){
           this.showSuccess("");
        }
    }
  }

  save(){
    this.displayEditDialog = false;
    this.projectsService.update(this.projectToEdit).subscribe(
      replay => {
        var index = this.projects.map(function(e) { return e.ProjectID; }).indexOf(this.projectToEdit.ProjectID);

        this.projects[index] = replay;
        this.showSuccess("");
      }
    );
  }

  showSuccess(msg : string) {
    this.messagesService.setMsg(msg);
  }


  translateWorld(world,path){
    return path ? path + world : 'dictionery.pages.mng-projects.' + world
  }
}
