import { Sprite } from 'src/_katana/animation-sprite/sprite';
import { GameHelper } from 'src/_katana/game/gameHelper';
import { MoveCharter } from 'src/_katana/main/actions/move/MoveCharter';
import { BaseCharterOptions } from 'src/_katana/shared/interfaces/optionCharter';
import { HpBarBase } from 'src/_katana/shared/sprites/hpBarBase';
import { getAngleByCursor, checkAngleForIcon } from 'src/_katana/shared/utils';

export class Base {
  protected options: BaseCharterOptions;
  protected ctx: CanvasRenderingContext2D;
  protected canvas: HTMLCanvasElement;

  private HpBar: HpBarBase;
  private Sprite: Sprite;
  private MoveCharter: MoveCharter;

  constructor(options: BaseCharterOptions) {
    this.options = options;
    this.ctx = options.ctx;
    this.canvas = options.canvas;
  }

  protected init(): void {
    this.loadSprites();
    this.loadActions();
  }

  update(): void {
    this.pressKey();
    this.setIconByAngle();
  }

  draw(): void {
    this.ctx.font = '10px serif';
    this.ctx.fillText(
      this.options.nickname,
      window.innerWidth / 2 - (this.options.nickname.length + 1) * 2,
      window.innerHeight / 2 - 50,
    );

    this.ctx.drawImage(this.options.configCharter.images['down'], 0, 0, 556, 556, 0, 0, 3256, 3256 );

    this.HpBar.draw();

    // this.Sprite.render();
  }

  //sprites for charter
  loadSprites(): void {
    this.loadHpBar();
    this.loadSpriteCharter();
  }

  loadHpBar(): void {
    this.HpBar = new HpBarBase({
      ...this.options,
      position: {
        x: window.innerWidth / 2 - 30,
        y: window.innerHeight / 2 - 45,
      },
    });
  }

  loadSpriteCharter(): void {
    // this.Sprite = new Sprite({
    //   ctx: this.ctx,
    //   width: this.options.configCharter.size.w,
    //   height: this.options.configCharter.size.h,
    //   images: this.options.configCharter.images,
    //   scale: {
    //     x: 5,
    //     y: 5,
    //   },
    //   position: {
    //     x: window.innerWidth / 2,
    //     y: window.innerHeight / 2,
    //   },
    //   numberOfFrames: 5,
    //   ticksPerFrame: 12,
    // });
    // GameHelper.charterPosition.set({
    //   x: window.innerWidth / 2,
    //   y: window.innerHeight / 2,
    // });
  }

  setIconByAngle(): void {
    const angle = getAngleByCursor(GameHelper.cursorPosition);
    const obj = checkAngleForIcon(angle);
    // this.Sprite.setIcon({ key: 'down' });
  }

  //Движение персонажа
  loadActions(): void {
    this.MoveCharter = new MoveCharter(this.options);
  }

  pressKey(): void {
    this.MoveCharter.pressKey();
  }
}
