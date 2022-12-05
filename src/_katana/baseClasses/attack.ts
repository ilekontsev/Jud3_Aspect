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

  xangle = false;
  yangle = false;

  updateBulletTrajectory() {
    this.stop();

    if (
      this.position.coordinates.x >= window.innerWidth ||
      this.position.coordinates.y >= window.innerHeight ||
      this.position.coordinates.x <= 0 ||
      this.position.coordinates.y <= 0
    ) {
      this.options.attackSpeed = -this.options.attackSpeed;
      this.options.angle = -this.options.angle;
    }

    if (!this.xangle && !this.yangle) {
      let vx = Math.cos(this.options.angle) * this.options.attackSpeed;
      this.velocity.coordinates.x = vx;

      let vy = Math.sin(this.options.angle) * this.options.attackSpeed;
      this.velocity.coordinates.y = vy;
    }

    if (
      this.position.coordinates.y <= 10 ||
      this.position.coordinates.y >= window.innerHeight - 10 ||
      this.yangle
    ) {
      this.yangle = true;
      this.xangle = false;

      let vx = Math.sin(this.options.angle + 0.1) * this.options.attackSpeed;
      this.velocity.coordinates.x = vx;

      let vy = Math.cos(this.options.angle) * this.options.attackSpeed;
      this.velocity.coordinates.y = vy;
    } else {
      this.yangle = false;
      this.xangle = false;
    }

    if (
      this.position.coordinates.x <= 10 ||
      this.position.coordinates.x >= window.innerWidth - 10 ||
      this.xangle
    ) {
      this.yangle = false;
      this.xangle = true;
      let vx = Math.cos(this.options.angle) * this.options.attackSpeed;
      this.velocity.coordinates.x = vx;

      let vy = Math.sin(this.options.angle) * this.options.attackSpeed;
      this.velocity.coordinates.y = vy;
    }

    this.move();
  }
}
