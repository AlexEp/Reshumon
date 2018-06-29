import { Component } from '@angular/core';
  
import { MessagesService } from './services/messages.service';
import * as Globals from '../global';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts = [];

  constructor(private messagesService : MessagesService,private translate: TranslateService) { 
    translate.addLangs(["en", "he"]);
    translate.setDefaultLang('he');
     translate.use( 'he');
    // let browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  getMsg(){
    return this.messagesService.getMsg();
  }


}
