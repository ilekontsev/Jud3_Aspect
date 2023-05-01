import { MoveCharter } from 'src/_katana2.0/actions/move/MoveCharter';
import { Cursor } from 'src/_katana2.0/cursor/cursor';
import { BasePlayer } from 'src/_katana2.0/gameObject/basePlayer/base/BasePlayer';
import { Camera } from 'src/_katana2.0/gameObject/Camera/Camera';
import { Warrior } from 'src/_katana2.0/gameObject/charter/warrior/Warrior';
import { DefaultMap } from 'src/_katana2.0/gameObject/Maps/DefaultMap/DefaultMap';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  config;

  private gameObject = {
    charters: [],
    mobs: [],
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
    this.createCharters();
  }

  createMap() {
    this.gameObject.map = new DefaultMap(this.ctx, this.config.map);
  }

  createBase() {
    console.log(this.gameObject.map.config.size)
    this.gameObject.base = new BasePlayer(this.ctx, {
      ...this.config.base,
      position: {
        x: 1000,
        y: this.gameObject.map.config.size.h /2,
      },
    });
  }

  createCharters() {
    this.scripts.cursor = new Cursor(this.canvas, this.ctx);
    const charter = new Warrior(
      this.ctx,
      {
        position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        scale: 4,
      },
      this.scripts.cursor,
    );
    this.gameObject.charters.push(charter);
    this.scripts.move = new MoveCharter(this.canvas, charter);
    this.gameObject.camera = new Camera(0, 0);
  }

  update(): void {
    this.gameObject.base.update();
    this.scripts.move.pressKey();
    this.gameObject.charters.forEach((charter) => charter.update());
  }

  draw(): void {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.gameObject.camera.focus(this.canvas, this.gameObject.map, this.gameObject.charters[0]);
    // Flip the sign b/c positive shifts the canvas to the right, negative - to the left
    this.ctx.translate(-this.gameObject.camera.x, -this.gameObject.camera.y);

    this.gameObject.map.draw();

    this.gameObject.charters.forEach((charter) => charter.draw());
    this.gameObject.base.draw();
    this.scripts.cursor.draw();
  }

  render(): void {
    this.update();
    this.draw();
  }
}
