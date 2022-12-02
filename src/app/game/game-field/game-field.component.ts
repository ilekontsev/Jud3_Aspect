import {
  AfterViewInit,
  ChangeDetectorRef,
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

  constructor(private cdr: ChangeDetectorRef) {}

  player;

  ngOnInit(): void {}
  ngAfterViewInit() {
    const ctx = this.canvas.nativeElement.getContext('2d');

    this.createPlayer(ctx);

    this.subscriptionEvent(ctx);
  }

  createPlayer(ctx) {
    this.player = new Knight(this.canvas.nativeElement, ctx, {
      speed: 0.3,
      speedAttack: 2,
      position: {
        x: 500,
        y: 500,
      },
    });
  }

  subscriptionEvent(ctx) {
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

    document.addEventListener('click', (event) => {
      console.log(event);
    });

    window.requestAnimationFrame(this.render.bind(this));
  }

  render() {
    this.player.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.player.key();
    this.player.rotate();
    this.player.renderIcon();

    window.requestAnimationFrame(this.render.bind(this));
  }
}
