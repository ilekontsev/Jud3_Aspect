import { BaseAttack } from './../baseClasses/baseAttack';

export class CatBullet extends BaseAttack {
  image = new Image();

  constructor(ctx: CanvasRenderingContext2D, options) {
    super(ctx, options);
    this.image.src = 'assets/topdown_shooter/other/cat.png';
  }

  render() {
    this.updateBulletTrajectory();
    this.draw();
  }

  draw() {
    this.ctx.save();

    // this.ctx.translate(this.position.x, this.position.y);
    this.ctx.rotate(this.options.angle);

    const x = this.options.reflect ? -1 : 1;

    this.ctx.scale(1, x);

    this.ctx.drawImage(this.image, 0, 0,);
    this.ctx.restore();
  }
}
