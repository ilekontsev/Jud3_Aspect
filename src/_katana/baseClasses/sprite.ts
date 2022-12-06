export class Sprite {
  image = new Image();
  ctx: CanvasRenderingContext2D;
  frameIndex = 0;
  tickCount = 0;
  numberOfFrames = 4;
  ticksPerFrame = 20;
  width: number;
  height: number;

  constructor(options) {
    this.ctx = options.ctx;
    this.image.src = options.src;
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0);
    };

    this.width = options.width;
    this.height = options.height;
  }

  render(position) {
    this.update();
    this.getIcon(position);
  }

  update() {
    this.tickCount++;

    if (this.tickCount >= this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIndex < this.numberOfFrames) {
        this.frameIndex++;
        if (this.frameIndex >= this.numberOfFrames) {
          this.frameIndex = 0;
        }
      }
    }
  }

  getIcon(position) {
    this.ctx.drawImage(
      this.image,
      (this.frameIndex * this.width) / this.numberOfFrames,
      0,
      this.width / this.numberOfFrames,
      this.height,
      position.x,
      position.y,
      this.width / this.numberOfFrames,
      this.height
    );
  }
}
