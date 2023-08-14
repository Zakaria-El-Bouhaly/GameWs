import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { GameState } from '../Models/gamestate.model';
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
      let gameStatus: GameState = {
        isOver: Data.isOver,
        isStarted: Data.isStarted,
        turn: Data.turn
      }
      this.gameService.updateGameStatus(gameStatus);

    } catch {
      Data = message.Data;
    }



    console.log(message.Action);
    console.log(message.Data);

    if (message.Action == "connected") {
      this.gameService.playerCount.next(Data.playerCount);
      this.gameService.gamePin.next(Data.code);
      this.gameService.playerRole.next(1);

    }
    else if (message.Action == "joined") {
      this.gameService.playerCount.next(Data.playerCount);
      this.gameService.playerRole.next(2);
    }


    else if (message.Action == "startGame") {
      this.gameService.setAmounts(JSON.parse(Data.amounts));
    }

    else if (message.Action == "revealBox") {
      this.gameService.removeIndex(Data.index, Data.amount);
      if (Data.isOver) {
        this.gameService.selectedAmount.next(Data.selected);
      }
    }

    else if (message.Action == "makeOffer") {
      this.gameService.offerAmount.next(Data.offer);
    }

    else if (message.Action == "acceptOffer") {
      this.gameService.updateGameStatus(Data.isOver);
      this.gameService.selectedAmount.next(Data.selected);
    }

    else if (message.Action == "refuseOffer") {

      Swal.fire({
        title: 'Offer refused',
        text: 'The player refused your offer',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
        timer: 1000
      });

    }

  }



}
