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
  }

  createEventSubscriptions() {}

  update() {
    if (
      window.innerWidth / 2 >
        window.innerWidth / 2 + GameHelper.charterPosition.x - 110 &&
      window.innerWidth / 2 <
        window.innerWidth / 2 + GameHelper.charterPosition.x + 110 &&
      window.innerHeight / 2 >
        window.innerHeight / 2 + GameHelper.charterPosition.y - 90 &&
      window.innerHeight / 2 <
        window.innerHeight / 2 + GameHelper.charterPosition.y + 120
    ) {
      console.log(true);
    }
  }

  draw() {
    this.ctx.save();

    this.ctx.drawImage(
      this.images,
      window.innerWidth / 2 - 100 - GameHelper.charterPosition.x,
      window.innerHeight / 2 - 100 - GameHelper.charterPosition.y,
      200,
      200
    );

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(window.innerWidth - 310, 10, 300, 300);
    this.ctx.strokeRect(window.innerWidth - 310, 10, 300, 300);

    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(
      window.innerWidth / 2 - 300,
      window.innerHeight - 100,
      600,
      100
    );

    this.ctx.restore();
  }
}
