import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, retryWhen, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  value: any = Array.from(Array(20).keys()).map(x => JSON.parse('{"index": ' + x + ', "amount": ' + x + '}'));

  board: BehaviorSubject<any> = new BehaviorSubject<any>(this.value);

  revealedValues: any = [];
  revealedBoxes: BehaviorSubject<any> = new BehaviorSubject<any>(this.revealedValues);

  isOver: Subject<boolean> = new Subject<boolean>();



  removeIndex(index: number, amount: number) {
    this.value = this.value.filter((item: any) => item.index != index);
    this.board.next(this.value);

    this.revealedValues.push({ 'index': index, 'amount': amount });
    this.revealedBoxes.next(this.revealedValues);
  }



}
