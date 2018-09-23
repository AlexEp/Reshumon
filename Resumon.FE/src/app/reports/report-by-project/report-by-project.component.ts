import { Chart } from 'chart.js';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MsgType, MessagesService } from '../../services/messages.service';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from 'ng2-translate';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { DailyActivityService } from '../../services/daily-activity.service';
import { CategoryService } from '../../services/category.service';
import * as Moment from 'moment';
import { Project } from '../../shared/project.model';
import { Category } from '../../shared/category.model';
import { DailyActivity } from '../../shared/daily-activity.model';
import _ = require('lodash');
import { Colore } from '../../shared/colore.model';

@Component({
  selector: 'app-report-by-project',
  templateUrl: './report-by-project.component.html',
  styleUrls: ['./report-by-project.component.css']
})
export class ReportByProjectComponent implements OnInit {

  @ViewChild('myCanvas') canvasRef: ElementRef;

  isDataReady = false;
  isDataLodingFailed = false;

  selectedFromDate: Date;
  selectedToDate: Date;
  minDateValue: Date;
  maxDateValue: Date;

  projects: Project[];
  categories: Category[];
  searchSelected: string;
  coloredProjects: ColoredValue[];

  dailyActivity: DailyActivity[];
  selectedProjects: ColoredValue[];

  chart: Chart; // This will hold our chart 
  chartOptions: any; // This will hold our chart info
  loadingDataSubscription: Subscription;

  chartData: ChartData;
  reportByProject : ReportByProject = new ReportByProject();
  reportCols : any[];

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private categoryService: CategoryService,
    private dailyActivityService: DailyActivityService,
    private messagesService: MessagesService,
    private translate: TranslateService) { }

  ngOnInit() {

    this.selectedFromDate = Moment().add(-7, 'day').toDate();
    this.selectedToDate = Moment().toDate();
    this.minDateValue = Moment().add(-60, 'day').toDate();
    this.maxDateValue = Moment().add(1, 'day').toDate();

    this.reportCols = [
      { field: 'category', header: 'Category' },
      { field: 'project', header: 'Project' },
      { field: 'hours', header: 'Hours' },
  ];

    this.isDataReady = false;

    //load projects & categories
    Observable.forkJoin(
      this.projectsService.getAllActive(),
      this.categoryService.getAllActive(),
    ).subscribe(
      r => {

        this.projects = r[0];
        this.categories = r[1];

        this.coloredProjects = this.projects.map(p => new ColoredValue(this.generateRandomColor(), p));
        this.isDataReady = true;

      },
      e => { this.messagesService.setMsg(e, MsgType.error); this.isDataReady = true; },
      () => console.log('onCompleted')
    )

  }


  private reloadData() {


    this.loadingDataSubscription = Observable.forkJoin(
      this.dailyActivityService.getByDates(this.selectedFromDate, this.selectedToDate)

    ).subscribe(
      r => {


        this.dailyActivity = r[0];

        this.dailyActivity.forEach(da => {
          if (!da.StartDate || !da.EndDate) {
            da.Hours = 0;
          }
          else {
            let minutes = Moment(da.EndDate).diff(da.StartDate, 'minutes');
            da.Hours = +(minutes / 60).toFixed(2);
          }

        })

        this.reloadChart();
        this.reloadReport();

      },
      e => { this.messagesService.setMsg(e, MsgType.error); this.isDataReady = true; },
      () => console.log('onCompleted')
    )


    this.loadingDataSubscription = this.projectsService.getAll().subscribe(response => {
      this.projects = response;
      this.isDataReady = true;

    }, e => {
      this.messagesService.setMsg(e, MsgType.error);
      this.isDataLodingFailed = true;
    });
  }
  
  reloadReport(): any {


  }

  onReloadData() {
    this.reloadData();

  }

  filtercoloredProjects(coloredProject: ColoredValue, searchSelected: string) {
    return coloredProject.project.Name.toLowerCase().includes(searchSelected)
  }



  reloadChart() {

    //create an empty chart
    if (!this.chart) {
      let context = this.canvasRef.nativeElement.getContext('2d');
      this.chartOptions = {
        type: 'bar',
        responsive: true,
        data: {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            legend: {
              display: false
            }
          }
        }
      }

      this.chart = new Chart(context, this.chartOptions);
    }

    let projectGroup = _.groupBy(this.dailyActivity, (da) => { return da.ProjectID });

    this.selectedProjects = this.coloredProjects.filter(key => key.isChecked);


  

   this.reportByProject.values = this.selectedProjects.map(key => {
    let reportByProjectValue = new ReportByProjectValue();
    reportByProjectValue.project = key.project.Name;
    reportByProjectValue.category = this.categories.find( c => c.CategoryID == key.project.CategoryID).Name;
    
    let groupedArray = projectGroup[key.project.ProjectID];
    reportByProjectValue.hours =(!groupedArray) ?0 : _.sumBy(groupedArray, k => k.Hours);

    return reportByProjectValue;
});
    
    let keys = this.selectedProjects.map(key => key.project.Name);

    //count group hours
    //let values = Object.values(projectGroup).map(key => _.sumBy(key,k => k.Hours));
    let values = this.selectedProjects.map(key => {
      let groupedArray = projectGroup[key.project.ProjectID];

      if (!groupedArray) return 0;
      return _.sumBy(groupedArray, k => k.Hours);
    })

    let backgroundColor = this.selectedProjects.map(key => key.colore);

    this.chartData = new ChartData();
    this.chartData.xValues = keys;
    this.chartData.yValues = values;
    this.chartData.colors = backgroundColor;

    this.updateData(this.chart, this.chartData)
  }

  updateData(chart, ChartData: ChartData) {


    this.chartOptions.data.labels = ChartData.xValues;
    this.chartOptions.data.datasets[0].data = ChartData.yValues;
    this.chartOptions.data.datasets[0].backgroundColor = ChartData.colors.map(key => this.getRGBValue(key));;


    chart.update();
  }

  generateRandomColor(): Colore {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return new Colore(r, g, b);
  }

  getRGBValue(color: Colore) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, 0.7)`;
  }

  translateWorld(world, path) {
    let wordpath = path ? path + world : 'dictionery.pages.reports.' + world;
    return wordpath;
  }


}

class ColoredValue {
  public isChecked: boolean = false;

  constructor(
    public colore: Colore,
    public project: Project) { }
}

class ReportData {
  xValues: string[]
  yValues: number[]
}

class ChartData extends ReportData {
  colors: Colore[]
}

class ReportByProject {
  values: ReportByProjectValue[]

  constructor() {
    this.values = []
  }
}

class ReportByProjectValue {
  category: string;
  project: string;
  hours: number
}

