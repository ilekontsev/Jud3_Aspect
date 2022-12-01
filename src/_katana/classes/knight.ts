import { BaseCharter } from '../baseClasses/charter';

export class Knight extends BaseCharter {
  constructor(canvas, ctx, options) {
    super(canvas, ctx, options);
  }

  render() {
    this.moveKey();
    this.renderIcon();
  }

  renderIcon() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.beginPath();
    this.ctx.arc(
      this.position.coordinates.x + 10,
      this.position.coordinates.y + 10,
      10,
      0,
      Math.PI * 2
    );
    // this.ctx.lineTo(50, 50);
    this.ctx.closePath();
    this.ctx.stroke();
  }
}
