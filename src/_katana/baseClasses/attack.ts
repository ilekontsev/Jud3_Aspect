import { inRad } from '../shared/utils';
import { Vec2 } from '../shared/utils/vec2';
import { DeltaTime } from './../shared/utils/deltaTime';

export class BaseAttack {
  public position = new Vec2({ x: 0, y: 0 });
  public velocity = new Vec2({ x: 0, y: 0 });

  options;
  ctx;
  deltaTime = new DeltaTime();

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

  xangle = 0;
  yangle = 0;

  updateBulletTrajectory() {
    this.stop();

    this.xangle = this.options.angle;
    this.yangle = this.options.angle;

    if (
      this.position.coordinates.x >= window.innerWidth ||
      this.position.coordinates.y >= window.innerHeight ||
      this.position.coordinates.x <= 0 ||
      this.position.coordinates.y <= 0
    ) {
      this.options.attackSpeed = -this.options.attackSpeed;
      this.options.angle = -this.options.angle;
    }



    let vx = Math.cos( this.options.angle) * this.options.attackSpeed;
    let vy = Math.sin(this.yangle) * this.options.attackSpeed;
    this.velocity.coordinates.x = vx;
    this.velocity.coordinates.y = vy;

    this.move();
  }
}
