import { Sprite } from 'src/_katana2.0/animations/Sprite';
import { CRYSTAL_IMG } from './crystal.assets';

export class Crystal {
  private ctx: CanvasRenderingContext2D;
  private size = {
    w: 10,
    h: 25,
  };
  private config = {
    position: { x: 0, y: 0 },
    scale: 3,
    images: {
      default: new Image(),
    },
    speed: 0.4,
    icon: 'default',
  };
  private Sprite: Sprite;

  constructor(ctx: CanvasRenderingContext2D, config) {
    this.ctx = ctx;
    this.config = { ...this.config, ...config, size: this.size };
    this.init();
  }

  init(): void {
    this.config.images.default.src = CRYSTAL_IMG;
    this.Sprite = new Sprite(this.ctx, this.config);
  }

  update(): void {
    this.Sprite.update();
  }
  draw(): void {
    this.Sprite.draw();
  }

  render(): void {
    this.update();
    this.draw();
  }
}
