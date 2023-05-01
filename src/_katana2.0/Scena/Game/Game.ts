import { ActionCharter } from 'src/_katana2.0/actions/Action/ActionCharter';
import { MoveCharter } from 'src/_katana2.0/actions/move/MoveCharter';
import { Cursor } from 'src/_katana2.0/cursor/Cursor';
import { BasePlayer } from 'src/_katana2.0/gameObject/basePlayer/base/BasePlayer';
import { Camera } from 'src/_katana2.0/gameObject/Camera/Camera';
import { Warrior } from 'src/_katana2.0/gameObject/charter/warrior/Warrior';
import { CanonGun } from 'src/_katana2.0/gameObject/gun/canon/CanonGun';
import { DefaultMap } from 'src/_katana2.0/gameObject/Maps/DefaultMap/DefaultMap';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  config;

  private gameObject = {
    charters: [],
    mobs: [],
    guns: [],
    bullets: [],
    base: null,
    map: null,
    camera: null,
  };

  private scripts = {
    move: null,
    action: null,
    cursor: null,
  };

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, config) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.config = config;
    this.init();
  }

  private init(): void {
    this.initGameObject();

    this.render();
  }

  private initGameObject(): void {
    this.createMap();
    this.createBase();
    this.createCursor();
    this.createGun();
    this.createCharters();
  }

  createMap() {
    this.gameObject.map = new DefaultMap(this.ctx, this.config.map);
  }

  createBase() {
    this.gameObject.base = new BasePlayer(this.ctx, {
      ...this.config.base,
      position: {
        x: 1000,
        y: this.gameObject.map.config.size.h / 2,
      },
    });
  }

  createCursor() {
    this.scripts.cursor = new Cursor(this.canvas, this.ctx);
  }

  createGun() {
    const gun = new CanonGun(this.ctx, {});
    this.gameObject.guns.push(gun);
  }

  createCharters() {
    const charter = new Warrior(
      this.ctx,
      {
        position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        scale: 4,
      },
      this.scripts.cursor,
    );

    charter.takeInHand(this.gameObject.guns[0]);
    this.gameObject.charters.push(charter);

    this.scripts.move = new MoveCharter(this.canvas, charter);
    this.scripts.action = new ActionCharter(this.canvas, this.ctx, this.gameObject, charter);

    this.gameObject.camera = new Camera(this.canvas, this.ctx, {});
  }

  update(): void {
    this.scripts.move.pressKey();
    this.gameObject.camera.focus(this.gameObject.map, this.gameObject.charters[0]);
    this.gameObject.charters.forEach((charter) =>
      charter.update(this.gameObject.camera.config.position),
    );
    this.gameObject.base.update();
  }

  draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.gameObject.camera.draw();
    this.gameObject.map.draw();

    this.gameObject.base.draw();

    this.gameObject.charters.forEach((charter) => charter.draw());
    this.gameObject.bullets.forEach(bullet => bullet.draw())
    this.scripts.cursor.draw();

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  render(): void {
    this.update();
    this.draw();
  }
}
