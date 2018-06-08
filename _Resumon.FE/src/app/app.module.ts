
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppConfigService } from './services/app-config.service';
import { ProjectsService } from './services/projects.service';
import { AppErrorHandleService, HTTPErrorHandleService } from './services/error-handle.service';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [

    //App Services
    AppConfigService,
    ProjectsService,

    AppErrorHandleService,
    HTTPErrorHandleService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
