import { DialogResult } from '../dialog.model';
import { Component, OnInit, Pipe, PipeTransform, OnDestroy } from '@angular/core';

import { TranslateService } from 'ng2-translate';
import * as _ from "lodash";

import { Category } from '../../shared/category.model';
import { CategoryService } from '../../services/category.service';
import { MessagesService, MsgType } from '../../services/messages.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-mng-categories',
  templateUrl: './mng-categories.component.html',
  styleUrls: ['./mng-categories.component.css']
})
export class MngCategoriesComponent implements OnInit, OnDestroy {

  categoryToEdit: Category;
  categories: Category[];

  displayEditDialog = false;
  displayConfirmDeleteDialog = false;
  isDataReady = false;
  isDataLodingFailed = false;
  isDataChanged = false;
  changedCategories: any = {};
  isShowActiveOnly= true;
  
  loadingDataSubscription: Subscription;

  columns :any[]

  constructor(
    private categoryService: CategoryService,
    private messagesService: MessagesService,
    private translate: TranslateService) {

  }

  ngOnInit() {
    //Load  data
    this.reloadData();

    this.columns  = [
      { field: 'Name', header: 'Name' },
      { field: 'IsActive', header: 'Active' },
    ];
  }

  private reloadData() {
    this.isDataReady = false;
    this.changedCategories = {};
    this.isDataChanged = false;

    this.loadingDataSubscription = this.categoryService.getAll().subscribe(response => {
      this.categories = response;
      this.isDataReady = true;
    }, e => {
  
      this.isDataLodingFailed = true;
    });
  }

  onRevert() {
    this.reloadData();
  }

  onChange(category: Category) {
    this.changedCategories[category.CategoryID] = category;
    this.isDataChanged = true;
  }

  onDeleteClicked(category: Category) {
    this.categoryToEdit = _.cloneDeep(category);
    this.displayConfirmDeleteDialog = true;
  }

  onNewClicked() {
    this.categoryToEdit = new Category();
    this.displayEditDialog = true;
  }

  ngOnDestroy(): void {
    this.loadingDataSubscription.unsubscribe();
  }

  cancelDelete() {
    this.displayConfirmDeleteDialog = false;
  }

  onSave() {

    let changedProjects: Category[] = _.map(this.changedCategories, (value, key) => { return value });

    this.categoryService.updateRange(changedProjects).subscribe(
      r => {
        this.messagesService.success('The category was successfully saved','Action succeeded');
        this.reloadData();
      },
      e => { },
    )
  }


  delete(category: Category) {
    this.displayConfirmDeleteDialog = false;
    this.categoryService.delete(this.categoryToEdit).subscribe(
      replay => {
        var index = this.categories.map(function (e) { return e.CategoryID; }).indexOf(this.categoryToEdit.CategoryID);
        this.categories.splice(index, 1);
        this.messagesService.success('The category was successfully deleted','Action succeeded');
      }
    );
  }

  create(category: Category) {
    this.displayEditDialog = false;
    this.categoryService.create(this.categoryToEdit).subscribe(
      replay => {
        //var index = this.categories.map(function(e) { return e.CategoryID; }).indexOf(this.categoryToEdit.CategoryID);
        this.categories.push(replay);
        this.messagesService.success('The category was successfully created','Action succeeded');
      }
    );
  }

  isNewCategory() {
    return !this.categoryToEdit || this.categoryToEdit.CategoryID < 1
  }

  getFilterCategories(){
    return   this.isShowActiveOnly ? this.categories.filter(u => u.IsActive == true) : this.categories ;
  }
  

  displayDialogResults(result: DialogResult) {
    this.displayEditDialog = false;

    if (this.categoryToEdit.CategoryID > 0) {
      if ((<DialogResult>result) == DialogResult.Ok) {
        this.onSave();
      }
      else if ((<DialogResult>result) == DialogResult.Cancel) {

      }
    }
    else {
      if ((<DialogResult>result) == DialogResult.Ok) {
        this.create(this.categoryToEdit);
      }
      else if ((<DialogResult>result) == DialogResult.Cancel) {
        // this.showSuccess("");
      }
    }
  }

  translateWorld(world, path) {
    return path ? path + world : 'dictionery.pages.mng-categories.' + world
  }

}

@Pipe({
  name: 'filterCategories'
})
export class FilterCategories implements PipeTransform {
  transform(items: Category[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.Name.toLowerCase().includes(searchText);
    });
  }
}
