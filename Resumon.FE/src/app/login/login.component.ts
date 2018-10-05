import { Router, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  isInvalidLogIn = false;

  constructor(private  authService : AuthService,
    private router : Router, 
    private activatedRoute : ActivatedRoute,
    private messagesService: MessagesService) { }

  ngOnInit() {
    let islogin = this.authService.isAuthenticated();
  }


  onLogIn(form: NgForm) {

    this.authService.logIn(form.value.userName,form.value.password)
    .subscribe((replay) => {
      if (replay == true) {
        this.router.navigate(['/daily-activity']);
      }
      else{
        this.messagesService.error('Incorrect username or password',  'Action failed');
      }
    },
    e => {
      this.messagesService.error('Incorrect username or password',  'Action failed');
    });
  }


  logOut(){
    this.authService.logOut();
  }
  

}
