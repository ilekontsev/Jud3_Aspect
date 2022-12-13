import { GameFieldTreejsComponent } from './game/game-field-treejs/game-field-treejs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameFieldJud3Component } from './game/game-field-jud3/game-field-jud3.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'jud3',
  },
  {
    path: 'treejs',
    pathMatch: 'full',
    component: GameFieldTreejsComponent,
  },

  {
    path: 'jud3',
    pathMatch: 'full',
    component: GameFieldJud3Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
