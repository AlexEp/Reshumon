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

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
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
