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


  board: any;
  revealedBoxes: any;

  constructor(
    private webSocketService: WebSocketService,
    private responseHandlerService: ResponseHandlerService,
    private gameService: GameService) { }



  ngOnInit(): void {
    this.webSocketService.connect().subscribe((data: any) => {
      this.responseHandlerService.handleResponse(data);
      this.messages.push(JSON.parse(data.Message));      
    });

    this.gameService.board.subscribe((data: any) => {
      console.log(data);
      this.board = data;
    });

    this.gameService.revealedBoxes.subscribe((data: any) => {      
      this.revealedBoxes = data;
      console.log(this.revealedBoxes);
    });
  }


  sendNumber(num: number) {
    console.log(num);
    let message = {
      "Action": "selectBox",
      "Data": num
    }
    this.webSocketService.send(message);
  }

}
