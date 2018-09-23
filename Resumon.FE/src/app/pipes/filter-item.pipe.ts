import { Pipe, PipeTransform } from "@angular/core";
import { Project } from "../shared/project.model";

@Pipe({
  name: 'filterItem'
})
export class FilterItem implements PipeTransform {
  transform(items: any[], searchFunc: (item:any,params: any )=> boolean,params : any): any[] {
    if (!items) return [];
    if (!searchFunc || !params ) return items;
    
    return items.filter(it => {
      return searchFunc(it,params);
    });
  }
}
