import { BASE_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';

export class HpBarBase {
  ctx: CanvasRenderingContext2D;
  selectedImage: HTMLImageElement;
  imageSrc = BASE_PRESETS.hpBar;
  images = [];
  count = 0;

  constructor(ctx: CanvasRenderingContext2D, position) {
    this.ctx = ctx;
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

  draw(position) {
    this.ctx.drawImage(this.selectedImage, position.x - 30, position.y - 35);
  }
}
