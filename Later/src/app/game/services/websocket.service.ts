import { Injectable } from '@angular/core';
import { catchError, Observable, retryWhen } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  url: string = environment.url;
  connection!: WebSocketSubject<any>;

  constructor() {
    this.url = this.url.replace('http', 'ws') + '/start';
    console.log(this.url);
  }





  connect(): Observable<any> {


    if (this.connection) {     
      return this.connection;
    }    
    this.connection = webSocket(this.url);
    return this.connection;

  }

  disconnect() {
    if (this.connection) {
      this.connection.unsubscribe();
    }
  }

  send(data: any) {
    console.log(data);
    this.connection.next(data);    
  }

}
