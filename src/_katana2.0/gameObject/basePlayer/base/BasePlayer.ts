import { Vec2 } from 'src/_katana/main/vector/vec2';
import { SquareCollider } from 'src/_katana2.0/fysics/colaider/square.colaider';
import { IBasePlayer } from 'src/_katana2.0/shared/utils/interfaces/options';
import { Base } from './Base';
import { BASE_PLAYER_IMG } from './base-player.assets';
import { Crystal } from '../crystal/Crystal';

export class BasePlayer extends Base {
  private config = {
    position: new Vec2({ x: 0, y: 0 }),
    size: {
      w: 50,
      h: 45,
    },
    scale: 5,
  };

  private Collider = new SquareCollider(this.options.ctx, this.config.position, {
    position: {
      x: 30,
      y: 25,
    },
    size: {
      w: 180,
      h: 200,
    },
  });
  private Crystal: Crystal;
  private image = new Image();

  constructor(options: IBasePlayer) {
    super(options);
    this.options = options;
    this.config.position.set(this.options.position);
    this.init();
  }

  private init(): void {
    this.image.src = BASE_PLAYER_IMG;
    this.Crystal = new Crystal({
      ...this.options,
      position: { x: this.config.size.w + 55, y: this.config.position.y + 30 },
    });
  }

  public update(): void {
    this.Collider.setPosition(this.config.position);
    this.Crystal.update();
  }

  public draw(): void {
    this.options.ctx.drawImage(
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

    this.Collider.draw();
    this.Crystal.draw();
  }

  public render(): void {
    this.update();
    this.draw();
  }
}
