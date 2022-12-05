import { Coordinates } from './../shared/utils/interfaces';
import { DeltaTime } from './../shared/utils/deltaTime';
import { Bullet } from './../attacks/bullet';
import { CONFIG } from '../config/moveConfig';
import { OptionsObject } from '../shared/interfaces/optionCharter';
import { Vec2 } from '../shared/utils/vec2';

export class BaseCharter {
  public position = new Vec2({ x: 0, y: 0 });
  public velocity = new Vec2({ x: 0, y: 0 });
  public deltaTime = new DeltaTime();

  public options: OptionsObject;
  public ctx;
  public canvas;
  public keys = {};
  public mouse = {
    x: 0,
    y: 0,
  };
  public bullets = [];

  constructor(canvas, ctx, options: OptionsObject) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.options = options;

    this.position.add(this.options.position);
    this.checkPosition();
  }

  checkPosition() {
    if (this.position.coordinates.x + 10 >= window.innerWidth) {
      this.position.coordinates.x = window.innerWidth - 10;
    }
    if (this.position.coordinates.x <= 0 + 10) {
      this.position.coordinates.x = 10;
    }

    if (this.position.coordinates.y + 10 >= window.innerHeight) {
      this.position.coordinates.y = window.innerHeight - 10;
    }
    if (this.position.coordinates.y <= 0 + 10) {
      this.position.coordinates.y = 10;
    }
  }

  move() {
    const dt = this.deltaTime.get();

    this.checkPosition();
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
      this.velocity.coordinates.x = +this.options.speed;
    }
    if (this.keys[CONFIG.up]) {
      this.velocity.coordinates.y = -this.options.speed;
    }
    if (this.keys[CONFIG.down]) {
      this.velocity.coordinates.y = +this.options.speed;
    }
    if (this.keys[CONFIG.attack]) {
      this.shot();
    }
    this.delay++;

    this.updateBullets();
    this.move();
  }

  updateBullets() {
    this.bullets.forEach((item) => {
      this.checkHitPoint(item);

      item.render();
    });
  }sa

  checkHitPoint(item) {
    const xBullet = Math.trunc(item.position.coordinates.x);
    const yBullet = Math.trunc(item.position.coordinates.y);

    const xCharter = Math.trunc(this.position.coordinates.x);
    const yCharter = Math.trunc(this.position.coordinates.y);



  }

  delay = 60;

  shot() {
    if (this.delay >= 0) {
      this.delay = 0;
      this.bullets.push(
        new Bullet(this.ctx, { ...this.options, ...this.position })
      );
    }
  }

  calcAngle() {
    this.options.angle = Math.atan2(
      this.mouse.y - this.position.coordinates.y,
      this.mouse.x - this.position.coordinates.x
    );
  }

  rotate() {
    this.ctx.translate(
      this.position.coordinates.x,
      this.position.coordinates.y
    );
    this.ctx.rotate(this.options.angle);

    this.ctx.translate(
      -this.position.coordinates.x - 5,
      -this.position.coordinates.y - 5
    );
  }
}
