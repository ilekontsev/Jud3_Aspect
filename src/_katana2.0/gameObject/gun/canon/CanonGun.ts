import { BaseGun } from '../BaseGun';
import { CANON_GUN_IMG } from './canon-gun.assets';
import { loadImages } from 'src/_katana2.0/shared/utils/image-loader.utils';

export class CanonGun extends BaseGun {
  private size = {
    w: 18,
    h: 15,
  };
  configGun = {
    position: { x: 0, y: 0 },
    damage: 1,
    scale: 3,
    images: {},
    type: 'CanonGun'
  };

  constructor(ctx, config) {
    super(ctx);
    this.configGun = { ...this.configGun, ...config, size: this.size };
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
