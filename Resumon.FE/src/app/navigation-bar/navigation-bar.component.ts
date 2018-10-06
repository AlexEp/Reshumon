import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private  auth : AuthService,private router : Router) { }

  ngOnInit() {
  }

  isLogedIn(){
    return this.auth.isAuthenticated();
  }

  isAdmin(){
    return this.auth.isAdmin();
  }

  logout() {
    this.auth.logOut();
  }

  translateWorld(world,path){
    return path ? path + world : 'dictionery.pages.navigation.' + world
  }

}
