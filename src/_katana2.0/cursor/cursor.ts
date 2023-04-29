import { GameHelper } from 'src/_katana/game/gameHelper';
import { Vec2 } from 'src/_katana/main/vector/vec2';
import { checkPositionByField } from 'src/_katana/shared/utils';

export class Cursor {
  ctx: CanvasRenderingContext2D;
  image = new Image();
  canvas;
  cursorPosition = new Vec2({ x: 0, y: 0 });
  callbackMousemove;

  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.cursorPosition.set(options.position)
    this.callbackMousemove = this.updateMousemove.bind(this);

    this.init();
  }

  init() {
    this.loadImage();
    this.createEventSubscriptions();
  }

  loadImage() {
    this.image.src = 'assets/topdown_shooter/cursors/6crosshair.png';
  }

  createEventSubscriptions() {
    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement === this.canvas) {
        document.addEventListener('mousemove', this.callbackMousemove);
      } else {
        document.removeEventListener('mousemove', this.callbackMousemove);
      }
    });
  }

  updateMousemove(event: MouseEvent) {
    this.cursorPosition.add({ x: event.movementX, y: event.movementY });
    checkPositionByField(this.cursorPosition, window.innerWidth, window.innerHeight);
  }

  draw() {
    this.ctx.drawImage(this.image, this.cursorPosition.x, this.cursorPosition.y);
  }
}
