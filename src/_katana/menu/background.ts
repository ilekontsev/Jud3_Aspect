import { Parallax } from './parallax';
import { MENU } from './../../app/game/game-field-jud3/constants/path-presets';
export class Background {
  ctx: CanvasRenderingContext2D;

  imageSrc = MENU.background;
  images = {};
  listParallax = [];
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.init();
  }

  init() {
    this.loadImage();
  }

  loadImage() {
    for (let key in this.imageSrc) {
      const image = new Image();
      image.src = this.imageSrc[key].src;
      this.images[key] = image;
      this.createParallax(image, this.imageSrc[key]);
    }
  }

  createParallax(image, options) {
    const parallax = new Parallax({
      ctx: this.ctx,
      image,
      size: options.size,
      position: options.position,
      speed: options.speed,
    });
    this.listParallax.push(parallax);
  }

  render() {}

  update() {}

  draw() {
    this.listParallax.forEach((item) => {
      item.render();
    });
  }
}
