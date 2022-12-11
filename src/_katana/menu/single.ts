import { MENU } from 'src/app/game/game-field-jud3/constants/path-presets';

export class Single {
  ctx: CanvasRenderingContext2D;
  imageSrc = {
    ...MENU.interface,
    ...MENU.cancel,
    ...MENU.ready,
    ...MENU.single.modes,
  };
  images = {};
  constructor(options) {
    this.ctx = options.ctx;
    this.init();
  }

  init() {
    this.loadImages();
  }

  loadImages() {
    for (let key in this.imageSrc) {
      const image = new Image();
      image.src = this.imageSrc[key];
      this.images[key] = image;
    }
  }

  update() {}

  draw() {
    this.ctx.drawImage(
      this.images['panel'],
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );
    this.ctx.drawImage(
      this.images['defence'],
      window.innerWidth / 2,
      window.innerHeight / 2,
      500,
      300
    );
    this.ctx.drawImage(
      this.images['default'],
      window.innerWidth / 2 - 250,
      window.innerHeight / 2 - 100,
      500,
      150
    );
  }
}
