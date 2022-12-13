import { HpBarBase } from '../baseClasses/hpBarBase';
import { Sprite } from '../baseClasses/sprite';
import { PositionObject } from '../shared/interfaces/optionCharter';
import { DeltaTime } from '../shared/utils/deltaTime';
import { Vec2 } from '../shared/utils/vec2';

export class BaseMobs {
  ctx: CanvasRenderingContext2D;

  position = new Vec2({ x: 0, y: 0 });
  velocity = new Vec2({ x: 0, y: 0 });

  positionCharter: PositionObject;
  spriteMob: Sprite;
  config;
  deltaTime = new DeltaTime();
  angle;
  speed = 0.03;
  public hpBar: HpBarBase;
  active = true;

  constructor(options) {
    this.ctx = options.ctx;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    this.position.add({ x, y });
  }

  setConfigMob(config) {
    this.config = config;
    this.spriteMob = new Sprite({
      ctx: this.ctx,
      width: config.size.w,
      height: config.size.h,
      images: config.images,
      numberOfFrames: 5,
      ticksPerFrame: 12,
      scale: {
        x: 1,
        y: 1,
      },
      position: {
        x: this.position.x,
        y: this.position.y,
      },
    });

    this.spriteMob.setIcon('up');
    // this.hpBar = new HpBarBase(this.ctx, this.position);
  }

  setConfig(options) {
    this.angle = options.angle;
    this.positionCharter = options.position;
    this.update();
  }

  update() {
    this.updateTrajectory();
  }

  move() {
    const dt = this.deltaTime.get();

    this.position.add(this.velocity.multScalar(dt));
    this.spriteMob.position.set(this.position);
  }

  stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  updateTrajectory() {
    this.stop();

    if (Math.round(this.positionCharter.x) <= Math.round(this.position.x)) {
      this.velocity.x = -this.speed;
    } else {
      this.velocity.x = this.speed;
    }

    if (Math.round(this.positionCharter.y) <= Math.round(this.position.y)) {
      this.velocity.y = -this.speed;
    } else {
      this.velocity.y = this.speed;
    }

    this.move();
  }
}
