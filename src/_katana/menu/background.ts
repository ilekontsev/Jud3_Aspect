import { MOBS } from 'src/app/game/game-field-jud3/constants/path-presets';
import { Parallax } from './parallax';
import { MENU } from './../../app/game/game-field-jud3/constants/path-presets';
import { Sprite } from '../baseClasses/sprite';
import { CannonGun } from '../baseClasses/canonGun';
export class Background {
  ctx: CanvasRenderingContext2D;

  imageSrc = MENU.background;
  images = {};
  listParallax = [];

  constructor(options) {
    this.ctx = options.ctx;
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
    imageMob.src = MOBS.slime.side;

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
        x: 120,
        y: window.innerHeight - 200,
      },
    });
    this.spriteMob.setIcon({ key: 'side', reflect: false });

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
        x: -400,
        y: window.innerHeight - 250,
      },
    });
    this.spriteCharter.setIcon({ key: 'side', reflect: false });

    this.gunCharter = new CannonGun({
      ctx: this.ctx,
      size: {
        x: 1,
        y: 1,
      },
      position: { x: -78, y: 154 },
    });
    this.gunCharter.setIcon({ key: 'side', reflect: false });
  }

  render() {
    this.update();
    this.draw();
  }

  tickCount = 2000;

  update() {
    this.tickCount++;
    if (this.tickCount < 2000) {
      this.spriteMob.position.set({
        x: 120,
        y: window.innerHeight - 200,
      });
      this.spriteCharter.position.set({
        x: -400,
        y: window.innerHeight - 250,
      });
      this.gunCharter.position.set({ x: -78, y: 154 });
    } else {
      this.spriteMob.position.add({ x: -1.5, y: 0 });
      this.spriteCharter.position.add({
        x: 1.5,
        y: 0,
      });
      this.gunCharter.position.add({ x: 0.3, y: 0 });
    }
    if (this.spriteCharter.position.x > window.innerWidth) {
      this.tickCount = 0;
    }
    this.gunCharter.update();

  }

  draw() {
    this.listParallax.forEach((item) => {
      item.render();
    });

    this.spriteMob.render();
    this.spriteCharter.render();
    this.ctx.save();
    this.ctx.scale(5, 5);
    this.gunCharter.draw();
    this.ctx.restore();
  }
}
