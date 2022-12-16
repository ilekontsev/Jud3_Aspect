import { GameHelper } from './gameHelper';
import { PATH_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';
import { Slime } from '../mobs/slime';
import { Projectile } from './projectile';
import { Base } from './base';
import { Sprite } from '../sprites/sprite';

export class DefenseMode {
  options;
  ctx: CanvasRenderingContext2D;
  images = {};
  countDieMobs = 0;
  base;
  mobs = [];
  wave = 1;
  countMob = 5;
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
    const imagesSrc = { map: PATH_PRESETS.mapGame };

    for (let item in imagesSrc) {
      const image = new Image();
      image.src = imagesSrc[item];
      this.images[item] = image;
    }
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

  moneys = [];

  createMoney(position) {
    const image = new Image();
    image.src = 'assets/topdown_shooter/other/coin2.png';
    const money = new Sprite({
      ...this.options,
      active: true,
      images: { money: image },
      position: {
        x: position.x - GameHelper.charterPosition.x,
        y: position.y - GameHelper.charterPosition.y,
      },
      scale: { x: 2, y: 2 },
      width: 130,
      height: 100,
      numberOfFrames: 8,
      ticksPerFrame: 12,
      originPosition: position,
    });
    money.setIcon({ key: 'money', reflect: false });
    this.moneys.push(money);
    Projectile.money = this.moneys;
  }

  createdMob = 1;
  diedMob = 0;
  allMobsDied = 0;
  countCoin = 0;

  update() {
    this.base.update();

    Projectile.checkPositionCharter();
    this.moneys = this.moneys.filter((item) => {
      if (item.options.active) {
        return item;
      } else {
        this.countCoin++;
      }
    });

    Projectile.dynamicObjects = this.mobs;
    this.mobs = this.mobs.filter((mob) => {
      if (mob.hpBar.count !== 8 && mob.active) {
        return mob;
      }
      if (mob.hpBar.count === 8 && this.base.hpBar.count !== 8) {
        this.createMoney(mob.position);
        this.countDieMobs++;
      }
      this.allMobsDied++;
      this.diedMob++;
    });

    if (
      this.mobs.length < this.countMob * this.wave &&
      this.countMob * this.wave !== this.createdMob
    ) {
      this.createMobs();
      this.createdMob++;
    }

    if (this.createdMob === this.diedMob) {
      this.wave++;


      setTimeout(() => {
        this.createdMob = 0;
        this.diedMob = 0;
        this.moneys = [];
      Projectile.money = [];

      }, 1000)


    }

    this.mobs.forEach((mob) => {
      mob.update();
      if (mob.sprite.key === 'die' && mob.sprite.animationEnd) {
        this.base.hpBar.setIcon();
      }
    });

    this.moneys.forEach((money) => {
      money.position.set({
        x: money.options.originPosition.x - GameHelper.charterPosition.x,
        y: money.options.originPosition.y - GameHelper.charterPosition.y,
      });
      money.update();
    });
  }

  draw() {
    this.base.draw();

    this.moneys.forEach((money) => {
      money.draw();
    });

    this.mobs.forEach((mob) => {
      mob.draw();
    });

    this.ctx.font = '50px serif';
    this.ctx.fillText(`player died mobs: ${this.countDieMobs}`, 10, 50);

    this.ctx.fillText(`Wave: ${this.wave}`, 10, 100);

    this.ctx.fillText(`died mobs for wave: ${this.diedMob}`, 10, 150);

    this.ctx.fillText(`died all mobs: ${this.allMobsDied}`, 10, 200);

    this.ctx.fillText(`Coins: ${this.countCoin}`, 10, 250);

    this.ctx.fillStyle = 'white';
    this.ctx.drawImage(
      this.images['map'],
      window.innerWidth - 310,
      10,
      300,
      300
    );
    this.ctx.strokeRect(window.innerWidth - 310, 10, 300, 300);

    this.ctx.fillRect(
      window.innerWidth / 2 - 300,
      window.innerHeight - 70,
      600,
      70
    );
    this.ctx.strokeRect(
      window.innerWidth / 2 - 300,
      window.innerHeight - 70,
      600,
      70
    );
  }
}
