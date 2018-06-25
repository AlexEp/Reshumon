import { AppError } from './app-error';

export class ServerError extends AppError {
    constructor(public innerExeption?:any){
        super(innerExeption);
    }
}