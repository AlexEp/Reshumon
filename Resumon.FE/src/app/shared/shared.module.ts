import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCategories } from '../management/mng-categories/mng-categories.component';
import { FilterProjectByName } from '../pipes/filter-project-by-name.pipe';
import { FilterColoredProjectByCategories } from '../reports/report-summary/FilterColoredProjectByCategories';
import { FilterItem } from '../pipes/filter-item.pipe';
import { FilterUsers } from '../pipes/filter-users.pipe';
import { FilterProjectFavorite } from '../pipes/filter-project-favorite.pipe';
import { FilterProjectByCategories } from '../pipes/filter-project-by-categories.pipe';
import { FilterProjectByCategory } from '../pipes/filter-project-by-category.pipe';
import { FilterProjectByActivity } from '../daily-activity/filterProjectByActivity.pipe';
import { SelectItemPipe } from '../pipes/select-Item.pipe';
import { EqualValidator } from './equal-validator.directive';
import { AnimatedLoadingComponent } from './animated-loading/animated-loading.component';
import { TranslateModule } from 'ng2-translate';
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
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, //Fix : Can't bind to 'ngModel'
    // HttpClientModule,
    // FormsModule,

    TranslateModule,

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

    AnimatedLoadingComponent,
    
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

    EqualValidator
  ],
  exports: [
    TranslateModule,

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
    MultiSelectModule,

    AnimatedLoadingComponent,

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

    EqualValidator
  ]
})
export class SharedModule {

} 
