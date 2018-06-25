import { Component } from '@angular/core';
import { ProjectsService } from './services/projects.service';
import { MessagesService } from './services/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts = [];

  constructor(private messagesService : MessagesService) { 
     
  }

  getMsg(){
    return this.messagesService.getMsg();
  }
}
