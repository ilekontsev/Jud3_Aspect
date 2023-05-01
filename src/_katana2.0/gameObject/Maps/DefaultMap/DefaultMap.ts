import { DEFAULT_MAP_IMG } from './default-map.assets';

export class DefaultMap {
  private ctx: CanvasRenderingContext2D;
   config = {
    position: {
      x: 0,
      y: 0,
    },
    size: {
      w:  2048,
      h: 2000,
    },
    scale: 1,
  };
  public offset: {
    x: 0;
    y: 0;
  };
  private image = new Image();

  constructor(ctx: CanvasRenderingContext2D, config) {
    this.ctx = ctx;
    this.config = { ...this.config, ...config };
    this.init();
  }

  init(): void {
    this.image.src = DEFAULT_MAP_IMG;
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
      this.config.position.y ,
      this.config.size.w * this.config.scale,
      this.config.size.h * this.config.scale,
    );
  }

  render(): void {
    this.update();
    this.draw();
  }
}
