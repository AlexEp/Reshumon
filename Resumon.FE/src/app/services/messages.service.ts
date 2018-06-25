import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {
  msgs : any[];
  constructor() { }

  public setMsg(msg:any){
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Success Message', detail:'Order submitted'});
  }

  public getMsg() : any[]{
    return this.msgs;
  }


}
