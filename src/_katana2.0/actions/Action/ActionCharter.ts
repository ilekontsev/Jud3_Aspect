import { BaseCharter } from 'src/_katana2.0/gameObject/charter/BaseCharter';
import { CONFIG } from './action-charter.config';
import { CatBullet } from 'src/_katana2.0/gameObject/Bullet/CatBullet/CatBullet';

export class ActionCharter {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private charter: BaseCharter;

  private callbackEvents;
  private callbackKeyup;

  private gameObject;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    gameObject,
    charter: BaseCharter,
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.charter = charter;
    this.gameObject = gameObject;
    this.init();
  }

  private init(): void {
    this.setBindCallback();
    this.createPointerlockchange();
  }

  private setBindCallback(): void {
    this.callbackEvents = this.createEventSubscriptions.bind(this);
    this.callbackKeyup = this.updateKeyup.bind(this);
  }

  private createPointerlockchange(): void {
    this.callbackEvents();
    document.addEventListener('pointerlockchange', this.callbackEvents);
  }

  private createEventSubscriptions(): void {
    if (document.pointerLockElement === this.canvas) {
      document.addEventListener('keyup', this.callbackKeyup);
    } else {
      document.removeEventListener('keyup', this.callbackKeyup);
    }
  }

  private updateKeyup(event: KeyboardEvent): void {
    switch (event.code) {
      case CONFIG.attack:
        this.attack();
        break;
      case CONFIG.drop:
        console.log(2);
        break;
      case CONFIG.take:
        console.log(3);
        break;
    }
  }

  attack() {
    if (this.charter.objInHand) {
      const bullet = new CatBullet(this.ctx, { position: this.charter.config.position });
      this.gameObject.bullets.push(bullet);
    }
  }
}
