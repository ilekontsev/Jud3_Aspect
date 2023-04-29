import { loadImages } from 'src/_katana2.0/shared/utils/image-loader.utils';
import { BERSERKER_IMG } from './berserker.assets';
import { Sprite } from 'src/_katana2.0/animations/sprite';

export class Berserker {
  public configCharter = {
    speed: 0.3,
    attack: 0.4,
    size: {
      w: 80,
      h: 50,
    },
    position: {
      x: 0,
      y: 100,
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
    this.images = loadImages(BERSERKER_IMG);
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
