import { DeltaTime } from './../shared/utils/deltaTime';
import { Vec2 } from '../shared/utils/vec2';
import { CONFIG } from '../config/moveConfig';
import { Sprite } from '../baseClasses/sprite';
import { GameHelper } from '../game/gameHelper';
import { checkAngleForIcon, getAngleByCursor } from '../shared/utils';

export class Base {
  public options;
  protected sprite: Sprite;
  protected ctx: CanvasRenderingContext2D;
  protected canvas: HTMLCanvasElement;
  protected reflect = false;

  private velocity = new Vec2({ x: 0, y: 0 });
  private keys = {};
  private deltaTime = new DeltaTime();
  private config;

  callbackEvents;
  callbackKeydown;
  callbackKeyup;

  constructor(options) {
    this.options = options;
    this.ctx = options.ctx;
    this.canvas = options.canvas;
    this.callbackEvents = this.createEventSubscriptions.bind(this);
    this.callbackKeydown = this.updateKeydown.bind(this);
    this.callbackKeyup = this.updateKeyup.bind(this);
    this.createPointerlockchange();
  }

  createPointerlockchange() {
    document.addEventListener('pointerlockchange', this.callbackEvents);
  }

  createEventSubscriptions() {
    if (document.pointerLockElement === this.canvas) {
      document.addEventListener('keydown', this.callbackKeydown);
      document.addEventListener('keyup', this.callbackKeyup);
    } else {
      document.removeEventListener('keydown', this.callbackKeydown);
      document.removeEventListener('keyup', this.callbackKeyup);
    }
  }

  destroy() {
    document.removeEventListener('keydown', this.callbackKeydown);
    document.removeEventListener('keyup', this.callbackKeyup);
    document.removeEventListener('pointerlockchange', this.callbackEvents);
  }

  updateKeydown(event) {
    this.keys[event.code] = true;
  }

  updateKeyup(event) {
    this.keys[event.code] = false;
  }

  setConfigCharter(config) {
    this.config = config;

    this.sprite = new Sprite({
      ctx: this.ctx,
      width: config.size.w,
      height: config.size.h,
      images: config.images,
      scale: {
        x: 3,
        y: 3,
      },
      position: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
      numberOfFrames: 5,
      ticksPerFrame: 12,
    });
    this.sprite.setIcon({ key: 'down', reflect: false });
  }

  update() {
    this.pressKey();
    this.setIconByAngle();
  }

  setIconByAngle() {
    const angle = getAngleByCursor(GameHelper.cursorPosition);
    const obj = checkAngleForIcon(angle);

    this.sprite.setIcon(obj);
  }

  stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
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

    this.move();
  }

  move() {
    const dt = this.deltaTime.get();
    GameHelper.charterPosition.add(this.velocity.multScalar(dt));
    console.log(GameHelper.charterPosition);
  }
}
