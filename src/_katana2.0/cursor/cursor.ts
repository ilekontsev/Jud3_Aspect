import { Vec2 } from 'src/_katana/main/vector/vec2';
import { checkPositionByField } from 'src/_katana/shared/utils';

export class Cursor {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private image = new Image();
  private _cursorPosition = new Vec2({ x: 0, y: 0 });
  private initSub = false;

  private callbackEvents;
  private callbackMousemove;
  private callbackMouseClick;

  public get cursorPosition() {
    return this._cursorPosition;
  }

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.init();
  }

  private init(): void {
    this.loadImage();
    this.setBindCallback();
    this.createPointerlockchange();
  }

  private loadImage(): void {
    this.image.src = 'assets/topdown_shooter/cursors/6crosshair.png';
  }

  private setBindCallback(): void {
    this.callbackEvents = this.createEventSubscriptions.bind(this);
    this.callbackMousemove = this.updateMousemove.bind(this);
    this.callbackMouseClick = this.updateCursorPosition.bind(this);
  }

  private createPointerlockchange(): void {
    this.callbackEvents();
    document.addEventListener('pointerlockchange', this.callbackEvents);
  }

  private createEventSubscriptions(): void {
    if (document.pointerLockElement === this.canvas) {
      document.addEventListener('mousemove', this.callbackMousemove);
      this.canvas.removeEventListener('click', this.callbackMouseClick);
    } else {
      document.removeEventListener('mousemove', this.callbackMousemove);
      this.createEventMouseCLickSubscription();
    }
  }

  private createEventMouseCLickSubscription(): void {
    this.canvas.addEventListener('click', this.callbackMouseClick);
  }

  private updateCursorPosition(event: MouseEvent): void {
    this._cursorPosition.set({
      x: event.offsetX,
      y: event.offsetY,
    });
  }

  private updateMousemove(event: MouseEvent): void {
    this._cursorPosition.add({
      x: event.movementX,
      y: event.movementY,
    });

    const offset = 20;
    checkPositionByField(
      this.cursorPosition,
      this.canvas.width - offset,
      this.canvas.height - offset,
    );
  }

  public draw(): void {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.drawImage(this.image, this.cursorPosition.x, this.cursorPosition.y);
  }
}
