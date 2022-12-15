import { GameHelper } from './gameHelper';
import { PATH_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';
import { Slime } from '../mobs/slime';
import { Projectile } from './projectile';
import { Base } from './base';

export class DefenseMode {
  options;
  ctx: CanvasRenderingContext2D;
  images: HTMLImageElement;

  base;
  mobs = [];

  constructor(options) {
    this.options = options;
    this.ctx = options.ctx;
    this.init();
  }

  init() {
    this.loadImages();
    this.createBase();
    this.createMobs();
  }

  loadImages() {
    const image = new Image();
    image.src = PATH_PRESETS.base;
    this.images = image;
  }

  createBase() {
    this.base = new Base(this.options);
    Projectile.staticObjects.push(this.base);
  }

  createMobs() {
    const mob = new Slime({
      ...this.options,
      objectOptions: {
        ...this.base.position,
        ...this.base.size,
      },
    });
    this.mobs.push(mob);
  }

  update() {
    this.base.update();

    this.mobs = this.mobs.filter((mob) => mob.hpBar.count !== 8);

    if (this.mobs.length < 10) {
      this.createMobs();
    }
    this.mobs.forEach((mob) => {
      mob.update();
    });
    this.mobs = this.mobs.filter((mob) => mob.active);
    Projectile.dynamicObjects = this.mobs;
  }

  draw() {
    this.base.draw();

    this.mobs.forEach((mob) => {
      mob.draw();
    });

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(window.innerWidth - 310, 10, 300, 300);
    this.ctx.strokeRect(window.innerWidth - 310, 10, 300, 300);

    this.ctx.fillRect(
      window.innerWidth / 2 - 300,
      window.innerHeight - 70,
      600,
      70
    );
    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(
      window.innerWidth / 2 - 300,
      window.innerHeight - 70,
      600,
      70
    );
  }
}
