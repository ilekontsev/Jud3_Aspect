import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Game } from 'src/_katana/game/game';
import { Cursor } from 'src/_katana/main/cursor/cursor';
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
  formStep: any;

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

    this.ctx.imageSmoothingEnabled = false;
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
        this.formStep = new Menu({
          canvas: this.canvas.nativeElement,
          ctx: this.ctx,
        });
        break;
      case 'game':
        this.formStep = new Game({
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

    this.formStep.render();
    this.cursor.draw();

    window.requestAnimationFrame(this.render.bind(this));
  }
}
