import { Injectable } from '@angular/core';
import { catchError, Observable, retryWhen } from 'rxjs';
import { WebSocketMessage } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/app/env';
import { WsMessage } from '../Models/wsmsg.model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  url: string = "";
  connection!: WebSocketSubject<any>;

  constructor() {
  }

  setUrl(id: string) {
    this.url = environment.url.replace('http', 'ws') + '/start';
    if (id) {
      this.url += "/" + id;
    }
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
    this.connection.next(data);
  }

  sendMsg(action: string, data: string | null | number) {
    if (!this.connection)
      return
    let msg: WsMessage = { Action: action, Data: data };
    console.log("sending msg", msg);
    this.send(msg);
  }
}
