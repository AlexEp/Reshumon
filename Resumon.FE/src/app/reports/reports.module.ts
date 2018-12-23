import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



import { ReportComponent } from './report/report.component';
import { ReportByProjectComponent } from './report-by-project/report-by-project.component';
import { ReportSummaryComponent } from './report-summary/report-summary.component';
import { SharedModule } from '../shared/shared.module';
import { ReportsRouts } from './reports-routs.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReportsRouts
  ],
  declarations: [
    ReportComponent,
    ReportByProjectComponent,
    ReportSummaryComponent
  ],
  exports:[
    ReportComponent
  ]
})
export class ReportsModule { }
