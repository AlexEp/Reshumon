import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MngProjectsComponent } from './mng-projects/mng-projects.component';
import { MngUsersComponent } from './mng-users/mng-users.component';
import { MngCategoriesComponent } from './mng-categories/mng-categories.component';
import { SharedModule } from '../shared/shared.module';
import { MngProjectUserByProjectComponent } from './mng-project-user/mng-project-user-by-project/mng-project-user-by-project.component';

import { MngProjectUserComponent } from './mng-project-user/mng-project-user.component';
import { MngProjectUserByUserComponent } from './mng-project-user/mng-project-user-by-user/mng-project-user-by-user.component';
import { DialogEditCategoryComponent } from './mng-categories/dialog-edit-category/dialog-edit-category.component';
import { DialogEditProjectComponent } from './mng-projects/dialog-edit-project/dialog-edit-project.component';
import { RouterModule } from '@angular/router';
import { ManagementRoutsModule } from './management-routs.module';
import { MngComponent } from './mng/mng.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ManagementRoutsModule,
 
  ],
  declarations: [
    MngComponent,
    MngProjectUserByProjectComponent,
    MngUsersComponent,
    MngProjectUserComponent,
    MngProjectsComponent,
    MngProjectUserByUserComponent,
    MngCategoriesComponent,

    //--------
    DialogEditCategoryComponent,
    DialogEditProjectComponent
  ],
  exports:[
    MngComponent
  ]

})
export class ManagementModule { }
