import { GameHelper } from '../game/gameHelper';
import { DeltaTime } from '../main/delta-time/deltaTime';
import { Vec2 } from '../main/vector/vec2';
export class BaseAttack {
  ctx: CanvasRenderingContext2D;
  options: any;
  position = new Vec2({ x: 0, y: 0 });
  velocity = new Vec2({ x: 0, y: 0 });

  deltaTime = new DeltaTime();
  active = true;
  constructor(ctx: CanvasRenderingContext2D, options: any) {
    this.ctx = ctx;
    this.options = options;
    this.position.set(GameHelper.charterPosition);
  }

  move() {
    const dt = this.deltaTime.get();
    this.position.add(this.velocity.multScalar(dt));
  }

  stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  cos() {
    let vx = Math.cos(this.options.angle) * this.options.attack;
    this.velocity.x = vx;
  }

  sin() {
    let vy = Math.sin(this.options.angle) * this.options.attack;
    this.velocity.y = vy;
  }

  checkPosition() {
    return (
      this.position.x > GameHelper.charterPosition.x + window.innerWidth / 2 ||
      this.position.x < GameHelper.charterPosition.x - window.innerWidth / 2 ||
      this.position.y >  GameHelper.charterPosition.y + window.innerHeight / 2 ||
      this.position.y <  GameHelper.charterPosition.y - window.innerHeight / 2
    );
  }

  updateBulletTrajectory() {
    this.stop();

    this.cos();
    this.sin();

    this.move();
  }
}
