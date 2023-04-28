import { Sprite } from '../../animation-sprite/sprite';
import { PATH_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';
import { GameHelper } from '../../game/gameHelper';
import { HpBarBase } from '../../shared/sprites/hpBarBase';
import { IBase } from './base.interface';

export class BaseCharter {
  private options: IBase;
  private images = {};
  private position = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
  private size = {
    w: 200,
    h: 200,
  };
  private hpBar: HpBarBase;
  private sprite: Sprite;

  constructor(options: IBase) {
    this.options = options;
    this.init();
  }

  init(): void {
    this.loadImages();
    this.createHpBar();
  }

  loadImages(): void {
    const imagesSrc = {
      base: PATH_PRESETS.base,
      crystal: PATH_PRESETS.crystalBase,
    };
    for (let item in imagesSrc) {
      const image = new Image();
      image.src = imagesSrc[item];
      this.images[item] = image;
    }

    this.sprite = new Sprite({
      ...this.options,
      scale: { x: 2, y: 2 },
      position: {
        x: this.position.x - GameHelper.charterPosition.x,
        y: this.position.y - this.size.h / 2 - GameHelper.charterPosition.y,
      },
      images: this.images,
      width: 40,
      height: 100,
      numberOfFrames: 4,
      ticksPerFrame: 11,
    });
    this.sprite.setIcon({ key: 'crystal', reflect: false });
  }

  createHpBar(): void {
    this.hpBar = new HpBarBase(this.options);
  }

  checkCollisionBase(): void {
    const positionX = GameHelper.charterPosition.x + this.position.x;
    const positionY = GameHelper.charterPosition.y + this.position.y + 25;
    if (
      this.position.x > positionX - this.size.w / 2 &&
      this.position.x < positionX + this.size.w / 2 &&
      this.position.y > positionY - this.size.h / 2 &&
      this.position.y < positionY + this.size.h / 2
    ) {
      GameHelper.charterPosition.add({
        x: -GameHelper.charterVelocity.x,
        y: -GameHelper.charterVelocity.y,
      });
    }
  }

  update(): void {
    this.checkCollisionBase();
    this.hpBar.position = {
      x: this.position.x - this.size.w / 6 - GameHelper.charterPosition.x,
      y: this.position.y + this.size.h / 2 - GameHelper.charterPosition.y,
    };

    this.sprite.position.set({
      x: this.position.x + 6 - GameHelper.charterPosition.x,
      y: this.position.y - this.size.h / 3 - GameHelper.charterPosition.y,
    });
    this.sprite.update();
  }

  draw() {
    this.options.ctx.drawImage(
      this.images['base'],
      this.position.x - this.size.w / 2 - GameHelper.charterPosition.x,
      this.position.y - this.size.h / 2 - GameHelper.charterPosition.y,
      this.size.w,
      this.size.h,
    );
    this.hpBar.count !== 8 && this.sprite.draw();

    this.hpBar.draw();
  }
}
