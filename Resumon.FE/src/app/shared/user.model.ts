
export class User {
      UserID: number;
      UserName: string;
      FirstName: string;
      LastName: string;
      Password: string;
      Email?: any;
      IsActive: boolean;
      JoinDate: Date;
      IsUseDiningRoom: boolean;


      constructor(){
            this.UserID = 0;
            this.UserName = "";
            this.FirstName = "";
            this.LastName = "";
            this.Password = "";
            this.Email = "";
            this.IsActive = true;
            this.IsUseDiningRoom = false;
      }
}

