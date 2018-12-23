import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { ReportByProjectComponent } from './report-by-project/report-by-project.component';
import { ReportSummaryComponent } from './report-summary/report-summary.component';

const routs : Routes =  [{
  path: 'reports', component: ReportComponent, canActivate: [AuthGuardService],
  children: [
    { path: 'byproject', component: ReportByProjectComponent },
    { path: 'summery', component: ReportSummaryComponent  },
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routs)
  ],
  providers:[
  ]
})
export class ReportsRouts{ }
