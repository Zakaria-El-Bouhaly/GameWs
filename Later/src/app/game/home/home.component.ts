import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { GameService } from '../services/game.service';
import { ResponseHandlerService } from '../services/responseHandler.service';
import { WebSocketService } from '../services/websocket.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  codeForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
  });


  board: any;
  revealedBoxes: any;
  availableAmounts: any;

  isStarted: boolean = false;
  turn: any;

  offerSwitch: boolean = false;
  offerAmount: any;

  isOver: boolean = false;

  visible: boolean = false;
  suggestOffer: boolean = false;

  offerValue: any = 0;



  constructor(
    private webSocketService: WebSocketService,
    private responseHandlerService: ResponseHandlerService,
    private gameService: GameService) { }



  ngOnInit(): void {
    this.webSocketService.connect().subscribe((data: any) => {
      this.responseHandlerService.handleResponse(data);
    });

    this.gameService.isStarted.subscribe((data: any) => {
      console.log('isStarted', data); // 'isStarted', 'true
      this.isStarted = data;
    });


    this.gameService.board.subscribe((data: any) => {
      console.log(data);
      this.board = data;
    });

    this.gameService.availableAmountsSubject.subscribe((data: any) => {
      console.log('availableAmounts', data); // 'availableAmounts', 'true
      this.availableAmounts = data;
    });

    this.gameService.isOver.subscribe((data: any) => {
      console.log('isOver', data); // 'isOver', 'true
      this.isOver = data;
    });

    this.gameService.turn.subscribe((data: any) => {
      console.log('turn', data); // 'turn', 'true
      this.turn = data;
    }
    );

    this.gameService.offerSwitch.subscribe((data: any) => {
      console.log('offerSwitch', data); // 'offerSwitch', 'true
      this.offerSwitch = data;

      Swal.fire({
        title: 'Switch',
        text: "Do you want to switch your box with the last one?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',

        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }


      }).then((result) => {
        console.log("before result");
        console.log(result);
        let message = null
        if (result.isConfirmed) {
          message = {
            "Action": "acceptSwitch",
            "Data": null
          }
        }
        if (result.isDismissed || result.isDenied) {
          message = {
            "Action": "refuseSwitch",
            "Data": null
          }
        }
        this.webSocketService.send(message);
      })

    });

    this.gameService.offerAmount.subscribe((data: any) => {
      console.log(data);
      this.offerAmount = data;

      Swal.fire({
        title: 'Offer',
        text: "Do you want to accept the offer?",
        icon: 'question',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',

        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }


      }).then((result) => {
        console.log("before result");
        console.log(result);
        let message = null
        if (result.isConfirmed) {
          message = {
            "Action": "acceptOffer",
            "Data": null
          }
        }
        if (result.isDismissed || result.isDenied) {
          message = {
            "Action": "refuseOffer",
            "Data": null
          }
        }
        this.webSocketService.send(message);

      })
    }
    );


  }

  showDialog() {
    this.visible = true;
  }

  showOffer() {
    this.suggestOffer = true;
  }

  sendNumber(num: number) {
    if (this.isOver || this.turn != 1 || !this.isStarted) {
      return;
    }
    console.log(num);
    let message = {
      "Action": "selectBox",
      "Data": num
    }

    if (this.offerSwitch) {
      message = {
        "Action": "switchBox",
        "Data": num
      }
    }

    this.webSocketService.send(message);
  }

  startGame() {
    if (this.isStarted) {
      return;
    }

    let message = {
      "Action": "startGame",
      "Data": null
    }
    this.webSocketService.send(message);

  }

  sendOffer() {


    let message = {
      "Action": "makeOffer",
      "Data": this.offerValue
    }
    this.webSocketService.send(message);
  }


  restartGame() {

    let message = {
      "Action": "restartGame",
      "Data": null
    }
    this.webSocketService.send(message);

  }

  sendOfferSwitch() {
    let message = {
      "Action": "offerSwitch",
      "Data": null
    }
    this.webSocketService.send(message);
  }

}
