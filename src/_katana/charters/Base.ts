import { Sprite } from '../animation-sprite/sprite';
import { GameHelper } from '../game/gameHelper';
import { checkAngleForIcon, getAngleByCursor } from '../shared/utils';
import { BaseCharterOptions } from '../shared/interfaces/optionCharter';
import { MoveCharter } from '../main/actions/move/MoveCharter';
import { HpBarBase } from '../shared/sprites/hpBarBase';

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
      window.innerHeight / 2 - 50
    );

    this.HpBar.draw();

    this.Sprite.render();
  }

  //sprites for charter
  loadSprites() {
    this.loadHpBar();
    this.loadSpriteCharter();
  }

  loadHpBar() {
    this.HpBar = new HpBarBase({
      ...this.options,
      position: {
        x: window.innerWidth / 2 - 30,
        y: window.innerHeight / 2 - 45,
      },
    });
  }

  loadSpriteCharter() {
    this.Sprite = new Sprite({
      ctx: this.ctx,
      width: this.options.configCharter.size.w,
      height: this.options.configCharter.size.h,
      images: this.options.configCharter.images,
      scale: {
        x: 3,
        y: 3,
      },
      position: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
      numberOfFrames: 5,
      ticksPerFrame: 12,
    });
    GameHelper.charterPosition.set({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
  }

  setIconByAngle() {
    const angle = getAngleByCursor(GameHelper.cursorPosition);
    const obj = checkAngleForIcon(angle);
    this.Sprite.setIcon(obj);
  }

  //Движение персонажа
  loadActions() {
    this.MoveCharter = new MoveCharter(this.options);
  }

  pressKey() {
    this.MoveCharter.pressKey();
  }
}
