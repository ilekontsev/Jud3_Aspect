import { Sprite } from 'src/_katana2.0/animations/sprite';

export class BaseGun {
  private ctx: CanvasRenderingContext2D;

  private _config;

  private Sprite: Sprite;

  public get type() {
    return this._config.type;
  }

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  protected init(): void {
    this.Sprite = new Sprite(this.ctx, this._config, true);
  }

  setConfig(config): void {
    this._config = config;
  }

  public updateSpriteConfig(config, obj) {
    let offsetX = 0;
    let offsetY = 0;

    switch (obj.key) {
      case 'up':
        offsetX = 0;
        offsetY = -22;
        break;
      case 'down':
        offsetX = 18;
        offsetY = 18;
        break;
      case 'side':
        offsetX = obj.reflect ? -30 : 40;
        offsetY = 20;
        break;
      case 'diagUp':
        offsetX = obj.reflect ? -28 : 28;
        offsetY = 0;
        break;
      case 'diagDown':
        offsetX = obj.reflect ? -24 : 30;
        offsetY = 24;
        break;
    }

    this.Sprite.speedAnimation = config.speed;

    this._config.position.x =
      config.position.x +
      (config.size.w * config.scale) / 2 -
      (this._config.size.w * this._config.scale) / 2 +
      offsetX;

    this._config.position.y =
      config.position.y +
      (config.size.h * config.scale) / 2 -
      (this._config.size.h * this._config.scale) / 2 +
      offsetY;

    this.Sprite.icon = obj.key;
    this.Sprite.reflect = obj.reflect;
  }

  public update(): void {
    this.Sprite.update();
  }

  public draw(): void {
    this.Sprite.draw();
  }
}
