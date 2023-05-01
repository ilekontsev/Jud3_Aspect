import { checkAngleForIcon, getAngleByCursor } from 'src/_katana/shared/utils';
import { Sprite } from 'src/_katana2.0/animations/sprite';
import { Cursor } from 'src/_katana2.0/cursor/Cursor';

export class BaseCharter {
  protected ctx: CanvasRenderingContext2D;
  protected _config;

  public isActiveAnimation: boolean;

  private Sprite: Sprite;
  private Cursor: Cursor;
  private Obj;

  public get config() {
    return this._config;
  }

  public get objInHand() {
    return this.Obj;
  }

  constructor(ctx: CanvasRenderingContext2D, cursor: Cursor) {
    this.ctx = ctx;
    this.Cursor = cursor;
  }

  protected setConfig(config): void {
    this._config = config;
  }

  protected init(): void {
    this.Sprite = new Sprite(this.ctx, this.config);
  }

  public takeInHand(obj): void {
    this.Obj = obj;
  }

  private setIconByAngle(camera): void {
    const x = this.Cursor.cursorPosition.x + camera.x;
    const y = this.Cursor.cursorPosition.y + camera.y;

    const x2 = this.config.position.x;
    const y2 = this.config.position.y;

    const angle = getAngleByCursor({ x, y }, x2, y2);
    const obj = checkAngleForIcon(angle);
    this.Sprite.icon = obj.key;
    this.Sprite.reflect = obj.reflect;
    this.Obj?.updateSpriteConfig(this.config, obj);
  }

  protected draw(): void {
    switch (this.Sprite.icon) {
      case 'up':
      case 'diagUp':
        this.Obj?.draw();
        this.Sprite.draw();
        break;
      default:
        this.Sprite.draw();
        this.Obj?.draw();
    }
  }

  protected update(camera): void {
    this.setIconByAngle(camera);
    if (this.isActiveAnimation) {
      this.Sprite.update();
      this.Obj.update();
    }
  }
}
