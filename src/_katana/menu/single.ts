import { Subject, takeUntil } from 'rxjs';
import { ActionButtons } from './actionButton';
import { MENU } from 'src/app/game/game-field-jud3/constants/path-presets';
import { Helper } from './helper';
import { MenuHelper } from './ menuHelper';
import { Slider } from './slider';

export class Single {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  options;
  imageSrc = { ...MENU.interface, ...MENU.modes, ...MENU.classesCharter };
  images = {};

  mouse = {
    x: 0,
    y: 0,
  };
  buttons = [];
  destroy$ = new Subject();

  positionButtons = {
    cancel: {
      x: window.innerWidth / 2 - 100,
      y: window.innerHeight / 2 + 140,
    },
    ready: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 + 140,
    },
    next: {
      x: window.innerWidth / 2 + 170,
      y: window.innerHeight / 2 - 170,
    },
    prev: {
      x: window.innerWidth / 2 - 270,
      y: window.innerHeight / 2 - 170,
    },
  };

  constructor(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.init();
  }

  init() {
    this.loadImages();
    this.createSlider();
    this.createEventSubscription();
  }

  loadImages() {
    for (let key in this.imageSrc) {
      const image = new Image();
      image.src = this.imageSrc[key];
      this.images[key] = image;
    }

    const images = { cancel: MENU.cancel, ready: MENU.ready };
    for (let key in images) {
      this.createAction(key, images[key]);
    }
  }

  sliders = [];

  createSlider() {
    this.sliders.push(
      new Slider({
        ...this.options,
        key: 'mode',
        image: MENU.modes,
        position: {
          x: window.innerWidth / 2 - 150,
          y: window.innerHeight / 2 - 220,
        },
        size: {
          x: 300,
          y: 150,
        },
      })
    );
    this.sliders.push(
      new Slider({
        ...this.options,
        image: MENU.classesCharter,
        key: 'class',
        position: {
          x: window.innerWidth / 2 - 150,
          y: window.innerHeight / 2 - 60,
        },
        size: {
          x: 300,
          y: 150,
        },
      })
    );
  }

  createEventSubscription() {
    Helper.button.key.pipe(takeUntil(this.destroy$)).subscribe((key) => {
      switch (key) {
        case 'ready':
          const config = {}
          this.sliders.forEach(slider => {
            config[slider.key] = slider.keyImage
          })
          Helper.event.next({key: 'game', config});
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
        x: this.positionButtons[key].x,
        y: this.positionButtons[key].y,
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

    this.sliders.forEach((slider) => {
      slider.update(this.mouse);
      slider.draw();
    });

    this.buttons.forEach((item) => {
      item.draw();
    });
  }

  destroy() {
    this.destroy$.next(null);
    this.destroy$.complete();

    this.sliders.forEach((slider) => {
      slider.destroy();
    });

    this.buttons.forEach((item) => {
      item.destroy();
    });
  }
}
