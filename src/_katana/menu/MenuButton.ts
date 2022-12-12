import { takeUntil, Subject } from 'rxjs';
import { MENU } from 'src/app/game/game-field-jud3/constants/path-presets';
import { MenuHelper } from './ menuHelper';
import { ActionButtons } from './actionButton';
import { Helper } from './helper';

export class MenuButton {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  imageSrc = MENU.buttons;
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
      this.createAction(key, this.imageSrc[key]);
    }
  }

  createEventSubscription() {
    Helper.button.key.pipe(takeUntil(this.destroy$)).subscribe((key: string) => {
      MenuHelper.event.next(key);
    });
  }

  count = 290;

  createAction(key, images) {
    this.count -= 120;
    const action = new ActionButtons({
      canvas: this.canvas,
      ctx: this.ctx,
      key,
      images,
      position: {
        x: window.innerWidth / 2 - 200,
        y: window.innerHeight / 2 - this.count,
      },
      size: {
        x: 400,
        y: 100,
      },
    });

    this.buttons.push(action);
  }

  update() {
    this.buttons.forEach((item) => {
      item.update();
      item.mouse = this.mouse;
    });
  }

  draw() {
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
