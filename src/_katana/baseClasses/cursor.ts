export class Cursor {
  ctx: CanvasRenderingContext2D;
  image = new Image();

  constructor(ctx) {
    this.ctx = ctx;
    this.image.src = 'assets/topdown_shooter/cursors/6crosshair.png';
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0);
    };
  }

  render(mouse) {
    this.draw(mouse);
  }

  draw(mouse) {
    this.ctx.drawImage(
      this.image,
      mouse.x,
      mouse.y,

    );
  }
}
