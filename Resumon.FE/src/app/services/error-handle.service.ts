import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class AppErrorHandleService implements   ErrorHandler {
    constructor() { }

    handleError(error: any): void {
      throw new Error("Method not implemented.");
    }
}

@Injectable()
export class HTTPErrorHandleService implements   AppErrorHandleService {
  constructor() { }

  handleError(error: any): void {
    throw new Error("Method not implemented.");
  }
}
