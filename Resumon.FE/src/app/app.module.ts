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


import { AuthModule, AUTH_PROVIDERS } from 'angular2-jwt';

import { SelectUserCardComponent } from './shared/select-user-card/select-user-card.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MngComponent } from './management/mng/mng.component';
import { DailyActivityComponent } from './daily-activity/daily-activity.component';


import { ReportByProjectComponent } from './reports/report-by-project/report-by-project.component';
import { ReportComponent } from './reports/report/report.component';
import { ReportSummaryComponent } from './reports/report-summary/report-summary.component';
import { AuthInterceptor } from './services/auth.Interceptor';


import { ManagementModule } from './management/management.module';
import { SharedModule } from './shared/shared.module';






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
 
    LoginComponent,

    SelectUserCardComponent,
    PageNotFoundComponent,
    MngComponent,
    DailyActivityComponent,

    ReportComponent,
    ReportByProjectComponent,
    ReportSummaryComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    
    SharedModule,

    ManagementModule,
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
