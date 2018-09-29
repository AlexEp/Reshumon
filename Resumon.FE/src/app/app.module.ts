import { CanDeactivateGuard } from './services/can-deactivate-guard.service';




import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MessagesService } from './services/messages.service';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

/* primeng */
import { MessageService as ToasMessageService  } from 'primeng/components/common/messageservice';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { TabViewModule } from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {AccordionModule} from 'primeng/accordion';
import {SpinnerModule} from 'primeng/spinner';
import {DropdownModule} from 'primeng/dropdown';
import {ListboxModule} from 'primeng/listbox';
import {ColorPickerModule} from 'primeng/colorpicker';
import {SidebarModule} from 'primeng/sidebar';
import {PaginatorModule} from 'primeng/paginator';

/* Component */
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';


import { LoginComponent } from './login/login.component';
import { TimeRegistrationComponent } from './time-registration/time-registration.component';

import { AppServicesModule } from './modules/app-services.module';
import { AuthGuardService } from './services/auth-guard.service';
import { Http } from '@angular/http';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminGuardService } from './services/admin-guard.service';
import { AuthModule, AUTH_PROVIDERS } from 'angular2-jwt';

import { DialogEditCategoryComponent } from './management/mng-categories/dialog-edit-category/dialog-edit-category.component';
import { MngProjectsComponent } from './management/mng-projects/mng-projects.component';
import { MngUsersComponent } from './management/mng-users/mng-users.component';
import { MngCategoriesComponent, FilterCategories } from './management/mng-categories/mng-categories.component';
import { DialogEditProjectComponent } from './management/mng-projects/dialog-edit-project/dialog-edit-project.component';
import { MngProjectUserComponent } from './management/mng-project-user/mng-project-user.component';

import { MngProjectUserByProjectComponent } from './management/mng-project-user/mng-project-user-by-project/mng-project-user-by-project.component';
import { MngProjectUserByUserComponent } from './management/mng-project-user/mng-project-user-by-user/mng-project-user-by-user.component';
import { SelectUserCardComponent } from './shared/select-user-card/select-user-card.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MngComponent } from './management/mng/mng.component';
import { DailyActivityComponent } from './daily-activity/daily-activity.component';
import { AnimatedLoadingComponent } from './shared/animated-loading/animated-loading.component';
import { FilterProjectByName } from './pipes/filter-project-by-name.pipe';
import { FilterProjectFavorite } from './pipes/filter-project-favorite.pipe';
import { FilterUsers } from './pipes/filter-users.pipe';
import { SelectItemPipe } from './pipes/select-Item.pipe';
import { FilterProject } from './pipes/filter-project.pipe';
import { FilterItem } from './pipes/filter-item.pipe';

import { ReportByProjectComponent } from './reports/report-by-project/report-by-project.component';
import { ReportByUserComponent } from './reports/report-by-user/report-by-user.component';
import { ReportComponent } from './reports/report/report.component';
import { ReportByCategoryComponent } from './reports/report-by-category/report-by-category.component';
import { ReportSummaryComponent } from './reports/report-summary/report-summary.component';




const routesConfigs: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: TimeRegistrationComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'daily-activity', component: DailyActivityComponent, canActivate: [AuthGuardService] },
  
  {
    path: 'reports', component: ReportComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'bycategory', component: ReportByCategoryComponent  },
      { path: 'byproject', component: ReportByProjectComponent },
      { path: 'byuser', component: ReportByUserComponent  },
      { path: 'summery', component: ReportSummaryComponent  },
    ]
  },
  {
    path: 'mng', component: MngComponent, canActivate: [AuthGuardService, AdminGuardService],
    children: [
      { path: 'users', component: MngUsersComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: 'categories', component: MngCategoriesComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: 'projects', component: MngProjectsComponent, canActivate: [AuthGuardService, AdminGuardService] },
      {
        path: 'projectsUsers', 
        component: MngProjectUserComponent, 
        canActivate: [AuthGuardService, AdminGuardService],

        children: [
          { path: 'user', component: MngProjectUserByUserComponent, canActivate: [AuthGuardService, AdminGuardService] , canDeactivate: [CanDeactivateGuard]},
          { path: 'project', component: MngProjectUserByProjectComponent, canActivate: [AuthGuardService, AdminGuardService], canDeactivate: [CanDeactivateGuard]}
        ]
      },
    ]
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    ReportComponent,
    LoginComponent,
    TimeRegistrationComponent,


    MngProjectsComponent,
    MngUsersComponent,
    MngCategoriesComponent,
    DialogEditCategoryComponent,
    UserProfileComponent,
    DialogEditProjectComponent,
    MngProjectUserComponent,
    MngProjectUserByProjectComponent,
    MngProjectUserByUserComponent,
    SelectUserCardComponent,
    PageNotFoundComponent,
    MngComponent,
    DailyActivityComponent,
    AnimatedLoadingComponent,
    ReportByProjectComponent,
    ReportByUserComponent,


    //pipes
    FilterCategories,
    FilterProjectByName,
    FilterProjectFavorite,
    FilterUsers,
    FilterItem,
    SelectItemPipe,
    ReportByCategoryComponent,
    ReportSummaryComponent,

    
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
    ToastModule,
    DragDropModule,
    TabViewModule,
    AccordionModule,
    SpinnerModule,
    DropdownModule,
    ListboxModule,
    ColorPickerModule,
    SidebarModule,
    PaginatorModule
    
  ],
  providers: [


    ToasMessageService,
    //App Services
    MessagesService,
    AUTH_PROVIDERS



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
