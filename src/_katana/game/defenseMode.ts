import { Game } from 'src/_katana/game/game';
import { GameHelper } from './gameHelper';
import { PATH_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';

export class DefenseMode {
  options;
  ctx: CanvasRenderingContext2D;
  images: HTMLImageElement;

  constructor(options) {
    this.options = options;
    this.ctx = options.ctx;
    this.init();
  }

  init() {
    this.loadImages();
    this.createEventSubscriptions();
  }

  loadImages() {
    const image = new Image();
    image.src = PATH_PRESETS.base;
    this.images = image;
    console.log(image);
  }

  createEventSubscriptions() {}

  update() {}

  draw() {
    this.ctx.save();

    this.ctx.drawImage(
      this.images,
      window.innerWidth / 2 - 100 - GameHelper.charterPosition.x,
      window.innerHeight / 2 - 100 - GameHelper.charterPosition.y,
      200,
      200
    );

    this.ctx.restore();
  }
}
