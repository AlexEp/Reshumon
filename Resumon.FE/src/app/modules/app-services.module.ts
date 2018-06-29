import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Services */
import { AppConfigService } from '../services/app-config.service';
import { ProjectsService } from '../services/projects.service';
import { AppErrorHandleService, HTTPErrorHandleService } from '../services/error-handle.service';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[
    AppConfigService,
    ProjectsService,
    CategoryService,

    AuthService,

    HTTPErrorHandleService,
    AppErrorHandleService,
  ]


})
export class AppServicesModule { }
