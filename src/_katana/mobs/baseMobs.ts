import { GameHelper } from './../game/gameHelper';
import { HpBarBase } from '../baseClasses/hpBarBase';
import { Sprite } from '../baseClasses/sprite';
import { Position } from '../shared/interfaces/optionCharter';
import { DeltaTime } from '../shared/utils/deltaTime';
import { Vec2 } from '../shared/utils/vec2';

export class BaseMobs {
  ctx: CanvasRenderingContext2D;

  position = new Vec2({ x: 0, y: 0 });
  velocity = new Vec2({ x: 0, y: 0 });

  options;

  objectOptions;

  sprite: Sprite;
  config;
  deltaTime = new DeltaTime();

  public hpBar: HpBarBase;
  active = true;

  constructor(options) {
    this.ctx = options.ctx;
    this.options = options;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    this.position.add({ x, y });
    this.objectOptions = options.objectOptions;
  }

  setConfigMob(config) {
    this.config = config;

    this.sprite = new Sprite({
      ctx: this.ctx,
      width: config.size.w,
      height: config.size.h,
      images: config.images,
      numberOfFrames: 5,
      ticksPerFrame: 12,
      scale: {
        x: 2,
        y: 2,
      },
      position: {
        x: this.position.x - GameHelper.charterPosition.x,
        y: this.position.y - GameHelper.charterPosition.y,
      },
    });
    this.sprite.setIcon({ key: 'up', reflect: false });

    this.hpBar = new HpBarBase({
      ...this.options,
      position: {
        x: this.position.x - 30 - GameHelper.charterPosition.x,
        y: this.position.y - 40 - GameHelper.charterPosition.y,
      },
    });
  }

  update() {
    this.updateTrajectory();
    this.hpBar.position = {
      x: this.position.x - 30 - GameHelper.charterPosition.x,
      y: this.position.y - 40 - GameHelper.charterPosition.y,
    };
  }

  stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }
  activateDie = false;
  updateTrajectory() {
    this.stop();

    if (this.objectOptions.x + this.objectOptions.w / 2 <= this.position.x) {
      this.velocity.x = -this.config.speed;
    } else {
      this.velocity.x = this.config.speed;
    }

    if (this.objectOptions.y + this.objectOptions.h / 2 <= this.position.y) {
      this.velocity.y = -this.config.speed;
    } else {
      this.velocity.y = this.config.speed;
    }

    if (
      (this.objectOptions.x - this.objectOptions.w / 2 < this.position.x &&
        this.objectOptions.x + this.objectOptions.w / 2 > this.position.x - 5 &&
        this.objectOptions.y - this.objectOptions.h / 2 < this.position.y &&
        this.objectOptions.y + this.objectOptions.h / 2 > this.position.y) ||
      this.activateDie
    ) {
      this.activateDie = true;
      this.stop();
      this.sprite.position.set({
        x: this.position.x - GameHelper.charterPosition.x,
        y: this.position.y - GameHelper.charterPosition.y,
      });
      this.sprite.setIcon({ key: 'die', reflect: false });
      this.sprite.numberOfFrames = 8;
      this.sprite.width = 300;
      this.sprite.height = 50;
      this.sprite.position.y =
        this.position.y - GameHelper.charterPosition.y - 50;
      this.sprite.position.x =
        this.position.x - GameHelper.charterPosition.x - 20;
      if (this.sprite.animationEnd) {
        this.active = false;
      }
    } else {
      this.move();
    }
  }

  move() {
    const dt = this.deltaTime.get();

    this.position.add(this.velocity.multScalar(dt));
    this.sprite.position.set({
      x: this.position.x - GameHelper.charterPosition.x,
      y: this.position.y - GameHelper.charterPosition.y,
    });
  }
}
