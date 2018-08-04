import { MessagesService } from './services/messages.service';



import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate';

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
import { AppServicesModule } from './modules/app-services.module';
import { AuthGuardService } from './services/auth-guard.service';
import { Http } from '@angular/http';
import { DialogEditCategoryComponent } from './management/panels/mng-categories/dialog-edit-category/dialog-edit-category.component';



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
    DialogEditCategoryComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routesConfigs),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
  }),

    AppServicesModule,
    
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
    MessagesService,



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
