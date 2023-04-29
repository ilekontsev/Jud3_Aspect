import { Component, ViewChild } from '@angular/core';
import { MoveCharter } from 'src/_katana2.0/actions/move/MoveCharter';
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
  moveCharter: MoveCharter;

  ngAfterViewInit() {
    this.configCanvas();

    this.charter = new Warrior({
      canvas: this.canvas.nativeElement,
      ctx: this.ctx,
      nickname: 'GreezlyDvery',
      position: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
    });

    this.charter2 = new Berserker({
      canvas: this.canvas.nativeElement,
      ctx: this.ctx,
      nickname: 'GreezlyDvery',
      position: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
    });

    this.charter3 = new Hunter({
      canvas: this.canvas.nativeElement,
      ctx: this.ctx,
      nickname: 'GreezlyDvery',
      position: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
    });

    this.moveCharter = new MoveCharter({
      canvas: this.canvas.nativeElement,
      ...this.charter2.configCharter,
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
    this.moveCharter.pressKey();
    this.charter.configCharter.position= this.moveCharter?.charterPosition;
    this.charter2.configCharter.position = this.moveCharter?.charterPosition;
    this.charter3.configCharter.position = this.moveCharter?.charterPosition;

    if (Object.values(this.moveCharter.keys).some((item) => item)) {
      this.charter.update();
      this.charter2.update();
      this.charter3.update();
    }
    this.charter.draw();

    this.charter2.draw();

    this.charter3.draw();
  }
}
