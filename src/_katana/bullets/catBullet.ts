import { GameHelper } from "src/_katana/game/gameHelper";
import { BaseAttack } from "./baseAttack";


export class CatBullet extends BaseAttack {
  image = new Image();

  size = {
    w: 20,
    h: 50,
  };

  constructor(ctx: CanvasRenderingContext2D, options) {
    super(ctx, options);
    this.image.src = 'assets/topdown_shooter/other/cat.png';
  }

  update() {
    this.updateBulletTrajectory();
  }

  draw() {
    this.ctx.save();

    const x = this.options.reflect ? -1 : 1;

    this.ctx.scale(x, 1);

    this.ctx.drawImage(
      this.image,
      (window.innerWidth / 2 + this.position.x - GameHelper.charterPosition.x) *
        x,
      window.innerHeight / 2 + this.position.y - GameHelper.charterPosition.y,
      20,
      25
    );
    this.ctx.restore();
  }
}
