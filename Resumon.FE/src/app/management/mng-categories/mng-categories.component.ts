
import { DialogResult } from '../dialog.model';

import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';


import { TranslateService } from 'ng2-translate';
import * as _ from "lodash";



import { Category } from '../../shared/category.model';
import { CategoryService } from '../../services/category.service';
import { MessagesService, MsgType } from '../../services/messages.service';



@Component({
  selector: 'app-mng-categories',
  templateUrl: './mng-categories.component.html',
  styleUrls: ['./mng-categories.component.css']
})
export class MngCategoriesComponent implements OnInit {
  categoryToEdit : Category;
  categories : Category[];

  displayEditDialog = false;
  displayConfirmDeleteDialog= false;
  isDataReady = false;
  isDataLodingFailed = false;
  failedLoadingMsg = "";

  constructor(
    private categoryService : CategoryService,
    private messagesService : MessagesService,
    private translate: TranslateService) {

   }

  ngOnInit() {
    //Load  data
    this.categoryService.getAll().subscribe(
      response => {this.categories = response;
        this.isDataReady = true;},
      e => {
        this.messagesService.setMsg(e,MsgType.error); 
         this.isDataLodingFailed = true;},
    );
  }



  onDeleteClicked(category : Category){
    this.categoryToEdit = _.cloneDeep(category);
    this.displayConfirmDeleteDialog = true;
  }

  onEditClicked(category : Category){
    if(category == null)  {
      this.categoryToEdit = new Category() ;
    }
    else{
      this.categoryToEdit = _.cloneDeep(category);
    }
  
    this.displayEditDialog = true;
  }


  cancelDelete(){
    this.displayConfirmDeleteDialog = false;
  }

  save(){
    this.displayEditDialog = false;
    this.categoryService.update(this.categoryToEdit).subscribe(
      replay => {
        var index = this.categories.map(function(e) { return e.CategoryID; }).indexOf(this.categoryToEdit.CategoryID);

        this.categories[index] = replay;
        this.showSuccess("");
      }
    );
  }
 

  delete(category : Category){
    this.displayConfirmDeleteDialog = false;
    this.categoryService.delete(this.categoryToEdit).subscribe(
      replay => {
        var index = this.categories.map(function(e) { return e.CategoryID; }).indexOf(this.categoryToEdit.CategoryID);
        this.categories.splice(index, 1); 
        this.showSuccess("");
      }
    );
  }

  create(category : Category){
    this.displayEditDialog = false;
    this.categoryService.create(this.categoryToEdit).subscribe(
      replay => {
        //var index = this.categories.map(function(e) { return e.CategoryID; }).indexOf(this.categoryToEdit.CategoryID);
        this.categories.push(replay);
        this.showSuccess("");
      }
    );
  }

  isNewCategory(){
    return !this.categoryToEdit|| this.categoryToEdit.CategoryID < 1
  }

  showSuccess(msg : string) {
    this.messagesService.setMsg(msg);
  }

  displayDialogResults(result : DialogResult ){
    this.displayEditDialog = false;

    if(this.categoryToEdit.CategoryID > 0)  {
      if((<DialogResult>result) == DialogResult.Ok){
        this.save();
      }
      else if((<DialogResult>result) == DialogResult.Cancel){
       
      }
    }
    else{
        if((<DialogResult>result) == DialogResult.Ok){
            this.create(this.categoryToEdit);
        }
        else if((<DialogResult>result) == DialogResult.Cancel){
           this.showSuccess("");
        }
    }
  }
  
  translateWorld(world,path){
    return path ? path + world : 'dictionery.pages.mng-categories.' + world
  }
  
}

@Pipe({
  name: 'filterCategories'
})
export class FilterCategories implements PipeTransform {
  transform(items: Category[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.Name.toLowerCase().includes(searchText);
    });
   }
}
