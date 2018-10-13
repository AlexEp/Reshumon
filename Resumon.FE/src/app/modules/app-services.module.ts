import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Services */
import { AppConfigService } from '../services/app-config.service';
import { ProjectsService } from '../services/projects.service';
import { AppErrorHandleService, HTTPErrorHandleService } from '../services/error-handle.service';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';
import { UsersService } from '../services/users.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { AdminGuardService } from '../services/admin-guard.service';
import { CanDeactivateGuard } from '../services/can-deactivate-guard.service';
import { UsersProjectService } from '../services/user-project.service';
import { DailyActivityService } from '../services/daily-activity.service';
import { UsersFavoriteService } from '../services/users-favorite.service';
import { DiningRoomService } from '../services/dining-room.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[
    AppConfigService,
    ProjectsService,
    CategoryService,
    UsersService,
    UsersProjectService,
    DailyActivityService,
    UsersFavoriteService,
    DiningRoomService,
    
    AuthService,

    AuthGuardService,
    AdminGuardService,
    CanDeactivateGuard,
    
    HTTPErrorHandleService,
    AppErrorHandleService,
  ]


})
export class AppServicesModule { }
