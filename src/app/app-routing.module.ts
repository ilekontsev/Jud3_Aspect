import { GameFieldComponent } from './game/game-field/game-field.component';
import { GameFieldTreejsComponent } from './game/game-field-treejs/game-field-treejs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'treejs',
  },
  {
    path: 'treejs',
    pathMatch: 'full',
    component: GameFieldTreejsComponent,
  },
  {
    path: 'canvas',
    pathMatch: 'full',
    component: GameFieldComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
