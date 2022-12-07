import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Varior } from 'src/_katana/classes/varior';

@Component({
  selector: 'app-game-field-jud3',
  templateUrl: './game-field-jud3.component.html',
  styleUrls: ['./game-field-jud3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameFieldJud3Component implements AfterViewInit {
  @ViewChild('canvas') readonly canvas;

  private image = new Image();
  private ctx: CanvasRenderingContext2D;
  private init = false;
  private player: any;
  constructor() {}

  ngAfterViewInit() {
    if (this.init) return;

    this.configCanvas();
    this.loadPressets();
    this.createCharters();

    this.render();
    this.init = true;
  }

  configCanvas() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;

    this.blockCursorInWindow();
  }

  blockCursorInWindow() {
    const canvas = this.canvas.nativeElement as HTMLCanvasElement;

    canvas.onclick = () => {
      canvas.requestPointerLock();
    };
  }

  loadPressets() {
    this.image.src = '';
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0);
    };
  }

  createEventSubscriptions() {
    document.addEventListener('keydown', (event) => {
      this.player.keys[event.code] = true;
    });

    document.addEventListener('keyup', (event) => {
      this.player.keys[event.code] = false;
    });

    const func = this.updatePositionCursor.bind(this);

    document.addEventListener('pointerlockchange', () => {
      document.pointerLockElement === this.canvas.nativeElement
        ? document.addEventListener('mousemove', func)
        : document.removeEventListener('mousemove', func);
    });
  }

  updatePositionCursor(event: MouseEvent) {
    this.player.mouse.x += event.movementX;
    this.player.mouse.y += event.movementY;
  }

  createCharters() {
    this.player = new Varior(this.canvas.nativeElement, this.ctx, {
      position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    });

    this.createEventSubscriptions();
  }

  render() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);

    this.ctx.fillRect(20, 20, 100, 100);

    this.ctx.beginPath();
    this.ctx.moveTo(0, window.innerHeight / 2);
    this.ctx.lineTo(window.innerWidth, window.innerHeight / 2);
    this.ctx.moveTo(window.innerWidth / 2, 0);
    this.ctx.lineTo(window.innerWidth / 2, window.innerHeight);
    this.ctx.stroke();
    this.ctx.closePath();

    this.update();
    this.draw();

    this.ctx.restore();

    window.requestAnimationFrame(this.render.bind(this));
  }

  update() {
    this.player.update();
  }

  draw() {
    this.player.render();
  }
}
