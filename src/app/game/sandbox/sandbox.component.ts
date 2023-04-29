import { Component, ViewChild } from '@angular/core';
import { Cursor } from 'src/_katana2.0/cursor/cursor';
import { Berserker } from 'src/_katana2.0/gameObject/charter/berserker/Berserker';
import { Hunter } from 'src/_katana2.0/gameObject/charter/hunter/Hunter';
import { Warrior } from 'src/_katana2.0/gameObject/charter/warrior/Warrior';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent {
  @ViewChild('canvas') readonly canvas;
  ctx: CanvasRenderingContext2D;
  charter: Warrior;
  charter2: Berserker;
  charter3: Hunter;
  cursor: Cursor;

  handleClickByGameField(event) {
    this.canvas.nativeElement.requestPointerLock();
    this.cursor.cursorPosition.set({x: event.offsetX, y: event.offsetY})
  }

  ngAfterViewInit() {
    this.configCanvas();

    const canvas = this.canvas.nativeElement as HTMLCanvasElement;

    this.cursor = new Cursor({ ctx: this.ctx, canvas });

    this.charter = new Warrior({
      canvas: this.canvas.nativeElement,
      ctx: this.ctx,
      nickname: 'GreezlyDvery',
      position: {
        x: 0,
        y: 0,
      },
    });

    this.charter2 = new Berserker({
      canvas: this.canvas.nativeElement,
      ctx: this.ctx,
      nickname: 'GreezlyDvery',
      position: {
        x: 0,
        y: 100,
      },
    });

    this.charter3 = new Hunter({
      canvas: this.canvas.nativeElement,
      ctx: this.ctx,
      nickname: 'GreezlyDvery',
      position: {
        x: 0,
        y: 200,
      },
    });

    this.render();
  }

  configCanvas() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.ctx.imageSmoothingEnabled = false;
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
  }

  render() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);

    this.sandbox();

    window.requestAnimationFrame(this.render.bind(this));
  }

  sandbox() {
    this.cursor.draw();

    this.charter.update();
    this.charter2.update();
    this.charter3.update();

    this.charter.draw();
    this.charter2.draw();
    this.charter3.draw();
  }
}
