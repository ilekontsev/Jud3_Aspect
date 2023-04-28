import { Ricochet } from "./Rickoshet";

export class Bullet extends Ricochet {
  constructor(ctx, options) {
    super(ctx, options);
  }

  render() {
    this.updateBulletTrajectory();
    this.renderIcon();
  }

  renderIcon() {
    // this.ctx.drawImage(
    //   this.image,
    //   this.position.coordinates.x + 50,
    //   this.position.coordinates.y + 50,
    //   50,
    //   50
    // );

    this.ctx.beginPath();

    this.ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    this.ctx.stroke();
  }
}
