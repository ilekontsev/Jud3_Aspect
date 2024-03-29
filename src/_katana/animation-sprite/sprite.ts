import { Vec2 } from '../main/vector/vec2';

export class Sprite {
  images = {};
  ctx: CanvasRenderingContext2D;
  frameIndex = 0;
  tickCount = 0;
  numberOfFrames = 4;
  ticksPerFrame = 12;
  width: number;
  height: number;
  scale: {
    x: 1;
    y: 1;
  };
  canvas: HTMLCanvasElement;
  selectedImage: any;
  position = new Vec2({ x: 0, y: 0 });
  reflect = false;
  animationEnd = true;
  key;
  options
  constructor(options) {
    this.options = options
    this.ctx = options.ctx;
    this.numberOfFrames = options.numberOfFrames;
    this.ticksPerFrame = options.ticksPerFrame;
    this.scale = options.scale;
    this.width = options.width;
    this.height = options.height;
    this.images = options.images;
    this.position.set(options.position);
  }

  setIcon(obj) {
    this.key = obj.key;
    this.selectedImage = this.images[obj.key];
    this.reflect = obj.reflect;
  }

  render() {
    this.update();
    this.draw();
  }

  update() {
    this.tickCount++;
    this.animationEnd = false;

    if (this.tickCount >= this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
        if (this.frameIndex >= this.numberOfFrames - 1) {
          this.frameIndex = 0;
          this.animationEnd = true;
        }
      }
    }
  }

  draw() {
    const x = this.reflect ? -1 : 1;
    this.ctx.save();

    this.ctx.scale(this.scale.x * x, this.scale.y);
    this.ctx.drawImage(
      this.selectedImage,
      (this.frameIndex * this.width) / this.numberOfFrames,
      0,
      this.width / this.numberOfFrames,
      this.height,
      //todo refactor

      ((this.position?.x || -8) / Math.abs(this.scale.x)) * x - 8,
      (this.position?.y || -10) / Math.abs(this.scale.y) - 10,
      this.width / this.numberOfFrames,
      this.height
    );

    this.ctx.restore();
  }
}
