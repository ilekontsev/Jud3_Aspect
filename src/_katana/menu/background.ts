import { Parallax } from './parallax';
import { MENU } from './../../app/game/game-field-jud3/constants/path-presets';
import { Sprite } from '../baseClasses/sprite';
import { CannonGun } from '../baseClasses/canonGun';
export class Background {
  ctx: CanvasRenderingContext2D;

  imageSrc = MENU.background;
  images = {};
  listParallax = [];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.init();
  }

  init() {
    this.loadImage();
    this.createSprite();
  }

  loadImage() {
    for (let key in this.imageSrc) {
      const image = new Image();
      image.src = this.imageSrc[key].src;
      this.images[key] = image;
      this.createParallax(image, this.imageSrc[key]);
    }
  }

  createParallax(image, options) {
    const parallax = new Parallax({
      ctx: this.ctx,
      image,
      size: options.size,
      position: options.position,
      speed: options.speed,
    });
    this.listParallax.push(parallax);
  }

  spriteMob;
  spriteCharter;
  gunCharter;
  createSprite() {
    const imageMob = new Image();
    imageMob.src = 'assets/topdown_shooter/monster/slime1_side.png';
    this.spriteMob = new Sprite({
      ctx: this.ctx,
      width: 80,
      height: 35,
      images: { side: imageMob },
      numberOfFrames: 5,
      ticksPerFrame: 12,
      scale: {
        x: -4,
        y: 4,
      },
      position: {
        x: 20,
        y: 278,
      },
    });
    this.spriteMob.setIcon('side');

    const imageCharter = new Image();
    imageCharter.src = 'assets/topdown_shooter/characters/2_side.png';
    this.spriteCharter = new Sprite({
      ctx: this.ctx,
      width: 75,
      height: 35,
      images: { side: imageCharter },
      numberOfFrames: 4,
      ticksPerFrame: 12,
      scale: {
        x: 5,
        y: 5,
      },
      position: {
        x: -80,
        y: 212,
      },
    });
    this.spriteCharter.setIcon('side');

    this.gunCharter = new CannonGun({
      ctx: this.ctx,
      position: { x: -70, y: 215 },
    });
    this.gunCharter.setIcon('side');
  }

  render() {
    this.update();
    this.draw();
  }

  tickCount;

  update() {
    if (this.spriteCharter.position.x > window.innerHeight) {
      this.spriteMob.position.set({
        x: 20,
        y: 278,
      });
      this.spriteCharter.position.set({
        x: -80,
        y: 212,
      });
      this.gunCharter.position.set({ x: -70, y: 215 });
    } else {
      this.spriteMob.position.add({ x: -0.4, y: 0 });
      this.spriteCharter.position.add({
        x: 0.3,
        y: 0,
      });
      this.gunCharter.position.add({ x: 0.3, y: 0 });
    }
  }

  draw() {
    this.listParallax.forEach((item) => {
      item.render();
    });

    this.spriteMob.render();
    this.spriteCharter.render();
    this.ctx.save();
    this.ctx.scale(5, 5);
    this.gunCharter.render();
    this.ctx.restore();
  }
}
