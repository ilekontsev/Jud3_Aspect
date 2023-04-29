import { checkAngleForIcon, getAngleByCursor } from 'src/_katana/shared/utils';
import { MoveCharter } from 'src/_katana2.0/actions/move/MoveCharter';
import { Sprite } from 'src/_katana2.0/animations/sprite';
import { CharterOptions } from 'src/_katana2.0/shared/utils/interfaces/options';
import { CharterConfig } from './charter-config.interface';

export class BaseCharter {
  protected options: CharterOptions;
  protected MoveCharter: MoveCharter;

  private config: CharterConfig;
  private Sprite: Sprite;

  public get position() {
    return this.MoveCharter.charterPosition;
  }

  constructor(options: CharterOptions) {
    this.options = options;
  }

  protected setConfig(configCharter: CharterConfig): void {
    this.config = configCharter;
  }

  protected init(): void {
    this.Sprite = new Sprite(this.options.ctx, this.config);
    this.MoveCharter = new MoveCharter(this.options, this.config);
  }

  private setIconByAngle(): void {
    const angle = getAngleByCursor(
      this.options.cursor.cursorPosition,
      this.MoveCharter.charterPosition.x,
      this.MoveCharter.charterPosition.y,
    );
    const obj = checkAngleForIcon(angle);
    this.Sprite.icon = obj.key;
    this.Sprite.reflect = obj.reflect;
  }

  protected draw(): void {
    this.Sprite.draw();
  }

  protected update(): void {
    this.MoveCharter.pressKey();
    this.setIconByAngle();
    if (this.MoveCharter.isActive) {
      this.config.position = this.MoveCharter.charterPosition;
      this.Sprite.update();
    }
  }
}
