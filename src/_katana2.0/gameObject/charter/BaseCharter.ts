import { checkAngleForIcon, getAngleByCursor } from 'src/_katana/shared/utils';
import { Sprite } from 'src/_katana2.0/animations/sprite';
import { Cursor } from 'src/_katana2.0/cursor/cursor';

export class BaseCharter {
  protected ctx: CanvasRenderingContext2D;
  protected _config;

  private Sprite: Sprite;
  private Cursor: Cursor;
  public get config() {
    return this._config;
  }

  constructor(ctx: CanvasRenderingContext2D, cursor) {
    this.ctx = ctx;
    this.Cursor = cursor;
  }

  protected setConfig(config) {
    this._config = config;
  }

  protected init(): void {
    this.Sprite = new Sprite(this.ctx, this.config);
  }

  private setIconByAngle(): void {
    const angle = getAngleByCursor(this.Cursor.cursorPosition, this.config.position.x, this.config.position.y);
    const obj = checkAngleForIcon(angle);
    this.Sprite.icon = obj.key;
    this.Sprite.reflect = obj.reflect;
  }

  protected draw(): void {
    this.Sprite.draw();
  }

  protected update(): void {
    this.setIconByAngle();
    // if (this.MoveCharter.isActive) {
    //   this.config.position = this.MoveCharter.charterPosition;
    this.Sprite.update();
    // }
  }
}
