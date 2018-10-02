import { Injectable } from '@angular/core';
import { MessageService as ToasMessageService  } from 'primeng/components/common/messageservice';

@Injectable()
export class MessagesService {
  msgs : any[];
  constructor(private messageService: ToasMessageService) { }

  // public setMsg(msg:string,subject :string ,msgType? : MsgType){
  //   this.msgs = [];
  //   msgType = msgType? msgType : MsgType.success;
  //   let severity = 'success';

  //   switch(msgType){
  //     case MsgType.success:
  //     severity = 'success';
  //     break;
  //     case MsgType.info:
  //     severity = 'info';
  //     break;
  //     case MsgType.error:
  //     severity = 'error';
  //     break;
  //     case MsgType.warn:
  //     severity = 'warn';
  //     break;
  //   }  

  //   this.messageService.add({key: 'global-toas','severity':severity, summary:subject, detail:msg});
  //   //this.msgs.push({'severity':severity, summary:msg, detail:'Order submitted'});
  // }

  public success(msg:string,subject :string ){
    this.messageService.add({key: 'global-toas','severity':'success', summary:subject, detail:msg});
  }

  public error(msg:string,subject :string ){
    this.messageService.add({key: 'global-toas','severity':'error', summary:subject, detail:msg});
  }
  
  public warn(msg:string,subject :string ){
    this.messageService.add({key: 'global-toas','severity':'warn', summary:subject, detail:msg});
  }

  public info(msg:string,subject :string ){
    this.messageService.add({key: 'global-toas','severity':'info', summary:subject, detail:msg});
  }

  
}


export enum MsgType {
  success = 1,
  info = 2,
  warn = 3,
  error = 4,
}

