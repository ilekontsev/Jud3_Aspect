import { checkAngleForIcon, getAngleByCursor } from 'src/_katana/shared/utils';
import { Sprite } from 'src/_katana2.0/animations/sprite';

export class BaseGun {
  protected options;
  private Sprite: Sprite;
  private config;

  public set position(position) {
    if (!position) {
      return;
    }
    const valueX = this.Sprite.reflect ? 0 : 12;
    const valueY = 30;
    this.config.position.set({ x: position.x + valueX, y: position.y + valueY });
  }

  constructor(options) {
    this.options = options;
  }

  setConfig(config): void {
    this.config = config;
  }

  protected init(): void {
    this.Sprite = new Sprite(this.options.ctx, this.config);
  }

  private setIconByAngle(): void {
    const angle = getAngleByCursor(
      this.options.cursor.cursorPosition,
      this.config.position.x  - (this.Sprite.reflect ? 0 : 12),
      this.config.position.y - 30,
    );
    const obj = checkAngleForIcon(angle);
    this.Sprite.icon = obj.key;
    this.Sprite.reflect = obj.reflect;
  }

  public update(): void {
    this.setIconByAngle();
  }

  public draw(): void {
    this.Sprite.draw();
  }
}
