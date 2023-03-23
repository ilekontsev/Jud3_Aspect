import { PATH_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';
import { BaseCharterOptions } from '../shared/interfaces/optionCharter';
import { Base } from './Base';

export class Berserker extends Base {
  configCharter = {
    speed: 0.3,
    attack: 0.4,
    size: {
      w: 100,
      h: 25,
    },
    images: {},
  };

  imageSrc = PATH_PRESETS.charters.berserker;

  constructor(options: BaseCharterOptions) {
    super(options);
    options.configCharter = this.configCharter;
    this.init();
  }
  protected override init(): void {
    this.loadImages();
    super.init();
  }

  public override update(): void {
    super.update();
  }

  public override draw(): void {
    super.draw();
  }

  private loadImages() {
    for (let key in this.imageSrc) {
      const image = new Image();
      image.src = this.imageSrc[key];
      this.configCharter.images[key] = image;
    }
  }
}
