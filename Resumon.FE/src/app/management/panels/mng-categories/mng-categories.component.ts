
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import * as _ from "lodash";

//import {Message} from 'primeng/components/common/api';
//import {MessageService} from 'primeng/components/common/messageservice';

import { Category } from './category.model';
import { CategoryService } from '../../../services/category.service';
import { MessagesService } from '../../../services/messages.service';

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


  constructor(private categoryService : CategoryService,private messagesService : MessagesService) {

   }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      response => this.categories = response
    )
  }

  elementChanged(category : Category){
    //this.categoryService.updae(category);
  }

  edit(category : Category){
    if(category == null)  {
      this.categoryToEdit = new Category();
    }
    else{
      this.categoryToEdit = _.cloneDeep(category);
    }
  
    this.displayEditDialog = true;
  }

  
  cancelEdit(){
    this.showSuccess();
    this.displayEditDialog = false;
  }

  confirmDelete(category : Category){
    this.categoryToEdit = _.cloneDeep(category);
    this.displayConfirmDeleteDialog = true;
  }

  cancelDelete(){
    this.displayConfirmDeleteDialog = false;
  }

  save(){
    this.displayEditDialog = false;
    this.categoryService.updae(this.categoryToEdit).subscribe(
      replay => {
        var index = this.categories.map(function(e) { return e.CategoryID; }).indexOf(this.categoryToEdit.CategoryID);

        this.categories[index] = replay;
      }
    );
  }
 

  delete(category : Category){
    this.displayConfirmDeleteDialog = false;
    this.categoryService.delete(this.categoryToEdit).subscribe(
      replay => {
        var index = this.categories.map(function(e) { return e.CategoryID; }).indexOf(this.categoryToEdit.CategoryID);
        this.categories.splice(index, 1); 
      }
    );
  }

  create(category : Category){
    this.displayEditDialog = false;
    this.categoryService.create(this.categoryToEdit).subscribe(
      replay => {
        //var index = this.categories.map(function(e) { return e.CategoryID; }).indexOf(this.categoryToEdit.CategoryID);
        this.categories.push(replay);
      }
    );
  }

  isNewCategory(){
    return !this.categoryToEdit|| this.categoryToEdit.CategoryID < 1
  }

  showSuccess() {
    this.messagesService.setMsg("");
  }
}
