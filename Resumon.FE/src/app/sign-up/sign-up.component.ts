import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../shared/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @ViewChild('userRegistrationForm') public userRegistrationForm: NgForm;

  user: User;
  confirmPassword : string;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
  constructor(private  authService : AuthService,
    private router : Router, 
    private activatedRoute : ActivatedRoute,
    private messagesService: MessagesService,) { }

  ngOnInit() {
    this.clearUser();
  }
  clearUser(){
    this.user = new User();
    this.user.UserName= '';
    this.user.Password= '';
    this.user.Email= '';
    this.user.FirstName= '';
    this.user.LastName= '';
  }

  
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();

      this.clearUser();
  }

  OnSubmit(form: NgForm) {
    this.authService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(form);
          this.messagesService.success('User registration successful','Action succeeded');
        }
        else
        this.messagesService.error('User registration failed',  'Action failed');
        
      });
   
    
  }


  OnSigIn(form: NgForm) {

    this.authService.logIn(form.value.userName,form.value.password)
    .subscribe((replay) => {
      if (replay == true) {
        this.router.navigate(['/daily-activity']);
      }
      else{
        this.messagesService.error('User singin failed',  'Action failed');
      }
    },
    e => {
      this.messagesService.error('User singin failed',  'Action failed');
    });
 

  }

}
