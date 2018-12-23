import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MngProjectsComponent } from './mng-projects/mng-projects.component';
import { MngUsersComponent } from './mng-users/mng-users.component';
import { MngCategoriesComponent } from './mng-categories/mng-categories.component';
import { SharedModule } from '../shared/shared.module';
import { MngProjectUserByProjectComponent } from './mng-project-user/mng-project-user-by-project/mng-project-user-by-project.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { DragDropModule } from 'primeng/dragdrop';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { SpinnerModule } from 'primeng/spinner';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { SidebarModule } from 'primeng/sidebar';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MultiSelectModule } from 'primeng/multiselect';
import { MngProjectUserComponent } from './mng-project-user/mng-project-user.component';
import { MngProjectUserByUserComponent } from './mng-project-user/mng-project-user-by-user/mng-project-user-by-user.component';
import { DialogEditCategoryComponent } from './mng-categories/dialog-edit-category/dialog-edit-category.component';
import { DialogEditProjectComponent } from './mng-projects/dialog-edit-project/dialog-edit-project.component';
import { RouterModule } from '@angular/router';
import { ManagementRoutsModule } from './management-routs.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ManagementRoutsModule,
    
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
  declarations: [
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
    MngProjectUserByProjectComponent,
    MngUsersComponent,
    MngProjectUserComponent,
    MngProjectsComponent,
    MngProjectUserByUserComponent,
    MngCategoriesComponent,
  ]

})
export class ManagementModule { }
