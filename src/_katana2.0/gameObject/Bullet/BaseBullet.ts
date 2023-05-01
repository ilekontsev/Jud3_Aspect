import { Sprite } from 'src/_katana2.0/animations/sprite';

export class BaseBullet {
  private ctx: CanvasRenderingContext2D;
  private _config;
  private Sprite: Sprite;

  constructor(ctx) {
    this.ctx = ctx;
  }

  setConfig(config) {
    this._config = config;
  }

  protected init() {
    this.Sprite = new Sprite(this.ctx, this._config);
  }

  update() {}

  draw() {
    this.Sprite.draw();
  }
}
