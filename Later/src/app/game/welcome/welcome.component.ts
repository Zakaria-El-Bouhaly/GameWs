import { Component } from '@angular/core';
import { ResponseHandlerService } from '../services/responseHandler.service';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  PIN: string = "";
  

  constructor(
    private webSocketService: WebSocketService,
    private responseHandlerService: ResponseHandlerService,
  ) { }

  createGame() {
    
    this.webSocketService.setUrl("");
    // connect to the websocket
    this.webSocketService.connect().subscribe((data: any) => {
      this.responseHandlerService.handleResponse(data);
    });

  }


  joinGame() {
    this.webSocketService.setUrl(this.PIN);
    // connect to the websocket
    this.webSocketService.connect().subscribe((data: any) => {
      this.responseHandlerService.handleResponse(data);
    });
  }

}
