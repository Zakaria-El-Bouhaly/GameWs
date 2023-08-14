import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from '@angular/core';
import { Mode } from "./mode.model";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitcherService {
  currentMode: string = "";

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storageService: StorageService
  ) {
    this.currentMode = this.storageService.getItem('mode') || Mode.LIGHT;
    this.document.body.classList.add(this.currentMode);
  }

  toggleMode() {

    this.document.body.classList.toggle(Mode.DARK);
    this.document.body.classList.toggle(Mode.LIGHT);
    if (this.currentMode === Mode.LIGHT) {
      this.currentMode = Mode.DARK;
    } else {
      this.currentMode = Mode.LIGHT;
    }
    this.storageService.setItem('mode', this.currentMode);
  }


}
