import { PATH_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';
import { BaseCharter } from '../baseClasses/baseCharter';
import { BaseCharterOptions } from '../shared/interfaces/optionCharter';
import { Base } from './base';

export class Warrior extends Base {
  configCharter = {
    speed: 0.3,
    attack: 0.4,
    size: {
      w: 80,
      h: 25,
    },
    images: {},
  };

  imageSrc = PATH_PRESETS.charters.warrior;

  constructor(options: BaseCharterOptions) {
    super(options);
    this.init();
  }

  init() {
    this.loadImages();
    this.setConfigCharter(this.configCharter);
  }

  loadImages() {
    for (let key in this.imageSrc) {
      const image = new Image();
      image.src = this.imageSrc[key];
      this.configCharter.images[key] = image;
    }
  }

  draw() {


    this.ctx.font = '10px serif';

    // this.ctx.fillText(
    //   this.options.nickname,
    //   this.position.x - 30 ,
    //   this.position.y - 40
    // );
    this.sprite.render();


    // this.hpBar.draw(this.position);
    // this.mobs.forEach((mob) => {
    //   mob.draw();
    // });

    // this.gun.render(this.reflect);
  }
}
