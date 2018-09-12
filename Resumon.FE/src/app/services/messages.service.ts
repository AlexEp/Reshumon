import { Injectable } from '@angular/core';
import { MessageService as ToasMessageService  } from 'primeng/components/common/messageservice';

@Injectable()
export class MessagesService {
  msgs : any[];
  constructor(private messageService: ToasMessageService) { }

  public setMsg(msg:string,msgType? : MsgType){
    this.msgs = [];
    msgType = msgType? msgType : MsgType.success;
    let severity = 'success';

    switch(msgType){
      case MsgType.success:
      severity = 'success';
      break;
      case MsgType.info:
      severity = 'info';
      break;
      case MsgType.error:
      severity = 'error';
      break;
      case MsgType.warn:
      severity = 'warn';
      break;
    }  

    this.messageService.add({key: 'global-toas',severity:'info', summary:'Message 1', detail:'PrimeNG rocks'});
    //this.msgs.push({'severity':severity, summary:msg, detail:'Order submitted'});
  }

  // public getMsg() : any[]{
  //   return this.msgs;
  // }
}


export enum MsgType {
  success = 1,
  info = 2,
  warn = 3,
  error = 4,
}

