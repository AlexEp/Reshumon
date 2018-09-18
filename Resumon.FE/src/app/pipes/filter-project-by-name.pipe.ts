import { Pipe, PipeTransform } from "@angular/core";
import { Project } from "../shared/project.model";

@Pipe({
  name: 'filterProjectByName'
})
export class FilterProjectByName implements PipeTransform {
  transform(items: Project[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.Name.toLowerCase().includes(searchText);
    });
  }
}
