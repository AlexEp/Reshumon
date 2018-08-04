import { Category } from './../category.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit-category',
  templateUrl: './dialog-edit-category.component.html',
  styleUrls: ['./dialog-edit-category.component.css']
})
export class DialogEditCategoryComponent implements OnInit {

  displayEditDialog : boolean

  @Output('display')
  displayEditDialogChange = new EventEmitter<boolean>();

  @Input('display')
  get displayDialog(){
    return this.displayEditDialog;
  }

  set displayDialog(val) {
    this.displayEditDialog = val;
    this.displayEditDialogChange.emit(this.displayEditDialog);
  }

  // @Input() displayEditDialog : boolean;
  // @Output() displayEditDialog : boolean;
   @Input() category : Category



  categoryForm : FormGroup;
  
  constructor() { }


  
  ngOnInit() {

    this.category = new Category();

    this.categoryForm = new FormGroup({
      'name': new FormControl(this.category.Name,[Validators.required]),
      'isActive': new FormControl(this.category.IsActive),
    });
    this.categoryForm.reset();

    //this.categoryForm.valueChanges.subscribe(x => console.log(x));
  }

   isNewCategory(){
    return this.category && this.category.CategoryID < 1;
  }

  get getFormName(){
    return this.categoryForm.get('name');
  }

  get getForm(){
    return this.categoryForm;
  }


}
