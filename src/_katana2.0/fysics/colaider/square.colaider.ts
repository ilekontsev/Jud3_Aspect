import { Vec2 } from 'src/_katana/main/vector/vec2';

export class SquareCollider {
  private ctx;
  private config;
  private objectConfig;
  private position = new Vec2({ x: 0, y: 0 });

  constructor(ctx, objectConfig, config) {
    this.ctx = ctx;
    this.config = config;
    this.objectConfig = objectConfig;
    this.setPosition(this.objectConfig.position);
    this.init();
  }

  setPosition(position): void {
    if (this.config.position) {
      const objPosition = {
        x: position.x + this.config.position.x * this.objectConfig.scale,
        y: position.y + this.config.position.y * this.objectConfig.scale,
      };
      this.position.set(objPosition);
      return;
    }
    this.position.set(position);
  }

  init(): void {}

  update(): void {}

  draw(): void {
    this.ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.config.size.w * this.objectConfig.scale,
      this.config.size.h * this.objectConfig.scale,
    );
  }
}
