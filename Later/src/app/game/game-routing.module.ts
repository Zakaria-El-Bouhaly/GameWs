import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './main/game.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  // empty path redirects to welcome  
  { path: "", redirectTo: "play", pathMatch: "full" },
  { path: "play", component: GameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {
}
