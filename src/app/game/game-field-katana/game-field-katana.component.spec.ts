import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFieldKatanaComponent } from './game-field-katana.component';

describe('GameFieldKatanaComponent', () => {
  let component: GameFieldKatanaComponent;
  let fixture: ComponentFixture<GameFieldKatanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameFieldKatanaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameFieldKatanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
