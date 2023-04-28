import { GameHelper } from 'src/_katana/game/gameHelper';
import { DeltaTime } from '../../delta-time/deltaTime';
import { CONFIG } from './moveConfig';
import { BaseCharterOptions, ConfigCharter } from 'src/_katana/shared/interfaces/optionCharter';

export class MoveCharter {
  private keys = {};
  private deltaTime = new DeltaTime();
  private canvas: HTMLCanvasElement;
  private configCharter: ConfigCharter;

  private callbackEvents: any;
  private callbackKeydown: any;
  private callbackKeyup: any;

  constructor(options: BaseCharterOptions) {
    this.canvas = options.canvas;
    this.configCharter = options.configCharter;
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
    GameHelper.charterVelocity.x = 0;
    GameHelper.charterVelocity.y = 0;
  }

  pressKey(): void {
    this.stop();

    if (this.keys[CONFIG.left]) {
      GameHelper.charterVelocity.x = -this.configCharter.speed;
    }
    if (this.keys[CONFIG.right]) {
      GameHelper.charterVelocity.x = +this.configCharter.speed;
    }
    if (this.keys[CONFIG.up]) {
      GameHelper.charterVelocity.y = -this.configCharter.speed;
    }
    if (this.keys[CONFIG.down]) {
      GameHelper.charterVelocity.y = +this.configCharter.speed;
    }

    this.move();
  }

  move(): void {
    const dt = this.deltaTime.get();
    GameHelper.charterPosition.add(GameHelper.charterVelocity.multScalar(dt));
  }
}
