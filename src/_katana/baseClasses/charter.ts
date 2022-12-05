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

    this.checkUnusedBullets();

    this.move();
  }

  updateBullets() {
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].active && this.bullets[i].render();
      const dt = +new Date() - this.bullets[i].createdBullet;
      if (dt > 200) {
        this.checkHitPoint(this.bullets[i]);
      }
    }
  }

  checkUnusedBullets() {
    if (this.bullets.length < 10) {
      return;
    }
    this.bullets = this.bullets.filter((item) => {
      if (
        !(
          !item.active ||
          item.position.coordinates.x > window.innerWidth + 100 ||
          item.position.coordinates.x < -100 ||
          item.position.coordinates.y > window.innerHeight + 100 ||
          item.position.coordinates.y < -100
        )
      ) {
        return item;
      }
    });
  }

  checkHitPoint(item) {
    const xBullet = Math.round(item.position.coordinates.x);
    const yBullet = Math.round(item.position.coordinates.y);

    const xCharter = Math.round(this.position.coordinates.x);
    const yCharter = Math.round(this.position.coordinates.y);

    const leftBulletX = Math.round(xBullet) - 5;
    const rightBulletX = Math.round(xBullet) + 5;

    const leftCharterX = Math.round(xCharter) - 10;
    const rightCharterX = Math.round(xCharter) + 10;

    const topBulletY = Math.round(yBullet) - 5;
    const bottomBulletY = Math.round(yBullet) + 5;

    const bottomCharterY = Math.round(yCharter) + 10;
    const topCharterY = Math.round(yCharter) - 10;

    const checkLeft = leftBulletX <= rightCharterX;
    const checkRight = rightBulletX >= leftCharterX;
    const checkTop = topBulletY >= topCharterY;
    const checkBottom = bottomBulletY <= bottomCharterY;

    if (checkLeft && checkRight && checkTop && checkBottom) {
      item.active = false;
    }
  }

  delay = 60;

  shot() {
    if (this.delay >= 20) {
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
