import { BaseCharter } from '../baseClasses/charter';

export class Knight extends BaseCharter {
  constructor(canvas, ctx, options) {
    super(canvas, ctx, options);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }

  render() {
    this.key();
    this.renderIcon();
    this.calcAngle();
  }

  renderIcon() {
    this.rotate();

    this.ctx.beginPath();

    this.ctx.fillRect(
      this.position.coordinates.x,
      this.position.coordinates.y,
      10,
      10
    );
    this.ctx.moveTo(
      this.position.coordinates.x + 30,
      this.position.coordinates.y + 10
    );
    this.ctx.lineTo(
      this.position.coordinates.x,
      this.position.coordinates.y + 10
    );

    this.ctx.stroke();
  }
}
