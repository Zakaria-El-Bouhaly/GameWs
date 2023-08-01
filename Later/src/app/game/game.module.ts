import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GameRoutingModule } from './game-routing.module';
import { HomeComponent } from './home/home.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { BoxComponent } from './components/box/box.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    HomeComponent,
    BoxComponent
  ],
  imports: [
    BrowserModule,
    GameRoutingModule  ,
    FormsModule,
    InputNumberModule  ,
    ButtonModule,
    ReactiveFormsModule,
    TimelineModule,
    TableModule,
    DropdownModule,
    CardModule
    
  ],
  providers: [],
  bootstrap: []
})
export class GameModule { }
