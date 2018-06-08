import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {

  constructor() { }

  public getSiteURL() : string
  {
      return "https://jsonplaceholder.typicode.com";
  }

}
