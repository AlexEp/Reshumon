import { User } from './../user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-user-card',
  templateUrl: './select-user-card.component.html',
  styleUrls: ['./select-user-card.component.css']
})
export class SelectUserCardComponent implements OnInit {

  @Input("profile") user : User;
  @Input("selected") selected : boolean;

  constructor() { }

  ngOnInit() {
  }

}
