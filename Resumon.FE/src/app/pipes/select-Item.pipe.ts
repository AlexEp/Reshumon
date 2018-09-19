import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'selectItemPipe'
})
export class SelectItemPipe implements PipeTransform {

  transform(value: any, labelProperty: string): any[] {
    if (value)
      return value.map(function (item) {
        return {
          label: item[labelProperty],
          value: item
        }
      });
    else return [];
  }

}