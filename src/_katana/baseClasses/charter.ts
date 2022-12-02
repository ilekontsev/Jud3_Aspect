import { CONFIG } from '../config/moveConfig';
import { OptionsObject } from '../shared/interfaces/optionCharter';
import { Vec2 } from '../shared/utils/vec2';

export class BaseCharter {
  public position = new Vec2({ x: 0, y: 0 });
  public velocity = new Vec2({ x: 0, y: 0 });

  public options: OptionsObject;
  public ctx;
  public canvas;
  public keys = {};
  public lastFrame = 0;
  public mouse = {
    x: 0,
    y: 0,
  };
  constructor(canvas, ctx, options: OptionsObject) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.options = options;
    this.position.add(this.options.position);
  }

  move(dt) {
    this.position.add(this.velocity.multScalar(dt));
  }

  stop() {
    this.velocity.coordinates.x = 0;
    this.velocity.coordinates.y = 0;
  }

  key() {
    this.stop();

    if (this.keys[CONFIG.left]) {
      this.velocity.coordinates.x = -this.options.speed;
    }
    if (this.keys[CONFIG.right]) {
      this.velocity.coordinates.x = this.options.speed;
    }
    if (this.keys[CONFIG.up]) {
      this.velocity.coordinates.y = -this.options.speed;
    }
    if (this.keys[CONFIG.down]) {
      this.velocity.coordinates.y = +this.options.speed;
    }
    const dt = this.deltaTime();
    this.move(dt);
    this.calcAngle();
  }

  calcAngle() {
    this.ctx.save();

    this.ctx.restore();
  }

  gunRotation = 0;

  rotate() {
    this.gunRotation = Math.atan2(
      this.mouse.y - this.position.coordinates.y,
      this.mouse.x - this.position.coordinates.x
    );
  }

  inRad(num) {
    return (num * Math.PI) / 180;
  }

  deltaTime() {
    const currentFrame = +new Date();
    const dt = currentFrame - this.lastFrame;
    this.lastFrame = currentFrame;
    return dt;
  }
}
