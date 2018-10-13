import { AuthService } from './../../services/auth.service';
import { User, RegistrationModel } from './../../shared/user.model';
import { UsersService } from './../../services/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { MessagesService } from '../../services/messages.service';
import { Observable } from 'rxjs';
import _ = require('lodash');
import { NgForm } from '@angular/forms';
import { Role } from '../../shared/role.model';



@Component({
  selector: 'app-mng-users',
  templateUrl: './mng-users.component.html',
  styleUrls: ['./mng-users.component.css']
})
export class MngUsersComponent implements OnInit {

  @ViewChild('userForm') public userForm: NgForm;

  users : User[];
  roles : Role[];
  
  userToCreate : RegistrationModel;

  columns: any[];
  changedUsers: any = {};
  isDataChanged = false;
  isDataReady = false;
  isDataLodingFailed = false;
  displayEditDialog= false;
  isShowActiveOnly = true;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private messagesService: MessagesService,
    private translate: TranslateService) { }

  ngOnInit() {
    //Load  data
    this.reloadData();

    this.columns = [
      { field: 'UserName', header: 'UserName' },
      { field: 'FirstName', header: 'FirstName' },
      { field: 'LastName', header: 'LastName' },
      { field: 'Email', header: 'Email' },
      { field: 'Role', header: 'Role' },
      { field: 'JoinDate', header: 'Join Date' },
      { field: 'IsUseDiningRoom', header: 'Dining Room' },
      { field: 'IsActive', header: 'Active' }
    ];
  }



  private reloadData() { 

    this.isDataReady = false;
    this.changedUsers  = {};
    this.isDataChanged= false;

    Observable.forkJoin(
      this.usersService.getAll(),
      this.usersService.getAllRoles())
    .subscribe(r => {
      //load from replay
      this.users = r[0];
      this.roles = r[1];
      this.isDataReady = true;
    }, e => {
      this.isDataLodingFailed = true;
    }, () => console.log('onCompleted'));
  }

    //Edit
    onCreateClicked(user : User){
        this.userToCreate = new RegistrationModel() ;
        this.displayEditDialog = true;
    }
  

  create(){
    this.displayEditDialog = false;
    this.usersService.create(this.userToCreate).subscribe(
      replay => {
        this.users.push(replay);
        this.messagesService.success('The user was successfully created','Action succeeded');
      }
    );
  }

  onChange(user : User){
    this.changedUsers[user.UserID] = user;
    this.isDataChanged = true;
  }

  dialogCancel(){
    this.displayEditDialog = false;
  }

  onSave(){
    let changedUsers : User[] =  _.map(this.changedUsers, (value, key) => { return value } );

    this.usersService.updateRange(changedUsers).subscribe(
      r => {
        this.reloadData();
      },
      e => {},
    )
  }

  dialogOk(){

    //this.userForm.valid
    if(this.isNewUser())
    {
      this.create()
    }
  }

  isNewUser(){
    return this.userToCreate && this.userToCreate.UserID < 1;
  }

  onRevert(){
    var confirmmsg = this.translate.instant("dictionery.global." + "confirm data lost");

    if(this.isDataChanged && confirm(confirmmsg)){
      this.reloadData();
    }
  }

  isCurrentUserRow(user: User){
    return this.authService.userProfile.userName == user.UserName;
  }

  FirstNameErrorMsg(){

    let controler  = this.userForm.controls.FirstName;
    let errorMsg = "";

    if(controler.invalid)  
    {
      if(controler.errors.required) 
      {
        errorMsg = "First name is required";
      }
      else if(controler.errors.minlength) 
      {
        errorMsg = "First name must be at least 2 characters";
      }
      else if(controler.errors.minlength) 
      {
        errorMsg = "First name must be not more then 50 characters";
      }
  }

    return errorMsg;
  }

  LastNameErrorMsg(){

    let controler  = this.userForm.controls.LastName;
    let errorMsg = "";

    if(controler.invalid)  
    {
      if(controler.errors.required) 
      {
        errorMsg = "Last name is required";
      }
      else if(controler.errors.minlength) 
      {
        errorMsg = "Last name must be at least 2 characters";
      }
      else if(controler.errors.minlength) 
      {
        errorMsg = "Last name must be not more then 50 characters";
      }
  }

    return errorMsg;
  }

  EmailErrorMsg(){

    let controler  = this.userForm.controls.Email;
    let errorMsg = "";

    if(controler.invalid)  
    {
      if(controler.errors.required) 
      {
        errorMsg = "Email is required";
      }
      else if(controler.errors.email) 
      {
        errorMsg = "Email must be a valid email address";
      }
  }

    return errorMsg;
  }


  PasswordErrorMsg(){

    let controler  = this.userForm.controls.Password;
    let errorMsg = "";

    if(controler.invalid)  
    {
      if(controler.errors.required) 
      {
        errorMsg = "Password is required";
      }
      else if(controler.errors.minlength) 
      {
        errorMsg = "Password must be at least 6 characters";
      }
  }

    return errorMsg;
  }

  getFilterUsers(){
    return   this.isShowActiveOnly ? this.users.filter(u => u.IsActive == true) : this.users ;
  }

  ConfirmPasswordErrorMsg(){

    let controler  = this.userForm.controls.passwordConfirm;
    let errorMsg = "";

    if(controler.invalid)  
    {
      if(controler.errors.required) 
      {
        errorMsg = "Confirm Password is required";
      }
      else if(controler.errors.minlength) 
      {
        errorMsg = "Confirm Password must be at least 6 characters";
      }
  }

    return errorMsg;
  }

  translateWorld(world,path){
    let wordpath = path ? path + world : 'dictionery.pages.mng-users.' + world;
    return wordpath;
  }

}
