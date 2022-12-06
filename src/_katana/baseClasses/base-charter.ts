import { CONFIG } from '../config/moveConfig';
import { BaseCharterOptions } from '../shared/interfaces/optionCharter';
import { DeltaTime } from '../shared/utils/deltaTime';
import { Vec2 } from '../shared/utils/vec2';

export class BaseCharter {
  velocity = new Vec2({ x: 0, y: 0 });
  position = new Vec2({ x: 0, y: 0 });
  public keys = {};
  canvas;
  ctx;
  options;
  deltaTime = new DeltaTime();
  config;
  constructor(
    canvas,
    ctx: CanvasRenderingContext2D,
    options: BaseCharterOptions
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.options = options;
    this.position.add(options.position);
  }

  setConfigCharter(config) {
    this.config = config;
  }

  move() {
    const dt = this.deltaTime.get();

    this.position.add(this.velocity.multScalar(dt));
  }

  stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  checkPosition() {
    if (this.position.x + 20 > window.innerWidth) {
      this.position.x = window.innerWidth - 20;
    }
    if (this.position.x < 0) {
      this.position.x = 0;
    }

    if (this.position.y + this.config.size.h > window.innerHeight) {
      this.position.y = window.innerHeight - this.config.size.h;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
    }
  }

  pressKey() {
    this.stop();

    if (this.keys[CONFIG.left]) {
      this.velocity.x = -this.config.speed;
    }
    if (this.keys[CONFIG.right]) {
      this.velocity.x = +this.config.speed;
    }
    if (this.keys[CONFIG.up]) {
      this.velocity.y = -this.config.speed;
    }
    if (this.keys[CONFIG.down]) {
      this.velocity.y = +this.config.speed;
    }

    this.checkPosition();
    this.move();
  }
}
