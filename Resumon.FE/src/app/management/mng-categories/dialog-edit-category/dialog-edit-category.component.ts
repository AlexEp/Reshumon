
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogResult } from '../../dialog.model';
import { Category } from '../../../shared/category.model';

@Component({
  selector: 'app-dialog-edit-category',
  templateUrl: './dialog-edit-category.component.html',
  styleUrls: ['./dialog-edit-category.component.css']
})
export class DialogEditCategoryComponent implements OnInit {

  displayEditDialog: boolean;
  private _category: Category;

  @Output('display')
  displayEditDialogChange = new EventEmitter<DialogResult>();

  @Input('display')
  get displayDialog() {
    return this.displayEditDialog;
  }

  set displayDialog(val) {
    this.displayEditDialog = val;
    //this.displayEditDialogChange.emit(this.displayEditDialog);
  }


  @Input('category') set category(value: Category) {

    if (value) {
      this._category = value;
    }
  }


  constructor() { }


  ngOnInit() {

    this._category = new Category();

  }

  isNewCategory() {
    return this._category && this._category.CategoryID < 1;
  }

  get getCategory() {
    return this._category;
  }

  onHided() {
    this.displayEditDialogChange.emit(DialogResult.Cancel);
  }


  clickedOk() {
    this.displayEditDialogChange.emit(DialogResult.Ok);
  }


  clickedCancel() {
    this.displayEditDialogChange.emit(DialogResult.Cancel);
  }


}
