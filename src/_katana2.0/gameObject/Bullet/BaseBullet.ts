import { DeltaTime } from 'src/_katana/main/delta-time/deltaTime';
import { Vec2 } from 'src/_katana/main/vector/vec2';
import { Sprite } from 'src/_katana2.0/animations/Sprite';

export class BaseBullet {
  protected ctx: CanvasRenderingContext2D;
  protected _config;
  private Sprite: Sprite;

  position = new Vec2({ x: 0, y: 0 });
  velocity = new Vec2({ x: 0, y: 0 });
  deltaTime = new DeltaTime();

  constructor(ctx) {
    this.ctx = ctx;
  }

  setConfig(config) {
    this._config = config;
    this.position.set(config.position);
  }

  protected init() {
    this.Sprite = new Sprite(this.ctx, this._config);
  }

  update() {
    this.updateBulletTrajectory();
  }

  draw() {
    this.Sprite.draw();
  }

  move() {
    const dt = this.deltaTime.get();
    this.position.add(this.velocity.multScalar(dt));
    this._config.position = this.position;
  }

  stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  cos() {
    this.velocity.x = Math.cos(this._config.angle) * this._config.speed;
  }

  sin() {
    this.velocity.y = Math.sin(this._config.angle) * this._config.speed;
  }

  updateBulletTrajectory() {
    this.stop();

    this.cos();
    this.sin();

    this.move();
  }
}
