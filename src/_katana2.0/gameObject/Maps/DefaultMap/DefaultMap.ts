import { SquareCollider } from 'src/_katana2.0/fysics/colaider/square.colaider';
import { DEFAULT_MAP_IMG } from './default-map.assets';

export class DefaultMap {
  private ctx: CanvasRenderingContext2D;
  config = {
    position: {
      x: 0,
      y: 0,
    },
    size: {
      w: 2048,
      h: 2000,
    },
    scale: 1,
  };
  public offset: {
    x: 0;
    y: 0;
  };
  private image = new Image();

  private Collider: SquareCollider[] = [];
  public get collider() {
    return this.Collider;
  }

  constructor(ctx: CanvasRenderingContext2D, config) {
    this.ctx = ctx;
    this.config = { ...this.config, ...config };
    this.init();
  }

  init(): void {
    this.image.src = DEFAULT_MAP_IMG;
    this.initCollider();
  }

  initCollider() {
    const colliderLeft = new SquareCollider(this.ctx, this.config, {
      position: { x: 0, y: 0 },
      size: { w: 8, h: this.config.size.h },
      type: 'static',
    });
    const colliderUp = new SquareCollider(this.ctx, this.config, {
      position: {
        x: 0,
        y: 0,
      },
      size: { w: this.config.size.w, h: 40 },
      type: 'static',
    });
    const colliderDown = new SquareCollider(this.ctx, this.config, {
      position: {
        x: 0,
        y: this.config.size.h - 16,
      },
      size: { w: this.config.size.w, h: 20 },
      type: 'static',
    });
    const colliderRight = new SquareCollider(this.ctx, this.config, {
      position: {
        x: this.config.size.w - 8,
        y: 0,
      },
      size: { w: 8, h: this.config.size.h },
      type: 'static',
    });

    this.Collider.push(colliderLeft, colliderUp, colliderDown, colliderRight);
  }

  update(): void {}

  draw(): void {
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.config.size.w,
      this.config.size.h,
      this.config.position.x,
      this.config.position.y,
      this.config.size.w * this.config.scale,
      this.config.size.h * this.config.scale,
    );
    this.Collider.forEach((collider) => collider.draw());
  }

  render(): void {
    this.update();
    this.draw();
  }
}
