export class Project {
    ProjectID : number;
    Name : string;
    ParentProject : number;
    CategoryID : number;
    IsActive : boolean;

    constructor(){
          this.ProjectID = 0;
          this.CategoryID = 0;
          this.ParentProject = 0;
          this.Name = "";
          this.IsActive = true;
    }
}