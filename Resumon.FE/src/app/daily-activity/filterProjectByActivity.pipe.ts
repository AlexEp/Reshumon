import { Project } from '../shared/project.model';
import { DailyActivity } from '../shared/daily-activity.model';
import { Pipe } from '@angular/core';
@Pipe({
  name: 'filterProjectByActivity'
})
export class FilterProjectByActivity {
  transform(projects: Project[], dailyActivity: DailyActivity[]): any[] {
    if (!projects)
      return [];
    return projects.filter(p => dailyActivity.find(d => d.ProjectID == p.ProjectID) == null);
  }
}