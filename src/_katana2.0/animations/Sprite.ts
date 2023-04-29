export class Sprite {
  tickCount = 0;
  numberOfFrames = 4;
  ticksPerFrame = 40;
  frameIndex = 0;
  animationEnd = false;
  options;

  constructor(options) {
    this.options = options;
    this.ticksPerFrame *= options.speed;
    this.init();
  }

  init(): void {}

  update(): void {
    this.tickCount++;
    this.animationEnd = false;

    if (this.tickCount >= this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIndex <= this.numberOfFrames) {
        this.frameIndex++;

        if (this.frameIndex >= this.numberOfFrames) {
          this.frameIndex = 0;
          this.animationEnd = true;
        }
      }
    }
  }

  draw(): void {
    this.options.ctx.drawImage(
      this.options.images['up'],

      this.frameIndex * this.options.size.w,
      0,
      this.options.size.w,
      this.options.size.h,

      this.options.position.x,
      this.options.position.y,

      this.options.size.w * this.options.scale,
      this.options.size.h * this.options.scale,
    );
  }
}
