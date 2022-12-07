import { BaseAttack } from '../baseClasses/attack';

export class CatBullet extends BaseAttack {
  image = new Image();

  constructor(ctx, options) {
    super(ctx, options);
    this.image.src = 'assets/topdown_shooter/other/cat.png';
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0);
    };
  }

  render() {
    this.updateBulletTrajectory();
    this.draw();
  }

  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
