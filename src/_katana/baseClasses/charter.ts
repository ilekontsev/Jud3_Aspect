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
    if (this.position.x + 10 >= window.innerWidth) {
      this.position.x = window.innerWidth - 10;
    }
    if (this.position.x <= 0 + 10) {
      this.position.x = 10;
    }

    if (this.position.y + 10 >= window.innerHeight) {
      this.position.y = window.innerHeight - 10;
    }
    if (this.position.y <= 0 + 10) {
      this.position.y = 10;
    }
  }

  move() {
    const dt = this.deltaTime.get();

    this.checkPosition();
    this.position.add(this.velocity.multScalar(dt));
  }

  stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  key() {
    this.stop();

    if (this.keys[CONFIG.left]) {
      this.velocity.x = -this.options.speed;
    }
    if (this.keys[CONFIG.right]) {
      this.velocity.x = +this.options.speed;
    }
    if (this.keys[CONFIG.up]) {
      this.velocity.y = -this.options.speed;
    }
    if (this.keys[CONFIG.down]) {
      this.velocity.y = +this.options.speed;
    }
    if (this.keys[CONFIG.attack]) {
      this.shot();
    }
    this.delay++;
    // if (!this.gameOver) {
    this.updateBullets();
    // }

    this.checkUnusedBullets();

    this.move();
  }

  updateBullets() {
    for (let item of this.bullets) {
      item.active && item.render();
      const dt = +new Date() - item.createdBullet;
      if (dt > 200) {
        this.checkHitPoint(item);
      }
    }
  }

  checkUnusedBullets() {
    if (!this.bullets.length) {
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
  gameOver;
  checkHitPoint(item) {
    const xBullet = Math.round(item.position.coordinates.x);
    const yBullet = Math.round(item.position.coordinates.y);

    const xCharter = Math.round(this.position.x);
    const yCharter = Math.round(this.position.y);

    const leftBulletX = Math.round(xBullet) - 5;
    const rightBulletX = Math.round(xBullet) + 5;

    const leftCharterX = Math.round(xCharter) - 20;
    const rightCharterX = Math.round(xCharter) + 20;

    const topBulletY = Math.round(yBullet) - 5;
    const bottomBulletY = Math.round(yBullet) + 5;

    const bottomCharterY = Math.round(yCharter) + 40;
    const topCharterY = Math.round(yCharter) - 40;

    const checkLeft = leftBulletX <= rightCharterX;
    const checkRight = rightBulletX >= leftCharterX;
    const checkTop = topBulletY >= topCharterY;
    const checkBottom = bottomBulletY <= bottomCharterY;

    if (checkLeft && checkRight && checkTop && checkBottom) {
      item.active = false;
      this.gameOver = true;
    }
  }

  delay = 60;

  shot() {
    if (this.delay >= 30) {
      this.delay = 0;
      this.bullets.push(
        new Bullet(this.ctx, { ...this.options, ...this.position })
      );
    }
  }

  calcAngle() {
    this.options.angle = Math.atan2(
      this.mouse.y - this.position.y,
      this.mouse.x - this.position.x
    );
  }

  rotate() {
    this.ctx.translate(this.position.x + 30, this.position.y);
    this.ctx.rotate(this.options.angle + 1.5);

    this.ctx.translate(-this.position.x - 5, -this.position.y - 5);
  }
}
