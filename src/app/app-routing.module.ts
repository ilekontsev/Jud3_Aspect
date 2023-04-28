import { GameFieldTreejsComponent } from './game/game-field-treejs/game-field-treejs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameFieldJud3Component } from './game/game-field-jud3/game-field-jud3.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SandboxComponent } from './game/sandbox/sandbox.component';

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

  {
    path: 'sand',
    pathMatch: 'full',
    component: SandboxComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
  },
  {
    path: 'analytics',
    pathMatch: 'full',
    component: AnalyticsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
