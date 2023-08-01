import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameService } from '../services/game.service';
import { ResponseHandlerService } from '../services/responseHandler.service';
import { WebSocketService } from '../services/websocket.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  messages: any[] = [{
    "Message": "Welcome to the game",
  }]

  codeForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
  });

  board: number[] = [1,2,4];

  selectedBox: number = 6;

  constructor(
    private webSocketService: WebSocketService,
    private responseHandlerService: ResponseHandlerService,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.webSocketService.connect().subscribe((data: any) => {
      this.responseHandlerService.handleResponse(data);
    });

    this.gameService.board.subscribe((data: any) => {
      this.board = data;
    });
  }

  sendMsg() {
    this.webSocketService.send(this.codeForm.value)
  }

  onBoxChange() {
    let body = {
      "action": "selectBox",
      "data": this.selectedBox
    }
    this.webSocketService.send(body);
  }

  generateCode() {
    let body = {
      "action": "generateCode",
      "data": ''
    }
    this.webSocketService.send(body);
  }
}
