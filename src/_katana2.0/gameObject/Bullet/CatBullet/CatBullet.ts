import { SquareCollider } from 'src/_katana2.0/fysics/colaider/square.colaider';
import { BaseBullet } from '../BaseBullet';
import { CAT_BULLET_IMG } from './cat-bullet.assets';

export class CatBullet extends BaseBullet {
  private size = {
    w: 18,
    h: 14,
  };
  private configBullet = {
    speed: 0.3,
    position: {
      x: 0,
      y: 0,
    },
    scale: 2,
    images: {
      default: new Image(),
    },
    icon: 'default'

  };

  private Collider: SquareCollider;

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

  private initCollider() {}

  public override update() {
    super.update();
  }

  public override draw() {
    super.draw();
  }

  public render() {
    this.update();
    this.draw();
  }
}
