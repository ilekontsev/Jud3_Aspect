import { PATH_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';
import { Base } from '../Base';
import { BaseCharterOptions } from 'src/_katana/shared/interfaces/optionCharter';
import { WARRIOR_IMG } from './warrior.assets';
import { loadImages } from 'src/_katana2.0/shared/utils/image-loader.utils';
import { Sprite } from 'src/_katana2.0/animations/sprite';

export class Warrior {
  configCharter = {
    speed: 0.3,
    attack: 0.4,
    size: {
      w: 64,
      h: 50,
    },
    position: {
      x: 0,
      y: 110,
    },
    scale: {
      w: 250,
      h: 200,
    },
  };
  private options;
  private images: Record<string, HTMLImageElement>;
  private sprite: Sprite;

  constructor(options) {
    this.options = options;
    this.init();
  }

  private init(): void {
    this.images = loadImages(WARRIOR_IMG);
    this.sprite = new Sprite({ ...this.options, ...this.configCharter, images: this.images });
  }

  public update(): void {
    this.sprite.options.position = this.configCharter.position
    this.sprite.update();
  }
  public draw(): void {
    this.sprite.draw();
  }

  public render(): void {
    this.update();
    this.draw();
  }
}