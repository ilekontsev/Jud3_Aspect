import { BaseCharter } from '../baseClasses/base-charter';
import { Sprite } from '../baseClasses/sprite';
import { BaseCharterOptions } from '../shared/interfaces/optionCharter';

export class Varior extends BaseCharter {
  configCharter = {
    speed: 0.2,
    attack: 2,
    size: {
      w: 80,
      h: 25,
    },
  };

  sprite = new Sprite({
    ctx: this.ctx,
    width: this.configCharter.size.w,
    height: this.configCharter.size.h,
    src: 'assets/topdown_shooter/characters/1_diagdown.png',
  });

  constructor(
    canvas,
    ctx: CanvasRenderingContext2D,
    options: BaseCharterOptions
  ) {
    super(canvas, ctx, options);
    this.setConfigCharter(this.configCharter);
    this.init();
  }

  init() {}

  render() {
    this.pressKey();
    this.getImage();
  }

  getImage() {
    this.sprite.render(this.position);
    // this.ctx.drawImage(this.image, this.position.x, this.position.y, 50, 50);
  }
}
