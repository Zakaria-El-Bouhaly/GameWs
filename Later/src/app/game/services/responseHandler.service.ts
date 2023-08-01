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
    
    if (message.Action == "revealBox") {
      console.log(message.Data);
      let Data=JSON.parse(message.Data);      
      this.gameService.removeIndex(Data.index,Data.amount);
    }
    if (message.action == "isOver") {
      this.gameService.isOver.next(response.isOver);
    }
  }



}
