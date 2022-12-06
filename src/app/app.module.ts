import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameFieldComponent } from './game/game-field/game-field.component';
import { GameFieldTreejsComponent } from './game/game-field-treejs/game-field-treejs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './mainComponents/main/main.component';
import { SubHeaderComponent } from './mainComponents/sub-header/sub-header.component';

@NgModule({
  declarations: [
    AppComponent,
    GameFieldComponent,
    GameFieldTreejsComponent,
    MainComponent,
    SubHeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
