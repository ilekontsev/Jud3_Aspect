import { Component, ViewChild } from '@angular/core';
import { Cursor } from 'src/_katana2.0/cursor/cursor';
import { BasePlayer } from 'src/_katana2.0/gameObject/basePlayer/base/BasePlayer';
import { Berserker } from 'src/_katana2.0/gameObject/charter/berserker/Berserker';
import { Hunter } from 'src/_katana2.0/gameObject/charter/hunter/Hunter';
import { Warrior } from 'src/_katana2.0/gameObject/charter/warrior/Warrior';
import { CanonGun } from 'src/_katana2.0/gameObject/gun/canon/CanonGun';

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
  base: BasePlayer;
  gun: CanonGun;

  handleClickByGameField(event) {
    if (this.canvas.nativeElement !== document.pointerLockElement) {
      this.canvas.nativeElement.requestPointerLock();
      this.cursor.cursorPosition.set({ x: event.offsetX, y: event.offsetY });
    }
  }

  ngAfterViewInit() {
    this.configCanvas();

    const canvas = this.canvas.nativeElement as HTMLCanvasElement;

    this.cursor = new Cursor({ ctx: this.ctx, canvas });

    this.gun = new CanonGun({ ctx: this.ctx, canvas, cursor: this.cursor });

    this.charter = new Warrior({
      canvas: this.canvas.nativeElement,
      ctx: this.ctx,
      nickname: 'GreezlyDvery',
      cursor: this.cursor,
      position: {
        x: 5,
        y: 0,
      },
    });

    this.charter2 = new Berserker({
      canvas: this.canvas.nativeElement,
      ctx: this.ctx,
      nickname: 'GreezlyDvery',
      cursor: this.cursor,
      position: {
        x: 0,
        y: 100,
      },
    });

    this.charter3 = new Hunter({
      canvas: this.canvas.nativeElement,
      ctx: this.ctx,
      nickname: 'GreezlyDvery',
      cursor: this.cursor,
      position: {
        x: 0,
        y: 200,
      },
    });

    this.base = new BasePlayer({
      canvas: this.canvas.nativeElement,
      ctx: this.ctx,
      position: {
        x: 0,
        y: 400,
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
    this.gun.position = this.charter.position;
    this.gun.update();
    this.base.update();

    this.charter.draw();
    this.charter2.draw();
    this.charter3.draw();
    this.gun.draw();

    this.base.draw();
  }
}
