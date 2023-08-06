import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GameState } from '../Models/gamestate.model';
import { box } from '../Models/box.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  value: box[] = [];

  board: Subject<box[]> = new Subject<box[]>();

  availableAmounts: number[] = [];
  availableAmountsSubject: Subject<number[]> = new Subject<number[]>();

  gameState: Subject<GameState> = new Subject<GameState>();


  offerAmount: Subject<number> = new Subject<number>();
  
  gamePin: Subject<string> = new Subject<string>();
  playerCount: Subject<number> = new Subject<number>();
  playerRole: Subject<number> = new Subject<number>();

  selectedAmount: Subject<number> = new Subject<number>();


  setAmounts(amounts: number[]) {


    this.value = Array.from(Array(20).keys()).map(x => ({ index: ++x, amount: 0 }));
    console.log("board", this.value);
    this.board.next(this.value);

    this.availableAmounts = amounts;
    this.availableAmountsSubject.next(this.availableAmounts);



  }


  removeIndex(index: number, amount: number) {

    this.value = this.value.filter((item: box) => item.index != index);
    this.board.next(this.value);

    this.availableAmounts = this.availableAmounts.filter((item: number) => item != amount);
    this.availableAmountsSubject.next(this.availableAmounts);
  }

  updateGameStatus(gamestate: GameState) {
    this.gameState.next(gamestate);
  }



}
