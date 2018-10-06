
import { Project } from './../../shared/project.model';
import { User } from './../../shared/user.model';
import { Chart } from 'chart.js';
import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { MsgType, MessagesService } from '../../services/messages.service';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from 'ng2-translate';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { DailyActivityService } from '../../services/daily-activity.service';
import { CategoryService } from '../../services/category.service';
import * as Moment from 'moment';
import { Category } from '../../shared/category.model';
import { DailyActivity } from '../../shared/daily-activity.model';
import _ = require('lodash');
import { Colore } from '../../shared/colore.model';
import { UsersService } from '../../services/users.service';
import { FilterItem } from '../../pipes/filter-item.pipe';
import { Paginator } from 'primeng/paginator';


@Component({
  selector: 'app-report-summary',
  providers: [FilterItem],
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.css']
})
export class ReportSummaryComponent implements OnInit {

  @ViewChild(Paginator) paginator: Paginator;

  isDataReady = false;
  isDataLodingFailed = false;

  selectedFromDate: Date;
  selectedToDate: Date;
  minDateValue: Date;
  maxDateValue: Date;

  projects: Project[];
  categories: Category[];
  users: User[];
  searchSelected: string;
  coloredProjects: ColoredValue<Project>[];
  coloredUsers: ColoredValue<User>[];

  dailyActivity: DailyActivity[];


  chart: Chart; // This will hold our chart 
  chartOptions: any; // This will hold our chart info
  loadingDataSubscription: Subscription;


  reportByProject: ReportByProject = new ReportByProject();
  reportCols: any[];
  selectPeriod: number = 0;

  visibleSidebar1: boolean = false;
  visibleSidebarProject: boolean = false;
  visibleSidebarUser: boolean = false;
  visibleSidebarTime: boolean = false;

  colsUser: any[];
  colsProjects: any[];

  //side par paging
  pageSize = 7;
  searchUsersSelected: string = "";
  usersPageStart = 0;
  usersPageEnd = this.pageSize;

  searchProjectSelected: string = "";
  ProjectPageStart = 0;
  ProjectPageEnd = this.pageSize;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private categoryService: CategoryService,
    private usersService: UsersService,
    private dailyActivityService: DailyActivityService,
    private messagesService: MessagesService,
    private translate: TranslateService,
    private filterItem: FilterItem) { }


  ngOnInit() {

    this.minDateValue = Moment().add(-180, 'day').toDate();
    this.maxDateValue = Moment().add(1, 'day').toDate();

    this.onPeriodChange(Period.LastWeek);

    this.reportCols = [
      { field: 'date', header: 'Date', footer: '' },
      { field: 'category', header: 'Category', footer: '' },
      { field: 'user', header: 'User', footer: '' },
      { field: 'project', header: 'Project', footer: '' },
      { field: 'hours', header: 'Hours', footer: '0' },
    ];


    this.colsUser = [
      { field: 'Name', header: 'name' },
      { field: 'LastName', header: 'last name' },
      { field: 'isChecked', header: 'is checked' },
      
    ];

    this.colsProjects = [
      { field: 'Name', header: 'name' },
      { field: 'isChecked', header: 'is checked' },
    ];

    this.reloadData();

  }

  reloadData(){
    this.isDataReady = false;
    
    //load projects & categories
    Observable.forkJoin(
      this.projectsService.getAllActive(),
      this.categoryService.getAllActive(),
      this.usersService.getAllActive(),
    ).subscribe(
      r => {

        this.projects = r[0];
        this.categories = r[1];
        this.users = r[2];

        this.coloredProjects = this.projects.map(p => new ColoredValue(this.generateRandomColor(), p));
        this.coloredUsers = this.users.map(u => new ColoredValue(this.generateRandomColor(), u));
        this.isDataReady = true;

      },
      e => { this.isDataLodingFailed = true; },
      () => console.log('onCompleted')
    )
  }

  paginateUsers(event) {
    console.log(event);
    this.usersPageStart = event.first;
    this.usersPageEnd = event.first + event.rows;
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
  }


