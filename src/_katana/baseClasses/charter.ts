import { OptionsObject } from '../shared/interfaces/optionCharter';
import { Vec2 } from '../shared/utils/vec2';

export class BaseCharter {
  public position = new Vec2({ x: 0, y: 0 });
  public velocity = new Vec2({ x: 0, y: 0 });

  public options: OptionsObject;
  public ctx;
  public canvas;
  public keys = {};
  private dt = 0;
  private currentFrame = 0;
  private lastFrame = 0;
  private rotate = 0;
  private initSubscription = false;

  constructor(canvas, ctx, options: OptionsObject) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.options = options;
    this.subscriptionEvents();
  }

  subscriptionEvents() {
    if (this.initSubscription) return;

    window.onkeydown = (event) => {
      this.keys[event.keyCode] = true;
    };

    window.onkeyup = (event) => {
      this.keys[event.keyCode] = false;
    };

    // window.onmousemove = function (event) {};
  }

  move(dt: number) {
    this.position.add(this.velocity.multScalar(dt));
  }

  stop() {
    this.velocity.coordinates.x = 0;
    this.velocity.coordinates.y = 0;
  }

  moveKey() {
    console.log(this.options);
    this.calculateDt();
    this.stop();
    console.log(this.keys);
    if (this.keys[37] || this.keys[65]) {
      this.velocity.coordinates.x = -this.options.speed;
    }
    if (this.keys[39] || this.keys[68]) {
      this.velocity.coordinates.x = this.options.speed;
    }
    if (this.keys[38] || this.keys[87]) {
      this.velocity.coordinates.y = -this.options.speed;
    }
    if (this.keys[40] || this.keys[83]) {
      this.velocity.coordinates.y = this.options.speed;
    }
    this.move(this.dt);
  }

  calculateDt() {
    this.currentFrame = +new Date();
    this.dt = this.currentFrame - this.lastFrame;
    this.lastFrame = this.currentFrame;
  }
}
