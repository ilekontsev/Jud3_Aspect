import { PATH_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';
import { Base } from '../Base';
import { BaseCharterOptions } from 'src/_katana/shared/interfaces/optionCharter';
import { HUNTER_IMG } from './hunter.assets';
import { loadImages } from 'src/_katana2.0/shared/utils/image-loader.utils';
import { Sprite } from 'src/_katana2.0/animations/sprite';
import { MoveCharter } from 'src/_katana2.0/actions/move/MoveCharter';
import { SquareCollider } from 'src/_katana2.0/fysics/colaider/square.colaider';

export class Hunter {
  configCharter = {
    speed: 0.3,
    attack: 0.4,
    size: {
      w: 19,
      h: 24,
    },
    position: {
      x: 0,
      y: 0,
    },
    scale: 3,
  };
  private options;
  private images: Record<string, HTMLImageElement>;
  private sprite: Sprite;
  private moveCharter: MoveCharter;
  private collider: SquareCollider;

  constructor(options) {
    this.options = options;
    this.configCharter.position = this.options.position || this.configCharter.position;

    this.init();
  }

  private init(): void {
    this.images = loadImages(HUNTER_IMG);
    this.sprite = new Sprite({ ...this.options, ...this.configCharter, images: this.images });
    this.moveCharter = new MoveCharter(this.configCharter);
    this.collider = new SquareCollider(this.options, this.configCharter);
  }

  public update(): void {
    this.moveCharter.pressKey();
    if (this.moveCharter.isActive) {
      this.sprite.options.position = this.moveCharter.charterPosition;
      this.sprite.update();
      this.collider.positionObject = this.moveCharter.charterPosition;
    }
  }
  public draw(): void {
    this.sprite.draw();
    this.collider.draw();
  }

  public render(): void {
    this.update();
    this.draw();
  }
}
