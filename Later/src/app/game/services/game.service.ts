import { Injectable } from '@angular/core';
import { catchError, Observable, retryWhen, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  board: Subject<number[]> = new Subject<number[]>();

  isOver: Subject<boolean> = new Subject<boolean>();
    
}
