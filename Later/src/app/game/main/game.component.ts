import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { box } from '../Models/box.model';
import { GameState } from '../Models/gamestate.model';
import { GameService } from '../services/game.service';
import { WebSocketService } from '../services/websocket.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  // the boxes on the board
  board: box[] = [];

  // remaining amounts that the players hasnt eliminated yet
  availableAmounts: number[] = []

  gameState: GameState = {
    isOver: false,
    isStarted: false,
    turn: 0
  }

  // the price offered by the buyer
  offerAmount: number = 0;

  // to show available amounts dialog
  visible: boolean = false;

  // for the buyer to make an offer
  offerValue: number = 0;
  // to show offer form dialog
  suggestOffer: boolean = false;

  // 1 : player , 2 : buyer
  playerRole: number = 0;

  playerCount: number = 0;

  constructor(
    private webSocketService: WebSocketService,
    private gameService: GameService) { }



  ngOnInit(): void {

    this.gameService.gamePin.subscribe((data: string) => {
      Swal.fire({
        title: 'Game PIN',
        text: data,
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    });

    // detect player role changes  
    this.gameService.playerRole.subscribe((data: number) => {
      if (this.playerRole != 1)
        this.playerRole = data;
      console.log("playerRole", this.playerRole);
    });

    // detect changes in the player count
    this.gameService.playerCount.subscribe((data: number) => {
      this.playerCount = data;
      console.log("playerCount", this.playerCount);
      if (this.playerCount == 2) {
        Swal.fire({
          title: 'Game is ready to start',
          icon: 'info',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        });
      }
    });

    // detect game state changes
    this.gameService.gameState.subscribe((data: GameState) => {
      this.gameState = data;
      console.log("gameState", this.gameState);
    });

    // detect changes in the board
    this.gameService.board.subscribe((data: box[]) => {
      this.board = data;
    });

    this.gameService.availableAmountsSubject.subscribe((data: any) => {
      console.log('availableAmounts', data);
      // detect changes
      try {
        let newAmounts = data;
        let removed = this.availableAmounts.filter((item: any) => !newAmounts.includes(item));
        console.log("removed", removed);
        if (removed.length == 1)
          Swal.fire({
            title: removed + "$",
            icon: 'info',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
            timer: 1500
          });
      }
      catch (e) {
        console.log("error");
      }
      this.availableAmounts = data;
    });


    // detect changes in the offer amount
    this.gameService.offerAmount.subscribe((data: number) => {
      if (this.playerRole == 1) {

        console.log('offerAmount', data);

        // choose to accept or refuse the offer

        Swal.fire({
          title: data + "$",
          text: "Do you accept the offer? ",
          icon: 'question',
          confirmButtonColor: '#3085d6',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
          allowOutsideClick: false,
          allowEscapeKey: false

        }).then((result) => {
          if (result.isConfirmed) {
            this.webSocketService.sendMsg("acceptOffer", null);
          }
          if (result.isDenied) {
            this.webSocketService.sendMsg("refuseOffer", null);
          }
        })
      }
    }
    );

    // subscribe to the intially selected amount
    this.gameService.selectedAmount.subscribe((data: number) => {
      // show the selected amount in a popup 
      Swal.fire({
        title: data + "$",
        text: "the box had",
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
    });

    window.onbeforeunload = () => this.ngOnDestroy();

  }



  showDialog() {
    this.visible = true;
  }

  showOffer() {
    this.suggestOffer = true;
  }

  sendNumber(num: number) {

    if (this.gameState.isOver || this.gameState.turn != 1 || !this.gameState.isStarted || this.playerRole != 1) {
      return;
    }
    this.webSocketService.sendMsg("selectBox", num);
  }

  startGame() {
    if (this.gameState.isStarted || this.playerCount != 2) {
      return;
    }

    this.webSocketService.sendMsg("startGame", null);
  }


  // for the buyer to send the offer
  sendOffer() {
    if (this.gameState.isOver || this.gameState.turn != 2 || !this.gameState.isStarted || this.playerRole != 2) {
      return;
    }

    this.webSocketService.sendMsg("makeOffer", this.offerValue);
    this.suggestOffer = false;
  }

  ignoreOffer() {
    if (this.gameState.isOver || this.gameState.turn != 2 || !this.gameState.isStarted || this.playerRole != 2) {
      return;
    }
    this.webSocketService.sendMsg("ignoreOffer", null);
  }


  // restart the game
  restartGame() {
    if (!this.gameState.isOver) {
      return;
    }
    this.webSocketService.sendMsg("restartGame", null);
  }

  ngOnDestroy() {
    console.log("destroy");
    this.webSocketService.disconnect();
  }
}
