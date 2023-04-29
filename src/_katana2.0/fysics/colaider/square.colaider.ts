import { Vec2 } from 'src/_katana/main/vector/vec2';

export class SquareCollider {
  private options;
  positionObject = new Vec2({ x: 0, y: 0 });
  configCharter;
  constructor(options, configCharter) {
    this.options = options;
    this.configCharter = configCharter;
    this.positionObject.set(configCharter.position);
    this.init();
  }
  init(): void {}

  update(): void {}
  draw(): void {
    this.options.ctx.strokeRect(
      this.positionObject.x,
      this.positionObject.y,
      this.configCharter.size.w * this.configCharter.scale,
      this.configCharter.size.h * this.configCharter.scale,
    );
  }
}
