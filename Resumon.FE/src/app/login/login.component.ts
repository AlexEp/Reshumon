import { Router, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isInvalidLogIn = false;

  constructor(private  auth : AuthService,private router : Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    let islogin = this.auth.isLogedin();
  }

  submit(credentials : {username : string ,password: string}){
    this.auth.logIn(credentials.username,credentials.password).subscribe(
      result =>{
        if(result){
            let returnUrl = this.activatedRoute.snapshot.queryParamMap.get("returnUrl");

            this.router.navigate([returnUrl || "/"]); //redirect to the attempted url or the home page
        }
        else{
            this.isInvalidLogIn = true; //show isInvalidLogIn msg
        }
      } 
    )
  }

}
