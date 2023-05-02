import { SquareCollider } from 'src/_katana2.0/fysics/colaider/square.colaider';
import { BASE_PLAYER_IMG } from './base-player.assets';
import { Crystal } from '../crystal/Crystal';

export class BasePlayer {
  private ctx: CanvasRenderingContext2D;
  private size = {
    w: 50,
    h: 45,
  };
  private configBase = {
    position: {
      x: 0,
      y: 0,
    },
    scale: 5,
  };
  private Collider: SquareCollider;
  public get collider() {
    return this.Collider;
  }

  private Crystal: Crystal;
  private image = new Image();

  constructor(ctx: CanvasRenderingContext2D, config) {
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;
    this.configBase = { ...this.configBase, ...config };
    this.configBase.position.x =
      this.configBase.position.x -
      (this.size.w * this.configBase.scale) / 2 +
      this.configBase.scale;
    this.configBase.position.y =
      this.configBase.position.y -
      (this.size.h * this.configBase.scale) / 2 +
      this.configBase.scale;
    this.init();
  }

  private init(): void {
    this.image.src = BASE_PLAYER_IMG;
    this.initCrystal();
    this.initCollider();
  }

  initCrystal(): void {
    const scale = (this.size.w / 2) * this.configBase.scale - 6 * this.configBase.scale;
    this.Crystal = new Crystal(this.ctx, {
      ...this.configBase,
      position: {
        x: this.configBase.position.x + scale,
        y: this.configBase.position.y,
      },
    });
  }

  initCollider(): void {
    this.Collider = new SquareCollider(this.ctx, this.configBase, {
      size: {
        w: this.size.w - 14,
        h: this.size.h - 20,
      },
      position: { x: 6, y: 4 },
      type: 'static'
    });
  }

  public update(): void {
    this.Collider.setPosition(this.configBase.position);
    this.Crystal.update();
  }

  public draw(): void {
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.size.w,
      this.size.h,
      this.configBase.position.x,
      this.configBase.position.y,
      this.size.w * this.configBase.scale,
      this.size.h * this.configBase.scale,
    );

    this.Collider.draw();
    this.Crystal.draw();
  }

  public render(): void {
    this.update();
    this.draw();
  }
}
