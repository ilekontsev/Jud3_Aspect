import { BaseCharter } from '../BaseCharter';
import { WARRIOR_IMG } from './warrior.assets';
import { loadImages } from 'src/_katana2.0/shared/utils/image-loader.utils';
import { SquareCollider } from 'src/_katana2.0/fysics/colaider/square.colaider';

export class Warrior extends BaseCharter {
  private size = {
    w: 16,
    h: 22,
  };
  private defaultConfigCharter = {
    speed: 0.3,
    attack: 0.4,

    position: {
      x: 0,
      y: 0,
    },
    scale: 3,

    icon: 'down',
    images: {},
  };

  private Collider: SquareCollider;

  constructor(ctx: CanvasRenderingContext2D, config, cursor) {
    super(ctx, cursor);
    this.defaultConfigCharter = { ...this.defaultConfigCharter, ...config };
    this.defaultConfigCharter.position.x =
      this.defaultConfigCharter.position.x - (this.size.w * this.defaultConfigCharter.scale) / 2;
    this.defaultConfigCharter.position.y =
      this.defaultConfigCharter.position.y - (this.size.h * this.defaultConfigCharter.scale) / 2;
    this.init();
  }

  protected override init(): void {
    this.defaultConfigCharter.images = loadImages(WARRIOR_IMG);
    this.initCollider();
    this.setConfig({ ...this.defaultConfigCharter, size: this.size });
    super.init();
  }

  initCollider(): void {
    this.Collider = new SquareCollider(this.ctx, this.defaultConfigCharter, {
      size: {
        w: this.size.w - 4,
        h: this.size.h,
      },
      position: {
        x: 2,
        y: 0,
      },
    });
  }

  public override update(): void {
    super.update();
    this.Collider.setPosition(this.config.position);
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
