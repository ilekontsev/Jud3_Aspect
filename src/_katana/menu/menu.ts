import { MENU } from 'src/app/game/game-field-jud3/constants/path-presets';
import { Background } from './background';

export class Menu {
  ctx: CanvasRenderingContext2D;

  imageSrc = MENU.main;
  images = {};
  background;
  constructor(ctx) {
    this.ctx = ctx;
    this.init();
  }

  init() {
    this.loadImage();
    this.createBackGround();
  }

  loadImage() {
    for (let key in this.imageSrc) {
      const image = new Image();
      image.src = this.imageSrc[key];
      this.images[key] = image;
    }
  }

  createBackGround() {
    this.background = new Background(this.ctx);
  }

  update() {}

  draw() {
    this.background.draw();
    this.ctx.drawImage(this.images['button'], 400, 400);
  }
}
