import { UsersFavorite } from './../shared/users-favorite.model';
import { Pipe, PipeTransform } from "@angular/core";
import { Project } from "../shared/project.model";
import _ = require('lodash');

@Pipe({
  name: 'filterProjectFavorite'
})
export class FilterProjectFavorite  {
  transform(projects: Project[],favoriteArray : UsersFavorite[]): any[] {
    if (!projects) return [];
 
    return  _.intersectionWith(projects,favoriteArray, (p,f) => (p.ProjectID == f.ProjectID));
   
  }
}
