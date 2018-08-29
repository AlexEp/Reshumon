import { Category } from './../../category.model';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Project } from '../../project.model';
import { DialogResult } from '../../dialog.model';

@Component({
  selector: 'app-dialog-edit-project',
  templateUrl: './dialog-edit-project.component.html',
  styleUrls: ['./dialog-edit-project.component.css']
})
export class DialogEditProjectComponent implements OnInit {

  displayEditDialog : boolean = false;
  private _project : Project;
  selected: any = 4;

  @Output('display')
  displayEditDialogChange = new EventEmitter<DialogResult>();

  @Input('display')
  get displayDialog(){
    return this.displayEditDialog;
  }

  

  set displayDialog(val) {
    this.displayEditDialog = val;
  }
  
  @Input('project') set project(value: Project) {

    if (value) {
      this._project = value;
    }
  }

  @Input('categories') categories : Category[];

  constructor() { }

  ngOnInit() {
    this._project = new Project();

  }

  isNewCategory() {
    return this._project && this._project.CategoryID < 1;
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
