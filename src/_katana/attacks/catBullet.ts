import { Game } from '../game/game';
import { GameHelper } from '../game/gameHelper';
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
    // this.ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
    // this.ctx.rotate(this.options.angle);
    // this.ctx.translate(-window.innerWidth / 2, -window.innerHeight / 2);
    const x = this.options.reflect ? -1 : 1;

    this.ctx.scale(x, 1);
    this.ctx.drawImage(
      this.image,
      (window.innerWidth / 2 + this.position.x - GameHelper.charterPosition.x) *
        x,
      window.innerHeight / 2 + this.position.y - GameHelper.charterPosition.y
    );
    this.ctx.restore();
  }
}
