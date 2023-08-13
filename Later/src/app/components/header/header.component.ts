import { Component } from '@angular/core';
import { ThemeSwitcherService } from 'src/app/services/theme-switcher.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  constructor(
    private themeSwitcherService: ThemeSwitcherService,
  ) {
  }

  
  visible = false;
  option: number = 0;
  title: string = '';

  showHelp() {
    this.visible = true;
    this.option = 1;
    this.title = 'Help';
  }

  showGithub() {
    this.visible = true;
    this.option = 2;
    this.title = 'Github';
  }

  toggleMode() {
    this.themeSwitcherService.toggleMode();
  }

}
