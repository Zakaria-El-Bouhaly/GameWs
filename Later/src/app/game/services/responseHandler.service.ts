import { Injectable } from '@angular/core';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerService {

  constructor(private gameService: GameService) { }


  handleResponse(response: any) {



    let message = JSON.parse(response.Message)

    let Data: any;
    try {
      Data = JSON.parse(message.Data);
    } catch {
      Data = message.Data;
    }



    console.log(message.Action);
    console.log(message.Data);


    if (message.Action == "startGame") {
      this.gameService.setAmounts(JSON.parse(Data.amounts), Data.isOver, Data.isStarted, Data.turn);
    }

    if (message.Action == "revealBox") {
      this.gameService.removeIndex(Data.index, Data.amount, Data.isOver, Data.isStarted, Data.turn);
    }

    if (message.Action == "makeOffer") {
      this.gameService.offerAmount.next(Data.amount);
    }

    if (message.Action == "acceptOffer") {
      this.gameService.updateGameStatus(Data.isOver, Data.isStarted, Data.turn);
    }

    if (message.Action == "refuseOffer") {
      this.gameService.updateGameStatus(Data.isOver, Data.isStarted, Data.turn);
    }

    if (message.Action == "offerSwitch") {
      this.gameService.offerSwitch.next(true);
    }

    if (message.Action == "refuseSwitch") {
      this.gameService.offerSwitch.next(false);
      this.gameService.updateGameStatus(Data.isOver, Data.isStarted, Data.turn);
    }

    if (message.Action == "swicthBox") {
      this.gameService.offerSwitch.next(false);
      this.gameService.updateGameStatus(Data.isOver, Data.isStarted, Data.turn);
    }

    if (message.Action == "endGame") {
      this.gameService.updateGameStatus(Data.isOver, Data.isStarted, Data.turn);
    }


  }



}
