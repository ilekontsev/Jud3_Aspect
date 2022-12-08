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

  constructor(
    canvas,
    ctx: CanvasRenderingContext2D,
    options: BaseCharterOptions
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.options = options;
    this.position.add(options.position);
    this.cursor = new Cursor(this.ctx);
  }

  setConfigCharter(config) {
    this.config = config;

    this.gun = new CannonGun(this.canvas, this.ctx);

    this.sprite = new Sprite(this.canvas, {
      ctx: this.ctx,
      width: config.size.w,
      height: config.size.h,
      images: config.images,
      numberOfFrames: 5,
      ticksPerFrame: 12,
      scale: 2,
      position: this.position,
    });

    this.hpBar = new HpBarBase(this.ctx, this.position);
  }

  move() {
    const dt = this.deltaTime.get();

    this.position.add(this.velocity.multScalar(dt));

    this.bullets.forEach((item) => {
      item.render();
    });
  }

  stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  checkPosition() {
    checkPositionByField(this.position, window.innerWidth, window.innerHeight);

    this.bullets = this.bullets.filter((bullet) => !bullet.checkPosition());
  }

  update() {
    this.pressKey();
    this.configMouse();
    this.checkAngleForIcon();
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
    checkPositionByField(
      this.mouse,
      window.innerWidth - 20,
      window.innerHeight - 20
    );
    this.cursor.render(this.mouse);
    this.angle = Math.atan2(
      this.mouse.y - this.position.y,
      this.mouse.x - this.position.x
    );
  }
}
