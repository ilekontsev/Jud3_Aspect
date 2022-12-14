import { GameHelper } from './gameHelper';
import { PATH_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';
import { Slime } from '../mobs/slime';

export class DefenseMode {
  options;
  ctx: CanvasRenderingContext2D;
  images: HTMLImageElement;

  baseOptions = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    w: 200,
    h: 200,
  };

  mobs = [];

  constructor(options) {
    this.options = options;
    this.ctx = options.ctx;
    this.init();
  }

  init() {
    this.loadImages();
    this.createMobs();
  }

  loadImages() {
    const image = new Image();
    image.src = PATH_PRESETS.base;
    this.images = image;
  }

  createMobs() {
    const mob = new Slime({
      ...this.options,
      objectOptions: {
        ...this.baseOptions,
      },
    });
    this.mobs.push(mob);
  }

  update() {
    this.checkCollisionBase();
    if (this.mobs.length < 10) {
      this.createMobs();
    }
    this.mobs.forEach((mob) => {
      mob.update();
    });
    this.mobs = this.mobs.filter((mob) => mob.active);
  }

  checkCollisionBase() {
    const positionX = GameHelper.charterPosition.x + this.baseOptions.x;
    const positionY = GameHelper.charterPosition.y + this.baseOptions.y + 25;
    if (
      this.baseOptions.x > positionX - this.baseOptions.w / 2 &&
      this.baseOptions.x < positionX + this.baseOptions.w / 2 &&
      this.baseOptions.y > positionY - this.baseOptions.h / 2 &&
      this.baseOptions.y < positionY + this.baseOptions.h / 2
    ) {
      GameHelper.charterPosition.add({
        x: -GameHelper.charterVelocity.x,
        y: -GameHelper.charterVelocity.y,
      });
    }
  }

  draw() {
    this.ctx.drawImage(
      this.images,
      this.baseOptions.x -
        this.baseOptions.w / 2 -
        GameHelper.charterPosition.x,
      this.baseOptions.y -
        this.baseOptions.h / 2 -
        GameHelper.charterPosition.y,
      this.baseOptions.w,
      this.baseOptions.h
    );
    this.mobs.forEach((mob) => {
      mob.draw();
    });

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(window.innerWidth - 310, 10, 300, 300);
    this.ctx.strokeRect(window.innerWidth - 310, 10, 300, 300);

    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(
      window.innerWidth / 2 - 300,
      window.innerHeight - 100,
      600,
      100
    );
  }
}
