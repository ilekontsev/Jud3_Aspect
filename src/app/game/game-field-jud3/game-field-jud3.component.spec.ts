import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFieldJud3Component } from './game-field-jud3.component';

describe('GameFieldJud3Component', () => {
  let component: GameFieldJud3Component;
  let fixture: ComponentFixture<GameFieldJud3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameFieldJud3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameFieldJud3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
