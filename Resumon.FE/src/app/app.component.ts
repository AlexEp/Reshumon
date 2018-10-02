import { Component, OnInit } from '@angular/core';
  
import { MessagesService } from './services/messages.service';
import { TranslateService } from 'ng2-translate';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  posts = [];

  constructor(private  auth : AuthService, private messagesService : MessagesService,private translate: TranslateService) { 
    translate.addLangs(["eng", "he"]);
    translate.setDefaultLang('eng');
     translate.use( 'eng');
    // let browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    //auth.handleAuthentication();
  }

  ngOnInit(): void {
 
  }
  





}