log(event){
  this.log(event);
}
  getFilteredUsers() {
    return this.filterItem.transform(this.coloredUsers, this.filtercoloredUsers, this.searchUsersSelected);
  }

  getFilteredProjects() {
    return this.filterItem.transform(this.coloredProjects, this.filtercoloredProjects, this.searchProjectSelected);
  }

  onDateSelect() {
    this.onPeriodChange(Period.Custom);
  }

  private reloadDailyActivityData() {


    this.loadingDataSubscription = Observable.forkJoin(
      this.dailyActivityService.getByDates(this.selectedFromDate, this.selectedToDate)

    ).subscribe(
      r => {

        this.dailyActivity = r[0];

        //calculate hours
        this.dailyActivity.forEach(da => {
          if (!da.StartDate || !da.EndDate) {
            da.Hours = 0;
          }
          else {
            let minutes = Moment(da.EndDate).diff(da.StartDate, 'minutes');
            da.Hours = +(minutes / 60).toFixed(2);
          }

        })

        this.reloadReport();

      },
      e => { this.messagesService.error(e,'Loading failed' ); this.isDataReady = true; },
      () => console.log('onCompleted')
    )

  }

  onPeriodChange(period: Period) {
    this.selectPeriod = period;

    let dateTo = Moment();
    let dateFrom = Moment();

    if (Period.Custom == +period)  //do nothing
      return;

    switch (+period) {
      case Period.LastWeek:
        dateFrom.add(-7, 'day');
        break;
      case Period.LastMonth:
        dateFrom.add(-1, 'month');
        break;
      case Period.Last3Month:
        dateFrom.add(-3, 'month');
        break;
      default:
        break;
    }

    this.selectedToDate = dateTo.toDate();
    this.selectedFromDate = dateFrom.toDate();

  }

  onReloadData() {
    this.reloadDailyActivityData();
  }

  filtercoloredProjects(coloredProject: ColoredValue<Project>, searchSelected: string) {
    return coloredProject.value.Name.toLowerCase().includes(searchSelected)
  }

  filtercoloredUsers(coloredProject: ColoredValue<User>, searchSelected: string) {
    return coloredProject.value.FirstName.toLowerCase().includes(searchSelected) ||
      coloredProject.value.LastName.toLowerCase().includes(searchSelected)
  }




  reloadReport() {

    let activityGroup = _.groupBy(this.dailyActivity, (da) => { return da.ProjectID });

    let selectedProjects = this.coloredProjects.filter(key => key.isChecked);
    let selectedUsers = this.coloredUsers.filter(key => key.isChecked);


    let selectedActivites = this.dailyActivity.filter(a => {
      let userExist = _.findIndex(selectedUsers, s => s.value.UserID == a.UserID) >= 0;
      let ProjectExist = _.findIndex(selectedProjects, s => s.value.ProjectID == a.ProjectID) >= 0;

      return userExist && ProjectExist;
    });


    this.reportByProject.values = selectedActivites.map(
      a => {
        let reportRecored: ReportRecord = new ReportRecord();

        let user = _.find(this.users, u => u.UserID == a.UserID);
        let project = _.find(this.projects, p => p.ProjectID == a.ProjectID);

        let category = project ? _.find(this.categories, c => c.CategoryID == project.CategoryID) : null;

        reportRecored.date = Moment(a.StartDate).format('DD-MM-YYYY');
        reportRecored.user = user ? user.FirstName : "";
        reportRecored.project = project ? project.Name : "";
        reportRecored.category = category ? category.Name : "";
        reportRecored.hours = a.Hours;

        return reportRecored;
      }
    );

    this.reportCols.find(r => r.field == 'hours').footer = _.sumBy(this.reportByProject.values, v => v.hours);

    // let keys = selectedProjects.map(key => key.value.Name);

    // //count group hours
    // let values = selectedProjects.map(key => {
    //   let groupedArray = activityGroup[key.value.ProjectID];

    //   if (!groupedArray) return 0;
    //   return _.sumBy(groupedArray, k => k.Hours);
    // })

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

  selectAllProject() {
    this.coloredProjects.forEach(p => p.isChecked = true);
  }

  selectNoneProject() {
    this.coloredProjects.forEach(p => p.isChecked = false);
  }

  selectAllUsers() {
    this.coloredUsers.forEach(p => p.isChecked = true);
  }

  selectNoneUsers() {
    this.coloredUsers.forEach(p => p.isChecked = false);
  }



  translateWorld(world, path) {
    let wordpath = path ? path + world : 'dictionery.pages.reports.' + world;
    return wordpath;
  }


}

class ColoredValue<T> {
  public isChecked: boolean = false;

  constructor(
    public colore: Colore,
    public value: T) { }
}



class ReportByProject {
  values: ReportRecord[]

  constructor() {
    this.values = []
  }
}

class ReportRecord {
  date: string;
  category: string;
  user: string;
  project: string;
  hours: number
}

enum Period {
  Custom = 0,
  LastWeek,
  LastMonth,
  Last3Month,
}

