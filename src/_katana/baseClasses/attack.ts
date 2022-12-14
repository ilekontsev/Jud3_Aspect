import { inRad } from '../shared/utils';
import { Vec2 } from '../shared/utils/vec2';
import { DeltaTime } from './../shared/utils/deltaTime';

export class BaseAttack {
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
    this.position.add(this.options.coordinates);
    this.ctx = ctx;
  }

  move() {
    const dt = this.deltaTime.get();

    this.position.add(this.velocity.multScalar(dt));
  }

  stop() {
    this.velocity.coordinates.x = 0;
    this.velocity.coordinates.y = 0;
  }

  cos() {
    let vx = Math.cos(this.options.angle) * this.options.attackSpeed;
    this.velocity.coordinates.x = vx * this.xvec;
  }

  sin() {
    let vy = Math.sin(this.options.angle) * this.options.attackSpeed;
    this.velocity.coordinates.y = vy * this.yvec;
  }

  calcX() {
    if (
      this.position.coordinates.x > window.innerWidth ||
      this.position.coordinates.x < 0
    ) {
      this.xvec = -this.xvec;
      this.cos();
      this.sin();
    }
  }

  calcY() {
    if (
      this.position.coordinates.y > window.innerHeight ||
      this.position.coordinates.y < 0
    ) {
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
