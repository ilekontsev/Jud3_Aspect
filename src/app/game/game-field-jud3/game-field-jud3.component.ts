import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Warrior } from 'src/_katana/classes/Warrior';
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

  ngOnInit(): void {
    // this.loadPresets();
  }

  loadPresets() {
    const images = [];
    for (let key in PATH_PRESETS) {
      console.log(this.configPlayer[key.slice(0, -1)]);
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

  ngAfterViewInit() {
    if (this.init) return;

    this.configCanvas();
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

  createCharters() {
    this.player = new Warrior(this.canvas.nativeElement, this.ctx, {
      position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      nickname: this.configPlayer.nickname
    });

    this.createEventSubscriptions();
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

  render() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);

    this.ctx.save();


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
    this.player.draw();
  }
}
