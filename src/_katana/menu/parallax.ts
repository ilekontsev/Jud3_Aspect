import { DeltaTime } from '../main/delta-time/deltaTime';
import { Vec2 } from '../main/vector/vec2';

export class Parallax {
  options;

  position1 = new Vec2({ x: 0, y: 0 });
  position2 = new Vec2({ x: 0, y: 0 });
  position3 = new Vec2({ x: 0, y: 0 });

  velocity = new Vec2({ x: 0, y: 0 });
  ctx;
  size = { w: 10, h: 10 };
  image;
  deltaTime = new DeltaTime();

  images = [];

  constructor(options) {
    this.options = options;
    this.ctx = options.ctx;
    this.size = options.size;
    this.image = options.image;

    const x1 = this.options.position.x - this.size.w;
    this.position1.set({ x: x1, y: this.options.position.y });

    this.position2.set(this.options.position);

    const x3 = this.options.position.x + this.size.w * 3;
    this.position3.set({ x: x3, y: this.options.position.y });

    this.init();
  }

  init() {
    if (this.size.w * (this.images.length || 1) < window.innerWidth) {
      this.images.push(this.image);
      this.init();
    } else {
      !this.images.length && this.images.push(this.image);
      return;
    }
  }

  render() {
    this.update();
    this.draw();
  }

  update() {
    this.stop();

    if (this.options.speed.x) {
      this.velocity.x = this.options.speed.x;
    }
    if (this.options.speed.y) {
      this.velocity.y = this.options.speed.y;
    }

    this.move();

    this.checkPosition();
  }

  stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  move() {
    const dt = this.deltaTime.get();
    const coordinates = this.velocity.multScalar(dt);
    this.position1.add(coordinates);
    this.position2.add(coordinates);
    this.position3.add(coordinates);
  }

  checkPosition() {
    if (
      this.position1.x + this.size.w * this.images.length <=
      this.options.position.x
    ) {
      const x = window.innerWidth;
      const coordinates = { x, y: this.options.position.y };
      this.position1.set(coordinates);
    }
    if (
      this.position2.x + this.size.w * this.images.length <=
      this.options.position.x
    ) {
      const x = window.innerWidth;
      const coordinates = { x, y: this.options.position.y };
      this.position2.set(coordinates);
    }
    if (
      this.position3.x + this.size.w * this.images.length <=
      this.options.position.x
    ) {
      const x = window.innerWidth;
      const coordinates = { x, y: this.options.position.y };
      this.position3.set(coordinates);
    }
  }

  draw() {
    this.images.forEach((item, index) => {
      this.ctx.drawImage(
        this.image,
        this.position1.x - this.size.w * index,
        this.position1.y,
        this.size.w + 10,
        this.size.h
      );
      this.ctx.drawImage(
        this.image,
        this.position2.x + this.size.w * index,
        this.position2.y,
        this.size.w + 10,
        this.size.h
      );
      this.ctx.drawImage(
        this.image,
        this.position3.x + this.size.w * index,
        this.position3.y,
        this.size.w + 10,
        this.size.h
      );
    });
  }
}
