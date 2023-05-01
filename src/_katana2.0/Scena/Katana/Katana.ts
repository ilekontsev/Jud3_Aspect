import { Game } from '../Game/Game';
import { Menu } from '../Menu/Menu';

export class Katana {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private gameScene: Game | Menu;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.init();
  }

  private init(): void {
    this.initCanvas();
    this.createGameScene('GAME');
    this.render();
  }

  private initCanvas(): void {
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.canvas.onclick = () => {
      this.canvas.requestPointerLock();
    };
  }

  createGameScene(scene, config?: any) {
    switch (scene) {
      case 'MENU':
        this.gameScene = null;
        break;
      case 'GAME':
        this.gameScene = new Game(this.canvas, this.ctx, {
          map: {
            scale: 3,
          },
          base: {
            scale: 5,
          },
        });
        break;
      default:
        break;
    }
  }

  public update(): void {
    this.gameScene.update();
  }

  public draw(): void {
    this.gameScene.draw();
    this.lineHorizontalVertical();
  }

  lineHorizontalVertical() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, window.innerHeight / 2);
    this.ctx.lineTo(window.innerWidth, window.innerHeight / 2);
    this.ctx.moveTo(window.innerWidth / 2, 0);
    this.ctx.lineTo(window.innerWidth / 2, window.innerHeight);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  public render(): void {
    this.update();
    this.draw();
    window.requestAnimationFrame(this.render.bind(this));
  }
}
