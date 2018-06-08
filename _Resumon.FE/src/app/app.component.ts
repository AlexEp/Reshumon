import { Component } from '@angular/core';
import { ProjectsService } from './services/projects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts = [];

  constructor(private projectsService : ProjectsService) { 
      this.projectsService.getPost().subscribe(
        rsponse => {
          console.log(rsponse.json);
            this.posts = rsponse; 
        },
        (error : Response) => {

        }
      );
  }
}
