import { HUNTER_IMG } from './hunter.assets';
import { loadImages } from 'src/_katana2.0/shared/utils/image-loader.utils';
import { SquareCollider } from 'src/_katana2.0/fysics/colaider/square.colaider';
import { BaseCharter } from '../BaseCharter';
import { CharterOptions } from 'src/_katana2.0/shared/utils/interfaces/options';

export class Hunter extends BaseCharter {
  private configCharter = {
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
    images: {},
  };

  private Collider = new SquareCollider(this.options.ctx, this.configCharter.position, {
    position: { x: 5, y: 5 },
    size: { w: 48, h: 66 },
  });

  constructor(options: CharterOptions) {
    super(options);
    this.configCharter.position = options.position || this.configCharter.position;
    this.init();
  }

  protected override init(): void {
    this.configCharter.images = loadImages(HUNTER_IMG);
    this.setConfig(this.configCharter);
    super.init();
  }

  public override update(): void {
    super.update();
    this.Collider.setPosition(this.MoveCharter.charterPosition);
  }

  public override draw(): void {
    super.draw();
    this.Collider.draw();
  }

  public render(): void {
    this.update();
    this.draw();
  }
}
