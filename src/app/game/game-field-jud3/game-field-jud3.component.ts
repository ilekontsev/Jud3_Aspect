import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Warrior } from 'src/_katana/classes/Warrior';
import { Menu } from 'src/_katana/menu/menu';
import { PATH_PRESETS } from './constants/path-presets';

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
  private load = true;
  private player: any;

  private configPlayer = {
    charter: 'warrior',
    gun: 'canonGun',
    bullet: 'cat',
    cursor: 0,
    nickname: 'GreezlyDvery',
  };

  ngOnInit(): void {}

  loadPresets() {
    const images = [];
    for (let key in PATH_PRESETS) {
      const image = PATH_PRESETS[key][this.configPlayer[key.slice(0, -1)]];
      images.push(image);
    }

    const presetLength = images.length;
    images.forEach((item, i) => {
      this.image.src = item;
      this.image.onload = () => {};
      const percent = ((i + 1) / presetLength) * 100;
      if (percent === 100) {
        this.load = true;
      }
    });
  }

  test() {
    this.menu = null;
  }

  ngAfterViewInit() {
    if (this.init) return;

    this.configCanvas();
    this.createCharters();
    // this.createEventSubscriptions();
    this.menu = new Menu({ canvas: this.canvas.nativeElement, ctx: this.ctx });

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

  createCharters() {
    this.player = new Warrior(this.canvas.nativeElement, this.ctx, {
      position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      nickname: this.configPlayer.nickname,
    });
  }

  createEventSubscriptions() {
    document.addEventListener('keydown', (event) => {
      this.player.keys[event.code] = true;
    });

    document.addEventListener('keyup', (event) => {
      this.player.keys[event.code] = false;
    });

    const callback = this.updatePositionCursor.bind(this);

    document.addEventListener('pointerlockchange', () => {
      document.pointerLockElement === this.canvas.nativeElement
        ? document.addEventListener('mousemove', callback)
        : document.removeEventListener('mousemove', callback);
    });
  }

  updatePositionCursor(event: MouseEvent) {
    this.player.mouse.x += event.movementX;
    this.player.mouse.y += event.movementY;
  }

  menu;
  func;
  initGameOver = false;
  render() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    this.menu.render();
    window.requestAnimationFrame(this.render.bind(this));

    return;

    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);

    this.func = this.clickButton.bind(this);

    if (this.player.hpBar.count === 8) {
      if (!this.initGameOver) {
        document.addEventListener('click', this.func);
        this.initGameOver = true;
      }

      this.ctx.fillRect(
        window.innerWidth / 2,
        window.innerHeight / 2 + 50,
        100,
        50
      );

      this.ctx.fillStyle = 'white';
      this.ctx.font = '44px serif';
      this.ctx.fillText(
        'retry',
        window.innerWidth / 2 + 10,
        window.innerHeight / 2 + 85
      );

      this.ctx.fillStyle = 'black';

      this.ctx.font = '120px serif';
      this.ctx.fillText(
        'Game Over',
        window.innerWidth / 2 - 260,
        window.innerHeight / 2
      );
    } else {
      this.ctx.save();
      this.update();
      this.draw();

      this.ctx.restore();
    }

    window.requestAnimationFrame(this.render.bind(this));
  }

  clickButton(event) {
    if (
      (window.innerWidth / 2 <= event.offsetX &&
        window.innerWidth / 2 + 50 >= event.offsetX) ||
      (window.innerWidth / 2 >= event.offsetX &&
        window.innerWidth / 2 - 50 <= event.offsetX &&
        window.innerHeight / 2 + 50 <= event.offsetY &&
        window.innerHeight / 2 + 25 + 50 >= event.offsetY) ||
      (window.innerHeight / 2 + 50 >= event.offsetY &&
        window.innerHeight / 2 - 25 + 50 <= event.offsetY)
    ) {
      this.createCharters();
      this.initGameOver = false;
    }
  }

  update() {
    this.player.update();
  }

  draw() {
    this.player.draw();
  }
}
