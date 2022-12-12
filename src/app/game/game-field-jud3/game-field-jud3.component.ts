import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { Game } from 'src/_katana/game/game';
import { Helper } from 'src/_katana/menu/helper';
import { Menu } from 'src/_katana/menu/menu';

@Component({
  selector: 'app-game-field-jud3',
  templateUrl: './game-field-jud3.component.html',
  styleUrls: ['./game-field-jud3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameFieldJud3Component implements AfterViewInit {
  @ViewChild('canvas') readonly canvas;

  private ctx: CanvasRenderingContext2D;
  private init = false;

  private configPlayer = {
    charter: 'warrior',
    gun: 'canonGun',
    bullet: 'cat',
    cursor: 0,
    nickname: 'GreezlyDvery',
  };
  classStep: any;

  ngAfterViewInit() {
    if (this.init) return;

    this.configCanvas();

    this.createEventSubscriptions();
    this.createStepClass('menu');

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



  createEventSubscriptions() {
    Helper.event.subscribe((res) => {
      this.createStepClass('game');
    });
  }

  createStepClass(key) {
    switch (key) {
      case 'menu':
        this.classStep = new Menu({
          canvas: this.canvas.nativeElement,
          ctx: this.ctx,
        });
        break;
      case 'game':
        this.classStep = new Game({
          canvas: this.canvas.nativeElement,
          ctx: this.ctx,
        });
        break;
      default:
        break;
    }
  }

  render() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    this.classStep.render();

    this.ctx.beginPath();
    this.ctx.moveTo(0, window.innerHeight / 2);
    this.ctx.lineTo(window.innerWidth, window.innerHeight / 2);
    this.ctx.moveTo(window.innerWidth / 2, 0);
    this.ctx.lineTo(window.innerWidth / 2, window.innerHeight);
    this.ctx.stroke();
    this.ctx.closePath();

    window.requestAnimationFrame(this.render.bind(this));
  }
}
