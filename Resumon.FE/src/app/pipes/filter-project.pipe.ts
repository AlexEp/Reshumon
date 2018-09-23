import { Pipe, PipeTransform } from "@angular/core";
import { Project } from "../shared/project.model";

@Pipe({
  name: 'filterProject'
})
export class FilterProject implements PipeTransform {
  transform(items: Project[], searchFunc: (p:Project)=> boolean): any[] {
    if (!items) return [];
    if (!searchFunc) return items;
    
    return items.filter(it => {
      return searchFunc(it);
    });
  }
}
