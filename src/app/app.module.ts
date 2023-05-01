import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameFieldTreejsComponent } from './game/game-field-treejs/game-field-treejs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './mainComponents/main/main.component';
import { SubHeaderComponent } from './mainComponents/sub-header/sub-header.component';
import { GameFieldJud3Component } from './game/game-field-jud3/game-field-jud3.component';
import { HeaderComponent } from './mainComponents/header/header.component';
import { LayoutComponent } from './mainComponents/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MaterialModule } from './material.module';
import { SandboxComponent } from './game/sandbox/sandbox.component';
import { GameFieldKatanaComponent } from './game/game-field-katana/game-field-katana.component';

@NgModule({
  declarations: [
    AppComponent,
    GameFieldTreejsComponent,
    MainComponent,
    SubHeaderComponent,
    GameFieldJud3Component,
    HeaderComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    AnalyticsComponent,
    NotFoundComponent,
    SandboxComponent,
    GameFieldKatanaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
