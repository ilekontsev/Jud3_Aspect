import { Subject, takeUntil } from 'rxjs';
import { ActionButtons } from './actionButton';
import { MENU } from 'src/app/game/game-field-jud3/constants/path-presets';
import { Helper } from './helper';
import { MenuHelper } from './ menuHelper';

export class Single {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  imageSrc = { ...MENU.interface, ...MENU.modes };
  images = {};

  mouse = {
    x: 0,
    y: 0,
  };
  buttons = [];
  destroy$ = new Subject();

  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.init();
  }

  init() {
    this.loadImages();
    this.createEventSubscription();
  }

  loadImages() {
    for (let key in this.imageSrc) {
      const image = new Image();
      image.src = this.imageSrc[key];
      this.images[key] = image;
    }

    for (let key in MENU.single) {
      this.createAction(key, MENU.single[key]);
    }
  }

  createEventSubscription() {
    Helper.button.key.pipe(takeUntil(this.destroy$)).subscribe((key) => {
      switch (key) {
        case 'ready':
          Helper.event.next('test');
          break;
        case 'cancel':
          MenuHelper.event.next('cancel');
          break;
        default:
          break;
      }
    });
  }

  count = 300;
  createAction(key, images) {
    this.count -= 100;

    const button = new ActionButtons({
      canvas: this.canvas,
      ctx: this.ctx,
      key,
      images,
      position: {
        x: window.innerWidth / 2 - this.count,
        y: window.innerHeight / 2,
      },
      size: {
        x: 100,
        y: 100,
      },
    });

    this.buttons.push(button);
  }

  update() {
    this.buttons.forEach((item) => {
      item.update();
      item.mouse = this.mouse;
    });
  }

  draw() {
    this.ctx.drawImage(
      this.images['panel'],
      window.innerWidth / 2 - window.innerWidth / 4,
      window.innerHeight / 2 - window.innerHeight / 4,
      window.innerWidth / 2,
      window.innerHeight / 2
    );

    this.ctx.drawImage(
      this.images['infinity'],
      window.innerWidth / 2 - 150,
      window.innerHeight / 2 - 200,
      300,
      150
    );

    this.buttons.forEach((item) => {
      item.draw();
    });
  }

  destroy() {
    this.destroy$.next(null);
    this.destroy$.complete();

    this.buttons.forEach((item) => {
      item.destroy();
    });
  }
}
