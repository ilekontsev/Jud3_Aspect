import { PATH_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';

export class CannonGun {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  private ticksPerFrame = 12;
  private tickCount = 0;
  private frameIndex = 10;
  private x = 1;

  private images = {};
  private imageSrc = PATH_PRESETS.guns.canonGun;
  private selectedImage: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.loadImage();
  }

  loadImage() {
    for (let key in this.imageSrc) {
      const image = new Image();
      image.src = this.imageSrc[key];
      this.images[key] = image;
    }
  }

  setIcon(key: string) {
    this.selectedImage = this.images[key];
  }

  render() {
    this.update();
    this.draw();
  }

  update() {
    this.tickCount++;

    if (this.tickCount >= this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex -= this.x;
      this.x = -this.x;
    }
  }

  draw() {
    this.ctx.drawImage(
      this.selectedImage,
      0,
      0,
      20,
      20,
      0,
      -11 + this.frameIndex,
      12,
      12
    );
  }
}
