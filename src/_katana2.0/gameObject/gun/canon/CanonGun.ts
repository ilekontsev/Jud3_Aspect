import { Vec2 } from 'src/_katana/main/vector/vec2';
import { BaseGun } from '../BaseGun';
import { CANON_GUN_IMG } from './canon-gun.assets';
import { loadImages } from 'src/_katana2.0/shared/utils/image-loader.utils';

export class CanonGun extends BaseGun {
  configGun = {
    position: new Vec2({ x: 0, y: 0 }),
    size: {
      w: 15,
      h: 15,
    },
    damage: 1,
    scale: 2,
    images: {},
  };

  constructor(options) {
    super(options);
    this.init();
  }

  protected override init(): void {
    this.configGun.images = loadImages(CANON_GUN_IMG);
    this.setConfig(this.configGun);
    super.init();
  }

  public override update(): void {
    super.update();
  }

  public override draw(): void {
    super.draw();
  }

  public render(): void {
    this.update();
    this.draw();
  }
}
