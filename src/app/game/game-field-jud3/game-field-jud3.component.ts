import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { Cursor } from 'src/_katana/baseClasses/cursor';
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
  classStep: any;

  ngAfterViewInit() {
    if (this.init) return;

    this.configCanvas();

    this.createEventSubscriptions();
    this.createStepClass({ key: 'menu' });

    this.render();
    this.init = true;
  }

  configCanvas() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;

    this.createCursor();
    this.blockCursorInWindow();
  }
  cursor;
  createCursor() {
    this.cursor = new Cursor({
      canvas: this.canvas.nativeElement,
      ctx: this.ctx,
    });
  }

  blockCursorInWindow() {
    const canvas = this.canvas.nativeElement as HTMLCanvasElement;

    canvas.onclick = () => {
      canvas.requestPointerLock();
    };
  }

  createEventSubscriptions() {
    Helper.event.subscribe((res) => {
      this.createStepClass(res);
    });
  }

  createStepClass(option) {
    switch (option.key) {
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
          config: option.config,
          nickname: 'GreezlyDvery',
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
    this.cursor.draw();

    window.requestAnimationFrame(this.render.bind(this));
  }
}
