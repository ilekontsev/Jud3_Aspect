import { CannonGun } from './canonGun';
import { Cursor } from './cursor';
import { CONFIG } from '../config/moveConfig';
import { BaseCharterOptions } from '../shared/interfaces/optionCharter';
import { checkPositionByField, inRad } from '../shared/utils';
import { DeltaTime } from '../shared/utils/deltaTime';
import { Vec2 } from '../shared/utils/vec2';
import { Sprite } from './sprite';
import { CatBullet } from '../attacks/catBullet';
import { HpBarBase } from './hpBarBase';
import { Slime } from '../mobs/slime';

export class BaseCharter {
  public velocity = new Vec2({ x: 0, y: 0 });
  public position = new Vec2({ x: 0, y: 0 });
  public keys = {};
  public mouse = {
    x: 0,
    y: 0,
  };
  public angle = 0;
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  protected options: BaseCharterOptions;
  public deltaTime = new DeltaTime();

  private config;

  public sprite: Sprite;
  public gun: CannonGun;
  public cursor: Cursor;
  public hpBar: HpBarBase;
  public mobs: Slime[] = [];

  constructor(options: BaseCharterOptions) {
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.options = options;
    this.position.set(options.position);
    this.cursor = new Cursor(this.options);
    this.createEventSubscriptions();
  }

  createEventSubscriptions() {
    document.addEventListener('keydown', (event) => {
      this.keys[event.code] = true;
    });

    document.addEventListener('keyup', (event) => {
      this.keys[event.code] = false;
    });
  }

  setConfigCharter(config) {
    this.config = config;

    this.gun = new CannonGun(this.options);

    this.sprite = new Sprite({
      ctx: this.ctx,
      width: config.size.w,
      height: config.size.h,
      images: config.images,
      scale: {
        x: 2,
        y: 2,
      },
      position: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
      numberOfFrames: 5,
      ticksPerFrame: 12,
    });

    this.hpBar = new HpBarBase(this.ctx, this.position);
  }

  createMobs() {
    const mob = new Slime({ ...this.options, angle: this.angle });
    this.mobs.push(mob);
  }

  move() {
    const dt = this.deltaTime.get();

    this.position.add(this.velocity.multScalar(dt));
    this.sprite.position.set(this.position);

    this.mobs.forEach((mob) => {
      mob.setConfig({ position: this.position, angle: this.angle });
    });

    this.bullets.forEach((item) => {
      item.render();
    });
  }

  collisionDetection() {
    const xCharter = Math.round(this.position.x);
    const yCharter = Math.round(this.position.y);
    const leftCharterX = Math.round(xCharter) - 20;
    const rightCharterX = Math.round(xCharter) + 20;
    const bottomCharterY = Math.round(yCharter) + 80;
    const topCharterY = Math.round(yCharter) - 80;

    this.mobs.forEach((mob) => {
      const positionMob = mob.position;

      const xMob = Math.round(positionMob.x);
      const yMob = Math.round(positionMob.y);

      const leftMobX = Math.round(xMob) - 20;
      const rightMobX = Math.round(xMob) + 20;

      const bottomMobY = Math.round(yMob) + 40;
      const topMobY = Math.round(yMob) - 40;

      const checkLeft = leftMobX <= rightCharterX;
      const checkRight = rightMobX >= leftCharterX;
      const checkTop = topMobY >= topCharterY;
      const checkBottom = bottomMobY <= bottomCharterY;

      if (checkLeft && checkRight && checkTop && checkBottom) {
        mob.active = false;

        this.hpBar.setIcon();
      }

      this.bullets.forEach((bullet) => {
        const positionBullet = bullet.position;

        const xBullet = Math.round(positionBullet.x);
        const yBullet = Math.round(positionBullet.y);

        const leftBulletX = Math.round(xBullet) - 5;
        const rightBulletX = Math.round(xBullet) + 5;

        const topBulletY = Math.round(yBullet) - 5;
        const bottomBulletY = Math.round(yBullet) + 5;

        const checkLeft = leftBulletX <= rightMobX;
        const checkRight = rightBulletX >= leftMobX;
        const checkTop = topBulletY >= topMobY;
        const checkBottom = bottomBulletY <= bottomMobY;

        if (checkLeft && checkRight && checkTop && checkBottom) {
          bullet.active = false;
          mob.hpBar.setIcon();
        }
      });
    });
  }

  stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  checkPosition() {
    checkPositionByField(this.position, window.innerWidth, window.innerHeight);

    this.bullets = this.bullets.filter(
      (bullet) => !bullet.checkPosition() && bullet.active
    );

    this.mobs = this.mobs.filter((mob) => mob.hpBar.count !== 8 && mob.active);
    if (this.mobs.length < 10) {
      this.createMobs();
    }
  }

  update() {
    this.pressKey();
    this.configMouse();
    this.checkAngleForIcon();
    this.collisionDetection();
  }

  reflect = false;

  checkAngleForIcon() {
    const angle = inRad(this.angle);

    //diag up
    if (angle < -10 && angle > -80) {
      this.reflect = false;
      this.sprite.setIcon('diagUp');
      this.gun.setIcon('diagUp');
    }

    if (angle < -100 && angle > -170) {
      this.reflect = true;
      this.sprite.setIcon('diagUp');
      this.gun.setIcon('diagUp');
    }

    //diag down
    if (angle > 10 && angle < 80) {
      this.reflect = false;
      this.sprite.setIcon('diagDown');
      this.gun.setIcon('diagDown');
    }

    if (angle < 170 && angle > 100) {
      this.reflect = true;
      this.sprite.setIcon('diagDown');
      this.gun.setIcon('diagDown');
    }

    //left
    if (angle > -10 && angle < 10) {
      this.reflect = false;
      this.sprite.setIcon('side');
      this.gun.setIcon('side');
    }
    //right
    if (angle > 170 || angle < -170) {
      this.reflect = true;
      this.sprite.setIcon('side');
      this.gun.setIcon('side');
    }
    //up
    if (angle > -100 && angle < -80) {
      this.reflect = false;
      this.gun.setIcon('up');
      this.sprite.setIcon('up');
    }

    //down
    if (angle > 80 && angle < 100) {
      this.reflect = false;
      this.sprite.setIcon('down');
      this.gun.setIcon('down');
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
    if (this.keys[CONFIG.attack]) {
      this.shot();
    }
    this.delay++;
    this.checkPosition();
    this.move();
  }

  bullets = [];
  delay = 30;

  shot() {
    if (this.delay > 30) {
      this.delay = 0;
      const bullet = new CatBullet(this.ctx, {
        ...this.options,
        position: this.position,
        angle: this.angle,
        ...this.config,
        reflect: this.reflect,
      });
      this.bullets.push(bullet);
    }
  }

  configMouse() {
    // this.mouse = this.cursor.mouse;
    this.cursor.draw();
    this.angle = Math.atan2(
      this.mouse.y - this.position.y,
      this.mouse.x - this.position.x
    );
  }
}
