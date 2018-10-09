import { Category } from './../shared/category.model';
import { Pipe, PipeTransform } from "@angular/core";
import { Project } from "../shared/project.model";

@Pipe({
  name: 'filterProjectByCategories'
})
export class FilterProjectByCategories implements PipeTransform {
  transform(projects: Project[], categories: Category[]): any[] {
    if (!projects) return [];
    if (!categories || categories.length < 1) return projects;


    let filtredProjects =  projects.filter(p => {
      return categories.find(c => c.CategoryID == p.CategoryID) != null;
    });

    return filtredProjects;
  }
}
