import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameFieldComponent } from './game/game-field/game-field.component';
import { GameFieldTreejsComponent } from './game/game-field-treejs/game-field-treejs.component';

@NgModule({
  declarations: [
    AppComponent,
    GameFieldComponent,
    GameFieldTreejsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
