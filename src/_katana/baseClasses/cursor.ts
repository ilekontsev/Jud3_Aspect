import { checkPositionByField } from '../shared/utils';

export class Cursor {
  ctx: CanvasRenderingContext2D;
  image = new Image();
  mouse = {
    x: 0,
    y: 0,
  };
  constructor(ctx) {
    this.ctx = ctx;
    this.image.src = 'assets/topdown_shooter/cursors/6crosshair.png';
  }

  render() {
    this.draw();
  }

  update(mouse) {
    this.mouse = mouse;
    checkPositionByField(this.mouse, window.innerWidth, window.innerHeight);
  }

  draw() {
    this.ctx.drawImage(this.image, this.mouse.x, this.mouse.y);
  }
}
