import { Projectile } from './../game/projectile';
import { DeltaTime } from './../shared/utils/deltaTime';
import { GameHelper } from './../game/gameHelper';
import { Vec2 } from 'src/_katana/shared/utils/vec2';
import { CONFIG } from '../config/moveConfig';
import { CatBullet } from './catBullet';
import { getAngleByCursor } from '../shared/utils';
export class BaseGun {
  options;
  canvas;
  ctx;
  velocity = new Vec2({ x: 0, y: 0 });
  keys = {};
  config;
  reflect = false;
  delay = 20;
  bullets = [];
  constructor(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = options.ctx;
  }

  setConfig(config) {
    this.config = config;
  }

  stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  pressKey() {
    this.stop();

    if (this.keys[CONFIG.attack]) {
      this.shot();
    }

    this.delay++;
    this.move();
  }

  shot() {
    if (this.delay >= 20) {
    this.delay = 0;
    const bullet = new CatBullet(this.ctx, {
      ...this.options,
      position: GameHelper.charterPosition,
      angle: getAngleByCursor(GameHelper.cursorPosition),
      ...this.config,
      attack: 0.7,
      reflect: this.reflect,
    });
    this.bullets.push(bullet);

    }
  }

  move() {

    this.bullets = this.bullets.filter(
      (bullet) => !bullet.checkPosition() && bullet.active
    );
    Projectile.bullets = this.bullets




  }
}
