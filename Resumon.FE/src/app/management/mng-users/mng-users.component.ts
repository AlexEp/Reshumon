import { User, RegistrationModel } from './../../shared/user.model';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { MessagesService } from '../../services/messages.service';
import { Observable } from 'rxjs';
import _ = require('lodash');


@Component({
  selector: 'app-mng-users',
  templateUrl: './mng-users.component.html',
  styleUrls: ['./mng-users.component.css']
})
export class MngUsersComponent implements OnInit {

  users : User[];
  userToCreate : RegistrationModel;

  columns: any[];
  changedUsers: any = {};
  isDataChanged = false;
  isDataReady = false;
  isDataLodingFailed = false;
  displayEditDialog= false;
  
  constructor(
    private usersService: UsersService,
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
      { field: 'JoinDate', header: 'Join Date' },
      { field: 'IsUseDiningRoom', header: 'Dining Room' },
      { field: 'IsActive', header: 'Active' }
    ];
  }



  private reloadData() { 

    this.isDataReady = false;
    this.changedUsers  = {};
    this.isDataChanged= false;

    Observable.forkJoin(this.usersService.getAll())
    .subscribe(r => {
      //load from replay
      this.users = r[0];
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
        this.messagesService.error('The user was successfully created','Action succeeded');
      }
    );
  }

  onChange(user : User){
    this.changedUsers[user.UserID] = user;
    this.isDataChanged = true;
  }

  dialogCancel(){

  }

  
  dialogOk(){
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

  translateWorld(world,path){
    let wordpath = path ? path + world : 'dictionery.pages.mng-users.' + world;
    return wordpath;
  }

}
