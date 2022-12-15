import { PATH_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';
import { GameHelper } from './gameHelper';

export class Base {
  options;
  images: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
  position = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
  size = {
    w: 200,
    h: 200,
  };

  constructor(options) {
    this.options = options;
    this.ctx = options.ctx;
    this.init();
  }

  init() {
    this.loadImages();
  }

  loadImages() {
    const image = new Image();
    image.src = PATH_PRESETS.base;
    this.images = image;
  }

  checkCollisionBase() {
    const positionX = GameHelper.charterPosition.x + this.position.x;
    const positionY = GameHelper.charterPosition.y + this.position.y + 25;
    if (
      this.position.x > positionX - this.size.w / 2 &&
      this.position.x < positionX + this.size.w / 2 &&
      this.position.y > positionY - this.size.h / 2 &&
      this.position.y < positionY + this.size.h / 2
    ) {
      GameHelper.charterPosition.add({
        x: -GameHelper.charterVelocity.x,
        y: -GameHelper.charterVelocity.y,
      });
    }
  }

  update() {
    this.checkCollisionBase();
  }

  draw() {
    this.ctx.drawImage(
      this.images,
      this.position.x - this.size.w / 2 - GameHelper.charterPosition.x,
      this.position.y - this.size.h / 2 - GameHelper.charterPosition.y,
      this.size.w,
      this.size.h
    );
  }
}
