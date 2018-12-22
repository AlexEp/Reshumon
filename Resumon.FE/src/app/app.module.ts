import { HTTPErrorHandleService } from './services/error-handle.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';



import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import {TooltipModule} from 'primeng/tooltip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MultiSelectModule} from 'primeng/multiselect';

/* Component */
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

import { LoginComponent } from './login/login.component';


import { AppServicesModule } from './modules/app-services.module';
import { AuthGuardService } from './services/auth-guard.service';
import { Http } from '@angular/http';


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
import { FilterProjectByActivity } from "./daily-activity/filterProjectByActivity.pipe";
import { AnimatedLoadingComponent } from './shared/animated-loading/animated-loading.component';
import { FilterProjectByName } from './pipes/filter-project-by-name.pipe';
import { FilterProjectFavorite } from './pipes/filter-project-favorite.pipe';
import { FilterUsers } from './pipes/filter-users.pipe';
import { SelectItemPipe } from './pipes/select-Item.pipe';
import { FilterProject } from './pipes/filter-project.pipe';
import { FilterItem } from './pipes/filter-item.pipe';

import { ReportByProjectComponent } from './reports/report-by-project/report-by-project.component';
import { ReportComponent } from './reports/report/report.component';
import { ReportSummaryComponent } from './reports/report-summary/report-summary.component';
import { AuthInterceptor } from './services/auth.Interceptor';
import { FilterProjectByCategories } from './pipes/filter-project-by-categories.pipe';
import { FilterProjectByCategory } from './pipes/filter-project-by-category.pipe';
import { FilterColoredProjectByCategories } from './reports/report-summary/FilterColoredProjectByCategories';
import { EqualValidator } from './shared/equal-validator.directive';
import { MngRoutsModule } from './modules/mng-routing.module.';





const routesConfigs: Routes = [
  { path: '', redirectTo: '/login',pathMatch : "full"},
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'daily-activity', component: DailyActivityComponent, canActivate: [AuthGuardService] },
  
  {
    path: 'reports', component: ReportComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'byproject', component: ReportByProjectComponent },
      { path: 'summery', component: ReportSummaryComponent  },
    ]
  },
 
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ReportComponent,
    LoginComponent,


    MngProjectsComponent,
    MngUsersComponent,
    MngCategoriesComponent,
    DialogEditCategoryComponent,
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


    //pipes
    FilterCategories,
    FilterProjectByName,
    FilterProjectFavorite,
    FilterUsers,
    FilterItem,
    FilterProjectByCategories,
    FilterProjectByCategory,
    FilterColoredProjectByCategories,
    FilterProjectByActivity,
    SelectItemPipe,
    ReportSummaryComponent,
    
    EqualValidator ,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,

    MngRoutsModule,
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
    PaginatorModule,
    TooltipModule,
    OverlayPanelModule,
    MultiSelectModule
    
  ],
  providers: [


    ToasMessageService,
    //App Services
    MessagesService,
    AUTH_PROVIDERS,

    {
      provide : HTTP_INTERCEPTORS ,
      useClass :AuthInterceptor,
      multi:true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
