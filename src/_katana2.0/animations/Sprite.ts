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
  offset = 0;
  isOffset: boolean;

  constructor(ctx, config, isOffset?: boolean) {
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;
    this.config = config;
    this.icon = config.icon;
    this.isOffset = isOffset;
    this.ticksPerFrame *= config.speed || 1;
    this.init();
  }

  set speedAnimation(speed) {
    this.ticksPerFrame = 40;
    this.ticksPerFrame *= speed;
  }

  init(): void {}

  update(): void {
    this.tickCount++;
    this.animationEnd = false;

    if (this.tickCount >= this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.isOffset) {
        this.offset = -this.offset - 2;
        this.numberOfFrames = 0;
      }

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
      this.config.position.y + this.offset,

      this.config.size.w * this.config.scale,
      this.config.size.h * this.config.scale,
    );
    this.ctx.restore();
  }
}
