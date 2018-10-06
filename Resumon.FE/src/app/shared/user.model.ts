import { basename } from "path";

export class User {
      UserID: number;
      UserName: string;
      FirstName: string;
      LastName: string;

      Email?: any;
      IsActive: boolean;
      JoinDate: Date;
      IsUseDiningRoom: boolean;


      constructor(){
            this.UserID = 0;
            this.UserName = "";
            this.FirstName = "";
            this.LastName = "";
            this.Email = "";
            this.IsActive = true;
            this.IsUseDiningRoom = false;
      }
}

export class RegistrationModel extends User {
      Password: string;
      Role : number;

      constructor(){
            super();
            this.Password = "";
            this.Role = 1;
      }

  
}