import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { Knight } from 'src/_katana/classes/knight';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss'],
})
export class GameFieldComponent implements AfterViewInit {
  @ViewChild('canvas') readonly canvas;

  constructor(private cdr: ChangeDetectorRef) {}

  player;
  ctx;

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.createPlayer();
    this.subscriptionEvent();
    window.requestAnimationFrame(this.render.bind(this));
  }

  createPlayer() {
    this.player = new Knight(this.canvas.nativeElement, this.ctx, {
      speed: 0.5,
      attackSpeed: 0.6,
      position: {
        x: 500,
        y: 500,
      },
    });
  }

  subscriptionEvent() {
    document.addEventListener('keydown', (event) => {
      this.player.keys[event.code] = true;
    });
    document.addEventListener('keyup', (event) => {
      this.player.keys[event.code] = false;
    });

    document.addEventListener('mousemove', (event) => {
      this.player.mouse.x = event.clientX;
      this.player.mouse.y = event.clientY;
    });

    document.addEventListener('mouseup', () => {
      this.player.keys['Space'] = false;
    });

    document.addEventListener('mousedown', () => {
      this.player.keys['Space'] = true;
    });
  }

  renderUi() {
    // this.ctx.fillRect(0, window.innerHeight - 100, window.innerWidth, 100);
  }

  render() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.save();
    this.renderUi();
    this.player.render();
    this.ctx.restore();

    window.requestAnimationFrame(this.render.bind(this));
  }
}
