export class Base {
  options;
  ctx: CanvasRenderingContext2D;

  constructor(ctx, options) {
    this.ctx = ctx;
    this.options = options;
  }
}
