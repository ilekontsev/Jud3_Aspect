import { BaseCharter } from '../baseClasses/charter';

export class Knight extends BaseCharter {
  constructor(canvas, ctx, options) {
    super(canvas, ctx, options);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }

  renderIcon() {
    this.ctx.fillRect(20, 20, 10, 10);

    this.ctx.save();

    this.ctx.translate(
      this.position.coordinates.x,
      this.position.coordinates.y
    );

    this.ctx.rotate(this.gunRotation + 20);

    this.ctx.translate(
      -this.position.coordinates.x,
      -this.position.coordinates.y
    );

    this.ctx.fillRect(
      this.position.coordinates.x,
      this.position.coordinates.y,
      10,
      10
    );
    this.ctx.beginPath();

    this.ctx.moveTo(
      this.position.coordinates.x + 10,
      this.position.coordinates.y
    );
    this.ctx.lineTo(
      this.position.coordinates.x + 10,
      this.position.coordinates.y - 20
    );

    this.ctx.stroke();
    this.ctx.restore();
  }
}
