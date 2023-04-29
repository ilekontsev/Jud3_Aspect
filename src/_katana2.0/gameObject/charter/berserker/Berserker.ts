import { loadImages } from 'src/_katana2.0/shared/utils/image-loader.utils';
import { BERSERKER_IMG } from './berserker.assets';
import { Sprite } from 'src/_katana2.0/animations/sprite';
import { MoveCharter } from 'src/_katana2.0/actions/move/MoveCharter';
import { SquareCollider } from 'src/_katana2.0/fysics/colaider/square.colaider';

export class Berserker {
  public configCharter = {
    speed: 0.3,
    attack: 0.4,
    size: {
      w: 20,
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
    this.moveCharter = new MoveCharter(this.configCharter);

    this.init();
  }

  private init(): void {
    this.images = loadImages(BERSERKER_IMG);
    this.sprite = new Sprite({ ...this.options, ...this.configCharter, images: this.images });
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
