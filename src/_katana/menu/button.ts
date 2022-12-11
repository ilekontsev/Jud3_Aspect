import { MENU } from 'src/app/game/game-field-jud3/constants/path-presets';
import { ActionButtons } from './actionButton';

export class Button {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  images = {};
  imageSrc = MENU.buttons;
  key = null;
  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.init();
  }

  init() {
    this.loadImages();
  }

  loadImages() {
    for (let key in this.imageSrc) {
      this.createAction(key, this.imageSrc[key]);
    }
  }
  buttons = [];
  count = 320;
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
        x: 410,
        y: 110,
      },
    });

    this.buttons.push(action);
  }

  render() {
    this.update();
    this.draw();
  }

  update() {
    this.buttons.forEach((item) => {
      item.update();
      if (item.click) {
        this.key = item.key;
      }
    });
  }

  draw() {
    this.buttons.forEach((item) => {
      item.draw();
    });
  }
}
