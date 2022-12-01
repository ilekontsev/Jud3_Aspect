import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Knight } from 'src/_katana/classes/knight';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss'],
})
export class GameFieldComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') readonly canvas;

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    const ctx = this.canvas.nativeElement.getContext('2d');

    this.subscriptionEvent(ctx);
  }

  subscriptionEvent(ctx) {
    console.log(window.innerHeight);

    const knight = new Knight(this.canvas, ctx, {
      speed: 0.3,
      speedAttack: 2,
      position: {
        x: 0,
        y: 0,
      },
    });

    document.addEventListener('keydown', (event) => {
      knight.keys[event.keyCode] = true;
      knight.render();
    });
    document.addEventListener('keyup', (event) => {
      knight.keys[event.keyCode] = false;
      // knight.render();
    });
    knight.render();

    // requestAnimationFrame(knight.render);
  }
}
