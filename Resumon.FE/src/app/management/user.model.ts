
export class User {
      UserID: number;
      Name: string;
      LastName: string;
      Email?: any;
      IsActive: boolean;

      constructor(){
            this.UserID = 0;
            this.Name = "";
            this.LastName = "";
            this.IsActive = true;
      }
}


  