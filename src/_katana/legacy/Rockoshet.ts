import { Vec2 } from '../main/vector/vec2';
import { DeltaTime } from '../main/delta-time/deltaTime';

export class Ricochet {
  public position = new Vec2({ x: 0, y: 0 });
  public velocity = new Vec2({ x: 0, y: 0 });

  public active = true;

  options;
  ctx;
  deltaTime = new DeltaTime();
  createdBullet = +new Date();
  xvec = 1;
  yvec = 1;

  constructor(ctx, options) {
    this.options = { ...options };
    this.position.add(this.options.position);
    this.ctx = ctx;
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
    this.velocity.x = vx * this.xvec;
  }

  sin() {
    let vy = Math.sin(this.options.angle) * this.options.attack;
    this.velocity.y = vy * this.yvec;
  }

  calcX() {
    if (this.position.x > window.innerWidth || this.position.x < 0) {
      this.xvec = -this.xvec;
      this.cos();
      this.sin();
    }
  }

  calcY() {
    if (this.position.y > window.innerHeight || this.position.y < 0) {
      this.yvec = -this.yvec;
      this.cos();
      this.sin();
    }
  }

  updateBulletTrajectory() {
    this.stop();

    this.cos();
    this.sin();

    this.calcX();
    this.calcY();

    this.move();
  }
}
