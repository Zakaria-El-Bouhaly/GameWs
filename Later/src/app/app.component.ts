import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Later';

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    console.log("App Component");
    this.primengConfig.ripple = true;
  }


}
