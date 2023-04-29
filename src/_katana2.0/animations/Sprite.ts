export class Sprite {
  tickCount = 0;
  numberOfFrames = 4;
  ticksPerFrame = 3;
  frameIndex = 0;
  animationEnd = false;
  options;

  constructor(options) {
    this.options = options;
    this.ticksPerFrame /= options.speed;
    this.init();
  }

  init(): void {}

  update(): void {
    this.tickCount++;
    this.animationEnd = false;
    if (this.tickCount >= this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
        if (this.frameIndex >= this.numberOfFrames - 1) {
          this.frameIndex = 0;
          this.animationEnd = true;
        }
      }
    }
  }

  draw(): void {
    this.options.ctx.drawImage(
      this.options.images['down'],
      (this.frameIndex * this.options.size.w) / this.numberOfFrames,
      0,
      this.options.size.w / this.numberOfFrames,
      this.options.size.h,

      this.options.position.x,
      this.options.position.y,

      this.options.scale.w / this.numberOfFrames,
      this.options.scale.h,
    );
  }
}
