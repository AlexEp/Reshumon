import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class AppConfigService {

  constructor() { }

  public getSiteURL() : string
  {
      return environment.backend.apiUrl;
  }

}
