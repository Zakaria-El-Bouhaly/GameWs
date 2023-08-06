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
      localStorage.setItem("playerRole", "1");
      this.gameService.gamePin.next(Data);      
    }        
    if (message.Action == "joined") {
      localStorage.setItem("playerRole", "2");
    }


    if (message.Action == "startGame") {
      this.gameService.setAmounts(JSON.parse(Data.amounts));
    }

    if (message.Action == "revealBox") {
      this.gameService.removeIndex(Data.index, Data.amount);
      if (Data.isOver) {
        this.gameService.selectedAmount.next(Data.selected);
      }
    }

    if (message.Action == "makeOffer") {
      this.gameService.offerAmount.next(Data.offer);
    }

    if (message.Action == "acceptOffer") {
      this.gameService.updateGameStatus(Data.isOver);
      this.gameService.selectedAmount.next(Data.selected);
    }

    if (message.Action == "refuseOffer") {
      if (localStorage.getItem("playerRole") == "2") {
        Swal.fire({
          title: 'Offer refused',
          text: 'The player refused your offer',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
      }
    }

  }



}
