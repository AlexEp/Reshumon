
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



  displayDialogResults(result : DialogResult ){
    this.displayEditDialog = false;

    if(this.projectToEdit.CategoryID > 0)  {
      if((<DialogResult>result) == DialogResult.Ok){
        this.save();
      }
      else if((<DialogResult>result) == DialogResult.Cancel){
      
      }
    }
    else{
        if((<DialogResult>result) == DialogResult.Ok){

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
        var index = this.projects.map(function(e) { return e.CategoryID; }).indexOf(this.projectToEdit.CategoryID);

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