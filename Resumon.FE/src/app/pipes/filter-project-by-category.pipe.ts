import { Category } from './../shared/category.model';

import { Pipe, PipeTransform } from "@angular/core";
import { Project } from "../shared/project.model";

@Pipe({
  name: 'filterProjectByCategory'
})
export class FilterProjectByCategory implements PipeTransform {
  transform(projects: Project[], category: Category): any[] {
    if (!projects) return [];
    if (!category) return projects;


    return projects.filter(p => {
      return category.CategoryID == p.ProjectID
    });
  }
}
