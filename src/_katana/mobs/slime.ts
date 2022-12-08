import { MOBS } from 'src/app/game/game-field-jud3/constants/path-presets';
import { BaseMobs } from './baseMobs';

export class Slime extends BaseMobs {
  imageSrc = MOBS.slime;
  configMob = {
    size: {
      w: 80,
      h: 25,
    },
    images: {},
  };
  constructor(ctx: CanvasRenderingContext2D, options) {
    super(ctx, options);
    this.init();
  }

  init() {
    this.loadedImage();
    this.setConfigMob(this.configMob);
  }

  loadedImage() {
    for (let key in this.imageSrc) {
      const image = new Image();
      image.src = this.imageSrc[key];
      this.configMob.images[key] = image;
    }
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.spriteMob.render(false);
    this.ctx.restore();
  }
}
