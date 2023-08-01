import { Injectable } from '@angular/core';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerService {

  constructor(private gameService: GameService) { }


  handleResponse(response: any) {

    let message = JSON.parse(response.Message);

    console.log(message.Action);
    
    if (message.Action == "selectBox") {
      console.log(message.Data);
      // string to number array      
      this.gameService.board.next(JSON.parse(message.Data));
    }
    if (message.action == "isOver") {
      this.gameService.isOver.next(response.isOver);
    }
  }



}
