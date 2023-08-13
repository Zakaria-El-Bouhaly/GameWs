import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './main/game.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { BoxComponent } from './components/box/box.component';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from '../components/header/header.component';


@NgModule({
  declarations: [
    GameComponent,
    BoxComponent,
    WelcomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    GameRoutingModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    ReactiveFormsModule,
    TimelineModule,
    TableModule,
    DropdownModule,
    CardModule,
    FieldsetModule,
    DialogModule,
    RippleModule,
    SweetAlert2Module    ,
    

  ],
  providers: [],
  bootstrap: []
})
export class GameModule { }
