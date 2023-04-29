import { Vec2 } from 'src/_katana/main/vector/vec2';

export class SquareCollider {
  private ctx;
  private config;
  private position = new Vec2({ x: 0, y: 0 });

  constructor(ctx, objectPosition, config) {
    this.ctx = ctx;
    this.config = config;
    this.setPosition(objectPosition);
    this.init();
  }

  setPosition(position): void {
    if (this.config.position) {
      const objPosition = {
        x: position.x + this.config.position.x,
        y: position.y + this.config.position.y,
      };
      this.position.set(objPosition);
      return;
    }
    this.position.set(position);
  }

  init(): void {}

  update(): void {}

  draw(): void {
    this.ctx.strokeRect(this.position.x, this.position.y, this.config.size?.w, this.config.size?.h);
  }
}
