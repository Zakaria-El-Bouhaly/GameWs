import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent {


  @Input() num: number = 0;
  @Input() amount: number = 0;
  @Input() isDisabled: boolean = false;

  @Output() selectIndex = new EventEmitter<number>();



  img: string = "";



  ngOnInit(): void {
    this.img = "box" + (Math.floor(Math.random() * 7) + 1) + ".png";
  }


  sendNumber(num: number) {
    this.selectIndex.emit(num);
  }

}
