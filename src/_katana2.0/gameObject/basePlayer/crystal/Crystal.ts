import { Vec2 } from 'src/_katana/main/vector/vec2';
import { Sprite } from 'src/_katana2.0/animations/sprite';
import { CRYSTAL_IMG } from './crystal.assets';

export class Crystal {
  private config = {
    position: new Vec2({ x: 0, y: 0 }),
    size: {
      w: 10,
      h: 25,
    },
    scale: 3,
    images: {
      default: new Image(),
    },
    speed: 0.3,
    icon: 'default',
  };
  private options;
  private Sprite: Sprite;

  constructor(options) {
    this.options = options;
    this.config.position.set(options.position)
    this.init();
  }

  init(): void {
    this.config.images.default.src = CRYSTAL_IMG;
    this.Sprite = new Sprite(this.options.ctx, this.config);
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
