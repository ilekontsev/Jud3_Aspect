import { GameHelper } from 'src/_katana/game/gameHelper';
import { CONFIG } from './moveConfig';
import { BaseCharterOptions, ConfigCharter } from 'src/_katana/shared/interfaces/optionCharter';
import { DeltaTime } from 'src/_katana/main/delta-time/deltaTime';
import { Vec2 } from 'src/_katana/main/vector/vec2';

export class MoveCharter {
  public get isActive(): boolean {
    return Object.values(this.keys).some((item) => item);
  }
  private keys = {};
  private deltaTime = new DeltaTime();
  private configCharter: ConfigCharter;

  private callbackEvents: any;
  private callbackKeydown: any;
  private callbackKeyup: any;

  private _charterPosition = new Vec2({ x: 0, y: 0 });
  private _charterVelocity = new Vec2({ x: 0, y: 0 });
  options;
  public get charterPosition() {
    return this._charterPosition;
  }

  constructor(options, configCharter) {
    this.options = options;
    this.configCharter = configCharter;
    this._charterPosition.set(this.configCharter.position);
    this.init();
  }

  init(): void {
    this.setBindCallback();
    this.createPointerlockchange();
  }

  destroy(): void {
    document.removeEventListener('keydown', this.callbackKeydown);
    document.removeEventListener('keyup', this.callbackKeyup);
    document.removeEventListener('pointerlockchange', this.callbackEvents);
  }

  //подписки
  private setBindCallback(): void {
    this.callbackEvents = this.createEventSubscriptions.bind(this);
    this.callbackKeydown = this.updateKeydown.bind(this);
    this.callbackKeyup = this.updateKeyup.bind(this);
  }

  private createPointerlockchange(): void {
    this.callbackEvents();
    document.addEventListener('pointerlockchange', this.callbackEvents);
  }

  private createEventSubscriptions(): void {
    if (document.pointerLockElement === this.options.canvas) {
      document.addEventListener('keydown', this.callbackKeydown);
      document.addEventListener('keyup', this.callbackKeyup);
    } else {
      document.removeEventListener('keydown', this.callbackKeydown);
      document.removeEventListener('keyup', this.callbackKeyup);
    }
  }

  //движение
  updateKeydown(event: KeyboardEvent): void {
    this.keys[event.code] = true;
  }

  updateKeyup(event: KeyboardEvent): void {
    this.keys[event.code] = false;
  }

  stop(): void {
    this._charterVelocity.x = 0;
    this._charterVelocity.y = 0;
  }

  pressKey(): void {
    this.stop();

    if (this.keys[CONFIG.left]) {
      this._charterVelocity.x = -this.configCharter.speed;
    }
    if (this.keys[CONFIG.right]) {
      this._charterVelocity.x = +this.configCharter.speed;
    }
    if (this.keys[CONFIG.up]) {
      this._charterVelocity.y = -this.configCharter.speed;
    }
    if (this.keys[CONFIG.down]) {
      this._charterVelocity.y = +this.configCharter.speed;
    }

    this.move();
  }

  move(): void {
    const dt = this.deltaTime.get();
    this._charterPosition.add(this._charterVelocity.multScalar(dt));
  }
}
