export class Sprite {
  images = {};
  ctx: CanvasRenderingContext2D;
  frameIndex = 0;
  tickCount = 0;
  numberOfFrames = 4;
  ticksPerFrame = 12;
  width: number;
  height: number;
  scale: 1;
  canvas: HTMLCanvasElement;
  selectedImage: any;

  constructor(options) {
    this.ctx = options.ctx;
    this.numberOfFrames = options.numberOfFrames;
    this.ticksPerFrame = options.ticksPerFrame;
    this.scale = options.scale;
    this.width = options.width;
    this.height = options.height;
    this.images = options.images;
    this.selectedImage = this.images['up'];
  }

  setIcon(key) {
    this.selectedImage = this.images[key];
  }

  render(reflect) {
    this.update();
    this.draw(reflect);
  }

  update() {
    this.tickCount++;

    if (this.tickCount >= this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
        if (this.frameIndex >= this.numberOfFrames - 1) {
          this.frameIndex = 0;
        }
      }
    }
  }

  draw(reflect) {
    const x = reflect ? -1 : 1;
    this.ctx.scale(this.scale * x, this.scale);

    this.ctx.transform(1, 0, 0, 1, 0, 0);
    this.ctx.drawImage(
      this.selectedImage,
      (this.frameIndex * this.width) / this.numberOfFrames,
      0,
      this.width / this.numberOfFrames,
      this.height,
      -8,
      -10,
      this.width / this.numberOfFrames,
      this.height
    );
  }
}
