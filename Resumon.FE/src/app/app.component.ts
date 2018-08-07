import { Component } from '@angular/core';
  
import { MessagesService } from './services/messages.service';
import { TranslateService } from 'ng2-translate';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts = [];

  constructor(private  auth : AuthService, private messagesService : MessagesService,private translate: TranslateService) { 
    translate.addLangs(["en", "he"]);
    translate.setDefaultLang('he');
     translate.use( 'he');
    // let browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    auth.handleAuthentication();
  }

  getMsg(){
    return this.messagesService.getMsg();
  }


}
