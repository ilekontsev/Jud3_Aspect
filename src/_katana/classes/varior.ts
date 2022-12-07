import { BaseCharter } from '../baseClasses/base-charter';
import { BaseCharterOptions } from '../shared/interfaces/optionCharter';

export class Varior extends BaseCharter {
  configCharter = {
    speed: 0.3,
    attack: 0.4,
    size: {
      w: 80,
      h: 25,
    },
    image: {
      side: 'assets/topdown_shooter/characters/3_side.png',
      diagDown: 'assets/topdown_shooter/characters/3_diagdown.png',
      diagUp: 'assets/topdown_shooter/characters/3_diagup.png',
      south: 'assets/topdown_shooter/characters/3_south.png',
      north: 'assets/topdown_shooter/characters/3_north.png',
    },
  };

  constructor(
    canvas,
    ctx: CanvasRenderingContext2D,
    options: BaseCharterOptions
  ) {
    super(canvas, ctx, options);
    this.setConfigCharter(this.configCharter);
  }

  render() {
    this.draw();
  }

  draw() {
    this.rotate();
    this.sprite.render(this.reflect);
    this.gun.render(this.reflect);
  }
}
