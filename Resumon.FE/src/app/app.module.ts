
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

import { DailyActivityComponent } from './daily-activity/daily-activity.component';



import { AuthInterceptor } from './services/auth.Interceptor';


import { ManagementModule } from './management/management.module';
import { SharedModule } from './shared/shared.module';
import { ReportsModule } from './reports/reports.module';




const routesConfigs: Routes = [
  { path: '', redirectTo: '/login',pathMatch : "full"},
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'daily-activity', component: DailyActivityComponent, canActivate: [AuthGuardService] },
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

    DailyActivityComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    SharedModule,
    ReportsModule,
    ManagementModule,

    RouterModule.forRoot(routesConfigs),

    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    }),

    AppServicesModule,
    
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
