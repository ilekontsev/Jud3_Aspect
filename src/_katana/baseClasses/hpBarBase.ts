import { BASE_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';

export class HpBarBase {
  options;
  ctx: CanvasRenderingContext2D;
  selectedImage: HTMLImageElement;
  imageSrc = BASE_PRESETS.hpBar;
  images = [];
  count = 0;

  constructor(options) {
    this.options = options;
    this.ctx = options.ctx;
    this.loadImage();
  }

  loadImage() {
    this.imageSrc.forEach((src) => {
      const image = new Image();
      image.src = src;
      this.images.push(image);
    });
    this.selectedImage = this.images[this.count];
  }

  setIcon(index?: number) {
    this.count += index || 1;
    if (this.count > 8) {
      this.count = 8;
    }
    if (this.count < 0) {
      this.count = 0;
    }
    this.selectedImage = this.images[this.count];
  }

  update() {}

  draw() {
    this.ctx.drawImage(
      this.selectedImage,
      window.innerWidth / 2 - 30,
      window.innerHeight / 2 - 40
    );
  }
}
