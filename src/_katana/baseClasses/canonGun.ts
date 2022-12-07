export class CannonGun {
  image = new Image();
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  scale = 2;
  ticksPerFrame = 12;
  numberOfFrames = 4;
  tickCount = 0;
  frameIndex = 10;
  x = 1;

  imageSrc = {
    diagDown: 'assets/topdown_shooter/guns/cannon/cannon_diagdown.png',
    diagUp: 'assets/topdown_shooter/guns/cannon/cannon_diagup.png',
    down: 'assets/topdown_shooter/guns/cannon/cannon_down.png',
    side: 'assets/topdown_shooter/guns/cannon/cannon_side.png',
    up: 'assets/topdown_shooter/guns/cannon/cannon_up.png',
  };

  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  setIcon(src) {
    this.image.src = this.imageSrc[src];
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0);
    };
  }

  render(reflect) {
    this.update();
    this.draw(reflect);
  }

  update() {
    this.tickCount++;

    if (this.tickCount >= this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameIndex -= this.x;
      this.x = -this.x;
    }
  }

  draw(reflect) {
    this.ctx.drawImage(
      this.image,
      0,
      0,
      20,
      20,
      0,
      -11 + this.frameIndex,
      12,
      12
    );
  }
}
