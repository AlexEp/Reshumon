import { UsersFavorite } from '../shared/users-favorite.model';
import { Pipe, PipeTransform } from "@angular/core";
import { Project } from "../shared/project.model";
//import * as _ from 'lodash';
import { User } from '../shared/user.model';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsers  {
  transform(users: User[],searchText :string): any[] {
    if (!users) return [];
    if (!searchText) return users;
    searchText = searchText.toLowerCase();

     return users.filter(it => {
      return it.FirstName.toLowerCase().includes(searchText) || it.LastName.toLowerCase().includes(searchText) ;
    });
   
  }
}
