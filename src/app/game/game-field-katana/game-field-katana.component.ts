import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Katana } from 'src/_katana2.0/Scena/Katana/Katana';

@Component({
  selector: 'app-game-field-katana',
  templateUrl: './game-field-katana.component.html',
  styleUrls: ['./game-field-katana.component.scss'],
})
export class GameFieldKatanaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') readonly canvas: ElementRef;
  private game: Katana;

  ngAfterViewInit() {
    this.game = new Katana(this.canvas.nativeElement);
  }

  ngOnDestroy(): void {
    this.game = null;
  }
}
