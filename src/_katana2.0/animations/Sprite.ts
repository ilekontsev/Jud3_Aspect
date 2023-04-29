export class Sprite {
  tickCount = 0;
  numberOfFrames = 4;
  ticksPerFrame = 40;
  frameIndex = 0;
  animationEnd = false;
  ctx;
  icon;
  reflect: boolean;
  config;

  constructor(ctx, config) {
    this.ctx = ctx;
    this.config = config;
    this.icon = config.icon;
    this.ticksPerFrame *= config.speed || 0;
    console.log(config)
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
    const calcPosition = this.reflect ? this.config.size.w * this.config.scale : 0;
    const reflect = this.reflect ? -1 : 1;
    this.ctx.save();
    this.ctx.scale(reflect, 1);

    this.ctx.drawImage(
      this.config.images[this.icon],

      this.frameIndex * this.config.size.w,
      0,
      this.config.size.w,
      this.config.size.h,

      this.config.position.x * reflect - calcPosition,
      this.config.position.y,

      this.config.size.w * this.config.scale,
      this.config.size.h * this.config.scale,
    );
    this.ctx.restore();
  }
}
