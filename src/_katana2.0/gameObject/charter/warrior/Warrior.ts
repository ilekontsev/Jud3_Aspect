import { BaseCharter } from '../BaseCharter';
import { WARRIOR_IMG } from './warrior.assets';
import { loadImages } from 'src/_katana2.0/shared/utils/image-loader.utils';
import { SquareCollider } from 'src/_katana2.0/fysics/colaider/square.colaider';

export class Warrior extends BaseCharter {
  private size = {
    w: 16,
    h: 22,
  };
  private configCharter = {
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
    this.configCharter = { ...this.configCharter, ...config };
    this.configCharter.position.x =
      this.configCharter.position.x - (this.size.w * this.configCharter.scale) / 2;
    this.configCharter.position.y =
      this.configCharter.position.y - (this.size.h * this.configCharter.scale) / 2;
    this.init();
  }

  protected override init(): void {
    this.configCharter.images = loadImages(WARRIOR_IMG);
    this.initCollider();
    this.setConfig({ ...this.configCharter, size: this.size });
    super.init();
  }

  initCollider(): void {
    this.Collider = new SquareCollider(this.ctx, this.configCharter, {
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

  public override update(camera): void {
    super.update(camera);
    this.Collider.setPosition(this.config.position);
  }

  public override draw(): void {
    super.draw();
    this.Collider.draw();
  }

  public render(camera): void {
    this.update(camera);
    this.draw();
  }
}
