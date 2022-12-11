import { MENU } from 'src/app/game/game-field-jud3/constants/path-presets';
import { Cursor } from '../baseClasses/cursor';
import { checkPositionByField } from '../shared/utils';
import { Background } from './background';
import { Button } from './button';
import { Single } from './single';

export class Menu {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  public cursor: Cursor;

  imageSrc = { logo: MENU.logo };
  images = {};

  background: Background;
  button: Button;
  mouse = {
    x: 0,
    y: 0,
  };
  constructor(options) {
    this.canvas = options.canvas;
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.init();
  }

  init() {
    this.loadImage();
    this.createBackGround();
    this.createButtons();
    this.createMenu();
    this.cursor = new Cursor(this.ctx);

    this.createEventSubscriptions();
  }

  loadImage() {
    for (let key in this.imageSrc) {
      const image = new Image();
      image.src = this.imageSrc[key];
      this.images[key] = image;
    }
  }

  createEventSubscriptions() {
    const callbackMousemover = this.updateMousemove.bind(this);
    const callbackMousedown = this.updateMousedown.bind(this);
    const callbackMouseup = this.updateMouseup.bind(this);
    const callbackKeydown = this.updateKeydown.bind(this);
    const callbackKeyup = this.updateKeyup.bind(this);

    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement === this.canvas) {
        document.addEventListener('mousemove', callbackMousemover);
        document.addEventListener('mousedown', callbackMousedown);
        document.addEventListener('mouseup', callbackMouseup);
        document.addEventListener('keydown', callbackKeydown);
        document.addEventListener('keyup', callbackKeyup);
      } else {
        document.removeEventListener('mousemove', callbackMousemover);
        document.removeEventListener('mousedown', callbackMousedown);
        document.removeEventListener('mouseup', callbackMouseup);
        document.removeEventListener('keydown', callbackKeydown);
        document.removeEventListener('keyup', callbackKeyup);
      }
    });
  }

  updateKeyup() {}

  updateKeydown() {}

  updateMouseup() {}

  updateMousedown() {}

  updateMousemove(event: MouseEvent) {
    this.mouse.x += event.movementX;
    this.mouse.y += event.movementY;
    checkPositionByField(this.mouse, window.innerWidth, window.innerHeight);
  }

  createBackGround() {
    this.background = new Background(this.ctx);
  }

  createButtons() {
    this.button = new Button({ canvas: this.canvas, ctx: this.ctx });
  }

  single;
  createMenu() {
    this.single = new Single({ ctx: this.ctx });
  }

  render() {
    this.update();
    this.draw();
  }

  update() {
    this.button.update();
    this.key = this.button.key;
    this.cursor.update(this.mouse);
  }

  key = null;
  draw() {
    this.background.render();

    this.ctx.drawImage(
      this.images['logo'],
      window.innerWidth / 2 - 300,
      0,
      700,
      700
    );
    switch ('single') {
      case 'single':
        this.single.draw();
        break;
      default:
        this.button.draw();
    }

    this.cursor.draw();
  }
}
