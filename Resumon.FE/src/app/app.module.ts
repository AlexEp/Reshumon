import { MessagesService } from './services/messages.service';



import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {CalendarModule} from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import {GrowlModule} from 'primeng/growl';

/* Component */
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { ManagementComponent } from './management/management.component';
import { LoginComponent } from './login/login.component';
import { TimeRegistrationComponent } from './time-registration/time-registration.component';
import { MngProjectsComponent } from './management/panels/mng-projects/mng-projects.component';
import { MngUsersComponent } from './management/panels/mng-users/mng-users.component';
import { MngCategoriesComponent } from './management/panels/mng-categories/mng-categories.component';

/* Services */
import { AppConfigService } from './services/app-config.service';
import { ProjectsService } from './services/projects.service';
import { AppErrorHandleService, HTTPErrorHandleService } from './services/error-handle.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CategoryService } from './services/category.service';




const routesConfigs : Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: TimeRegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'reports', component: ReportComponent ,  canActivate:[AuthGuardService]},
  { path: 'reports/:reporttype', component: ReportComponent  },
  { path: 'mng', component: ManagementComponent, canActivate:[AuthGuardService]  },
  { path: 'mng/users', component: MngUsersComponent  },
  { path: 'mng/categories', component: MngCategoriesComponent  },
  { path: 'mng/projects', component: MngProjectsComponent  },
 
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    ReportComponent,
    ManagementComponent,
    LoginComponent,
    TimeRegistrationComponent,

    
    MngProjectsComponent,
    MngUsersComponent,
    MngCategoriesComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routesConfigs),

    //primeng
    CalendarModule,
    TableModule,
    ToolbarModule,
    DialogModule,
    GrowlModule,
    
    NgbModule.forRoot()
  ],
  providers: [

    //App Services
    AuthService,
    AppConfigService,
    ProjectsService,
    CategoryService,
    MessagesService,

    AuthGuardService,

    AppErrorHandleService,
    HTTPErrorHandleService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
