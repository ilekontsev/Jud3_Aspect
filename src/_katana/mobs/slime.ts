import { MOBS } from 'src/app/game/game-field-jud3/constants/path-presets';
import { BaseMobs } from './baseMobs';

export class Slime extends BaseMobs {
  imageSrc = MOBS.slime;
  configMob = {
    speed: 0.05,
    size: {
      w: 80,
      h: 25,
    },
    images: {},
  };
  size = {
    w: 80,
    h: 25,
  }

  constructor(options) {
    super(options);
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
    this.hpBar.draw();
    this.sprite.render();
  }
}
