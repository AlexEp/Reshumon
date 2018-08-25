import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private  auth : AuthService) { }

  ngOnInit() {
  }

  isLogedIn(){
    return this.auth.isAuthenticated();
  }

  translateWorld(world,path){
    return path ? path + world : 'dictionery.pages.navigation.' + world
  }

}
