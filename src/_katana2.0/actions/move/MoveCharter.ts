import { CONFIG } from './move-charter.config';
import { DeltaTime } from 'src/_katana/main/delta-time/deltaTime';
import { Vec2 } from 'src/_katana/main/vector/vec2';
import { BaseCharter } from 'src/_katana2.0/gameObject/charter/BaseCharter';

export class MoveCharter {
  public get isActive(): boolean {
    return Object.values(this.keys).some((item) => item);
  }

  public get charterPosition() {
    return this._charterPosition;
  }

  private canvas: HTMLCanvasElement;
  private keys = {};
  private deltaTime = new DeltaTime();
  private charter: BaseCharter;

  private callbackEvents: any;
  private callbackKeydown: any;
  private callbackKeyup: any;

  _charterPosition = new Vec2({ x: 0, y: 0 });
  _charterVelocity = new Vec2({ x: 0, y: 0 });

  constructor(canvas: HTMLCanvasElement, charter: BaseCharter) {
    this.canvas = canvas;
    this.charter = charter;
    this._charterPosition.set(charter.config.position);
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
    if (document.pointerLockElement === this.canvas) {
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
      this._charterVelocity.x = -this.charter.config.speed;
    }
    if (this.keys[CONFIG.right]) {
      this._charterVelocity.x = +this.charter.config.speed;
    }
    if (this.keys[CONFIG.up]) {
      this._charterVelocity.y = -this.charter.config.speed;
    }
    if (this.keys[CONFIG.down]) {
      this._charterVelocity.y = +this.charter.config.speed;
    }

    this.move();
  }

  move(): void {
    const dt = this.deltaTime.get();
    this.charter.config.position = this._charterPosition.get();
    this._charterPosition.add(this._charterVelocity.multScalar(dt));
    this.charter.isActiveAnimation = this.isActive;
  }
}
