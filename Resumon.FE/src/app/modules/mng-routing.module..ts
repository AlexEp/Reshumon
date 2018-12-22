import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';

import { MngProjectUserByUserComponent } from '../management/mng-project-user/mng-project-user-by-user/mng-project-user-by-user.component';
import { MngProjectUserByProjectComponent } from '../management/mng-project-user/mng-project-user-by-project/mng-project-user-by-project.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { MngProjectsComponent } from '../management/mng-projects/mng-projects.component';
import { MngUsersComponent } from '../management/mng-users/mng-users.component';
import { MngCategoriesComponent } from '../management/mng-categories/mng-categories.component';
import { AdminGuardService } from '../services/admin-guard.service';
import { MngComponent } from '../management/mng/mng.component';
import { MngProjectUserComponent } from '../management/mng-project-user/mng-project-user.component';
import { CanDeactivateGuard } from '../services/can-deactivate-guard.service';

const routs : Routes =  [{
  path: 'mng', component: MngComponent, canActivate: [AdminGuardService],
  children: [
    { path: 'users', component: MngUsersComponent },
    { path: 'categories', component: MngCategoriesComponent },
    { path: 'projects', component: MngProjectsComponent },
    {
      path: 'projectsUsers', 
      component: MngProjectUserComponent, 
      canActivate: [AdminGuardService],

      children: [
        { path: 'user', component: MngProjectUserByUserComponent, canActivate: [AuthGuardService] , canDeactivate: [CanDeactivateGuard]},
        { path: 'project', component: MngProjectUserByProjectComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard]}
      ]
    },
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routs)
  ],
  providers:[
 
  ]


})
export class MngRoutsModule { }
