import { GameHelper } from '../game/gameHelper';
export class SpriteImages {
  options;
  ctx: CanvasRenderingContext2D;
  position;
  size;
  images = [];
  selectedImage;
  tickCount = 0;
  animationEnd = false;
  ticksPerFrame = 10;
  frameIndex = 0;

  constructor(options) {
    this.options = options;
    this.ctx = options.ctx;
    this.position = options.position;
    this.size = options.size;
    this.init();
  }

  init() {
    this.loadImages();
  }

  loadImages() {
    for (let imageSrc of this.options.images) {
      const image = new Image();
      image.src = imageSrc;
      this.images.push(image);
    }
    this.selectedImage = this.images[0];
  }

  update() {
    this.tickCount++;
    this.animationEnd = false;

    if (this.tickCount >= this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIndex < this.images.length - 1) {
        this.frameIndex++;
        if (this.frameIndex >= this.images.length - 1) {
          this.frameIndex = 0;
          this.animationEnd = true;
        }
      }
    }
  }

  draw() {
    this.ctx.drawImage(
      this.images[this.frameIndex],
      this.position.x - GameHelper.charterPosition.x,
      this.position.y - GameHelper.charterPosition.y,
      this.size.w,
      this.size.h
    );
  }
}
