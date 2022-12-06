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
export class GameFieldJud3Component implements OnInit, AfterViewInit {
  @ViewChild('canvas') readonly canvas;

  private image = new Image();
  private ctx: CanvasRenderingContext2D;
  private init = false;
  private player: any;
  constructor() {}

  ngOnInit() {}

  loadPressets() {
    this.image.src = '';
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0);
    };
  }

  createEventSubscribtions() {
    document.addEventListener('keydown', (event) => {
      this.player.keys[event.code] = true;
    });

    document.addEventListener('keyup', (event) => {
      this.player.keys[event.code] = false;
    });

    document.addEventListener('mousemove', (event) => {});

    document.addEventListener('mouseup', () => {});

    document.addEventListener('mousedown', () => {});
  }

  createCharters() {
    this.player = new Varior(this.canvas, this.ctx, {
      position: { x: 500, y: 500 },
    });

    this.createEventSubscribtions();
  }

  render() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.save();
    this.update();
    this.draw();
    this.ctx.restore();
    window.requestAnimationFrame(this.render.bind(this));
  }

  update() {}
  draw() {
    this.player.render();
  }

  ngAfterViewInit() {
    if (this.init) return;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;

    this.loadPressets();
    this.createCharters();
    this.render();
    this.init = true;
  }
}
