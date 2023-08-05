import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent {


  @Input() num: any;
  @Input() amount: any = 0;

  @Output() selectIndex = new EventEmitter<number>();



  sendNumber(num: any) {
    this.selectIndex.emit(num);
  }

}
