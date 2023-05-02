import { SquareCollider } from 'src/_katana2.0/fysics/colaider/square.colaider';
import { BaseBullet } from '../BaseBullet';
import { CAT_BULLET_IMG } from './cat-bullet.assets';

export class CatBullet extends BaseBullet {
  private size = {
    w: 18,
    h: 14,
  };
  private configBullet = {
    speed: 0.8,
    position: {
      x: 0,
      y: 0,
    },
    scale: 2,
    images: {
      default: new Image(),
    },
    icon: 'default',
  };

  private Collider: SquareCollider;
  public get collider() {
    return this.Collider;
  }

  constructor(ctx: CanvasRenderingContext2D, config) {
    super(ctx);
    this.configBullet = { ...this.configBullet, ...config, size: this.size };
    this.init();
  }

  protected override init() {
    this.configBullet.images.default.src = CAT_BULLET_IMG;
    this.setConfig(this.configBullet);
    this.initCollider();
    super.init();
  }

  private initCollider() {
    this.Collider = new SquareCollider(this.ctx, this.configBullet, {
      size: {
        w: this.size.w - 4,
        h: this.size.h - 4,
      },
      position: {
        x: 2,
        y: 2,
      },
      type: 'dynamic',
    });
  }

  public override update() {
    super.update();
    this.Collider.setPosition(this._config.position);
  }

  public override draw() {
    super.draw();
    this.Collider.draw();
  }

  public render() {
    this.update();
    this.draw();
  }
}
