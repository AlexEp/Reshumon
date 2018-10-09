import { Project } from './../../shared/project.model';
import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../shared/category.model';
import { ColoredValue } from './report-summary.component';


@Pipe({
  name: 'filterColoredProjectByCategories'
})
export class FilterColoredProjectByCategories implements PipeTransform {
  transform(projects: ColoredValue<Project>[], categories: Category[]): any[] {
    if (!projects)
      return [];
    if (!categories || categories.length < 1)
      return projects;
    let filtredProjects = projects.filter(p => {
      return categories.find(c => c.CategoryID == p.value.CategoryID) != null;
    });
    return filtredProjects;
  }
}