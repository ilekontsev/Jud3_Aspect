import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFieldTreejsComponent } from './game-field-treejs.component';

describe('GameFieldTreejsComponent', () => {
  let component: GameFieldTreejsComponent;
  let fixture: ComponentFixture<GameFieldTreejsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameFieldTreejsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameFieldTreejsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
