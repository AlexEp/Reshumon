import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private route : ActivatedRoute,private projectsService : ProjectsService ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        let someparam = param.get("paramname");
      }
    )
    this.projectsService.getAll().subscribe(
      param => {
        let someparam = param;
        debugger;
      }
    )
  }
}
