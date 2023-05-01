export class Camera {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  config = {
    position: {
      x: 0,
      y: 0,
    },
  };
  constructor(canvas, ctx, config) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.config = { ...this.config, ...config };
  }

  focus(map, player) {
    this.config.position.x = this.clamp(
      player.config.position.x -
        this.canvas.width / 2 +
        (player.config.size.w * player.config.scale) / 2,
      0,
      map.config.size.w * map.config.scale - this.canvas.width,
    );
    this.config.position.y = this.clamp(
      player.config.position.y -
        this.canvas.height / 2 +
        (player.config.size.h * player.config.scale) / 2,
      0,
      map.config.size.h * map.config.scale - this.canvas.height,
    );
  }

  clamp(coord, min, max) {
    if (coord < min) {
      return min;
    } else if (coord > max) {
      return max;
    } else {
      return coord;
    }
  }

  draw() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.translate(-this.config.position.x, -this.config.position.y);
  }
}
