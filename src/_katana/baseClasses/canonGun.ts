import { BaseGun } from './../attacks/baseGun';
import { PATH_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';
import { Vec2 } from '../shared/utils/vec2';

export class CannonGun extends BaseGun {
  private ticksPerFrame = 12;
  private tickCount = 0;
  private frameIndex = 10;
  private x = 1;
  private size = {
    x: 3,
    y: 3,
  };
  private images = {};
  private imageSrc = PATH_PRESETS.guns.canonGun;
  private selectedImage: HTMLImageElement;
  position = new Vec2({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  constructor(options) {
    super(options);
    this.position.set(options.position);
    this.size = options.size ? options.size : this.size;
    this.loadImage();
  }

  loadImage() {
    for (let key in this.imageSrc) {
      const image = new Image();
      image.src = this.imageSrc[key];
      this.images[key] = image;
    }
    this.setIcon('down');
  }

  setIcon(obj) {
    this.reflect = obj.reflect;
    this.selectedImage = this.images[obj.key];
  }


  update(){
    this.pressKey();
    this.calcTickCount();
  }

  calcTickCount() {
    this.tickCount++;

    if (this.tickCount >= this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex -= this.x;
      this.x = -this.x;
    }
  }

  draw() {
    const x = this.reflect ? -1 : 1;

    this.ctx.save();
    this.ctx.scale(this.size.x * x, this.size.y);

    this.ctx.drawImage(
      this.selectedImage,
      0,
      0,
      20,
      20,
      ((this.position.x || 0) / this.size.x) * x,
      (this.position.y || -11) / this.size.y  - 11 + this.frameIndex,
      12,
      12
    );
    this.ctx.restore();
  }
}
