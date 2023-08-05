import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, retryWhen, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  value: any = [];

  board: Subject<any> = new Subject<any>();

  revealedValues: any = [];
  revealedBoxes: BehaviorSubject<any> = new BehaviorSubject<any>(this.revealedValues);

  availableAmounts: any = [];
  availableAmountsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.availableAmounts);

  isStarted: Subject<boolean> = new Subject<boolean>();
  isOver: Subject<boolean> = new Subject<boolean>();
  turn: Subject<any> = new Subject<any>();

  offerAmount: Subject<any> = new Subject<any>();

  offerSwitch: Subject<boolean> = new Subject<boolean>();


  setAmounts(amounts: any, isOver: boolean, isStarted: boolean, turn: any) {

    this.updateGameStatus(isOver, isStarted, turn);

    this.value = Array.from(Array(20).keys()).map(x => JSON.parse('{"index": ' + (++x) + ', "amount": ' + 0 + '}'));
    console.log("board", this.value);
    this.board.next(this.value);

    this.availableAmounts = amounts;
    this.availableAmountsSubject.next(this.availableAmounts);



  }


  removeIndex(index: number, amount: number, isOver: boolean, isStarted: boolean, turn: any) {

    this.updateGameStatus(isOver, isStarted, turn);

    this.value = this.value.filter((item: any) => item.index != index);
    this.board.next(this.value);

    this.availableAmounts = this.availableAmounts.filter((item: any) => item != amount);
    this.availableAmountsSubject.next(this.availableAmounts);
  }

  updateGameStatus(isOver: boolean, isStarted: boolean, turn: any) {
    this.isOver.next(isOver);
    this.isStarted.next(isStarted);
    this.turn.next(turn);
  }



}
