import { GameHelper } from './../game/gameHelper';
import { checkPositionByField } from '../shared/utils';

export class Cursor {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  image = new Image();

  callbackMousemove;

  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = options.ctx;
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
    GameHelper.cursorPosition.add({ x: event.movementX, y: event.movementY });
    checkPositionByField(
      GameHelper.cursorPosition,
      window.innerWidth,
      window.innerHeight
    );
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      GameHelper.cursorPosition.x,
      GameHelper.cursorPosition.y

    );
  }
}
