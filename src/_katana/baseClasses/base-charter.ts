import { CannonGun } from './canonGun';
import { Cursor } from './cursor';
import { CONFIG } from '../config/moveConfig';
import { BaseCharterOptions } from '../shared/interfaces/optionCharter';
import { checkPositionByField, inRad } from '../shared/utils';
import { DeltaTime } from '../shared/utils/deltaTime';
import { Vec2 } from '../shared/utils/vec2';
import { Sprite } from './sprite';

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
  cursor: Cursor;
  public deltaTime = new DeltaTime();

  private config;

  sprite: Sprite;
  gun: CannonGun;

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
    this.sprite = new Sprite(this.canvas, {
      ctx: this.ctx,
      width: config.size.w,
      height: config.size.h,
      numberOfFrames: 5,
      ticksPerFrame: 12,
      scale: 2,
    });

    this.gun = new CannonGun(this.canvas, this.ctx);
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
    if (this.position.x + 40 > window.innerWidth) {
      this.position.x = window.innerWidth - 40;
    }
    if (this.position.x < 0) {
      this.position.x = 0;
    }

    if (this.position.y + this.config.size.h + 30 > window.innerHeight) {
      this.position.y = window.innerHeight - this.config.size.h - 30;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
    }
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
    if (angle < -10 && angle > -60) {
      this.reflect = false;
      this.sprite.setIcon(this.config.image.diagUp);
      this.gun.setIcon('diagUp')
    }

    if (angle < -120 && angle > -150) {
      this.reflect = true;
      this.sprite.setIcon(this.config.image.diagUp);
      this.gun.setIcon('diagUp')

    }

    //diag down
    if (angle > 30 && angle < 60) {
      this.reflect = false;
      this.sprite.setIcon(this.config.image.diagDown);
      this.gun.setIcon('diagDown')

    }

    if (angle < 160 && angle > 120) {
      this.reflect = true;
      this.sprite.setIcon(this.config.image.diagDown);
      this.gun.setIcon('diagDown')

    }

    //left
    if (angle > -10 && angle < 30) {
      this.reflect = false;
      this.sprite.setIcon(this.config.image.side);
      this.gun.setIcon('side')

    }
    //right
    if (angle > 150 || angle < -150) {
      this.reflect = true;
      this.sprite.setIcon(this.config.image.side);
      this.gun.setIcon('side')

    }
    //up
    if (angle > -120 && angle < -60) {
      this.reflect = false;
      this.sprite.setIcon(this.config.image.north);
      this.gun.setIcon('up')

    }

    //down
    if (angle > 60 && angle < 120) {
      this.reflect = false;
      this.sprite.setIcon(this.config.image.south);
      this.gun.setIcon('down')

    }
  }

  testAngle = 0;

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

  ticksPerFrame = 12;
  tickCount = 0;

  test() {
    this.tickCount++;

    if (this.tickCount >= this.ticksPerFrame) {
      this.tickCount = 0;
      // this.testAngle += 1;
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

  rotate() {
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    // this.ctx.rotate(this.angle);
  }
}
