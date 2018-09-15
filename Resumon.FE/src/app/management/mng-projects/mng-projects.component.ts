import { Project } from './../../shared/project.model';

import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

import { TranslateService } from 'ng2-translate';
import { Category } from '../../shared/category.model';

import _ = require('lodash');
import { DialogResult } from '../dialog.model';
import { ProjectsService } from '../../services/projects.service';
import { CategoryService } from '../../services/category.service';
import { MessagesService, MsgType } from '../../services/messages.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mng-projects',
  templateUrl: './mng-projects.component.html',
  styleUrls: ['./mng-projects.component.css'],

})
export class MngProjectsComponent implements OnInit {

  categories : Category[];
  projects : Project[];
  projectToEdit : Project;
  displayEditDialog : boolean = false;
  displayConfirmDeleteDialog  : boolean = false;

  isDataReady = false;
  isDataLodingFailed = false;
  failedLoadingMsg = "";
  changedProjects : any = {};
  isDataChanged = false;

  constructor(
    private projectsService : ProjectsService,
    private categoryService : CategoryService,
    private messagesService : MessagesService,
    private translate: TranslateService) { }

  ngOnInit() {
        //Load  data
        this.ReloadData();
  }

  private ReloadData() {

    this.isDataReady = false;
    this.changedProjects  = {};
    this.isDataChanged= false;

    Observable.forkJoin(this.projectsService.getAll(), this.categoryService.getAll()).subscribe(r => {
      //load from replay
      this.projects = r[0];
      this.categories = r[1];
      this.isDataReady = true;
    }, e => {
      this.messagesService.setMsg(e, MsgType.error);
      this.isDataLodingFailed = true;
    }, () => console.log('onCompleted'));
  }

  onRevert(){
    if(this.isDataChanged && confirm(this.translateWorld("confirm data lost","dictionery.global"))){
      this.ReloadData();
    }

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

  
  onChange(project : Project){
    this.changedProjects[project.ProjectID] = project;
    this.isDataChanged = true;
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

  
  cancelDelete(){
    this.displayConfirmDeleteDialog = false;
  }


  displayDialogResults(result : DialogResult ){
    this.displayEditDialog = false;

    if(this.projectToEdit.ProjectID > 0)  {
      if((<DialogResult>result) == DialogResult.Ok){
        this.onSave();
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

  onSave(){
    //this.displayEditDialog = false;
    let changedProjects : Project[] =  _.map(this.changedProjects, (value, key) => { return value } );

    this.projectsService.updateRange(changedProjects).subscribe(
      r => {
        this.ReloadData();
      },
      e => {},
    )

  }

  showSuccess(msg : string) {
    this.messagesService.setMsg(msg);
  }


  translateWorld(world,path){
    let wordpath = path ? path + world : 'dictionery.pages.mng-projects.' + world;
    return wordpath;
  }
}


@Pipe({
  name: 'filterProjects'
})
export class FilterProjects implements PipeTransform {
  transform(items: Project[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.Name.toLowerCase().includes(searchText);
    });
   }
}
