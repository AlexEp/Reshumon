
export class DailyActivity {
      ActivityID: number;
      UserID: number;
      ProjectID: number;
      StartDate?: any;
      EndDate?: any;
      Note: string;

      constructor(){
            this.ActivityID = 0;
            this.UserID = 0;
            this.ProjectID = 0;
            this.Note = "";
      }
}


  