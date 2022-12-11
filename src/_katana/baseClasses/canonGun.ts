import { PATH_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';
import { Vec2 } from '../shared/utils/vec2';

export class CannonGun {
  private ctx: CanvasRenderingContext2D;

  private ticksPerFrame = 12;
  private tickCount = 0;
  private frameIndex = 10;
  private x = -1;

  private images = {};
  private imageSrc = PATH_PRESETS.guns.canonGun;
  private selectedImage: HTMLImageElement;
  position = new Vec2({ x: 0, y: 0 });
  constructor(options) {
    this.ctx = options.ctx;
    this.position.set(options.position);
    this.loadImage();
  }

  loadImage() {
    for (let key in this.imageSrc) {
      const image = new Image();
      image.src = this.imageSrc[key];
      this.images[key] = image;
    }
  }

  setIcon(key: string) {
    this.selectedImage = this.images[key];
  }

  render() {
    this.update();
    this.draw();
  }

  update() {
    this.tickCount++;

    if (this.tickCount >= this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex -= this.x;
      this.x = -this.x;
    }
  }

  draw() {
    this.ctx.drawImage(
      this.selectedImage,
      0,
      0,
      20,
      20,
      this.position.x || 0,
      (this.position.y || -11) + this.frameIndex,
      12,
      12
    );
  }
}
