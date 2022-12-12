import { MENU } from 'src/app/game/game-field-jud3/constants/path-presets';
import { Cursor } from '../baseClasses/cursor';
import { MenuHelper } from './ menuHelper';
import { Background } from './background';
import { MenuButton } from './MenuButton';
import { Single } from './single';

export class Menu {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private options: any;

  private cursor: Cursor;
  private background: Background;

  private imageSrc = { logo: MENU.logo };
  private images = {};

  private key = 'menu';
  private classStep: any;

  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.options = options;
    this.init();
  }

  init() {
    this.loadImage();

    this.createBackground();
    this.createMenu();
    this.createCursor();

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
    MenuHelper.event.subscribe((res) => {
      this.key = res;
      this.createMenu();
    });
  }

  createBackground() {
    this.background = new Background(this.options);
  }

  createCursor() {
    this.cursor = new Cursor(this.options);
  }

  createMenu() {
    this.classStep?.destroy();

    switch (this.key) {
      case 'single':
        this.classStep = new Single(this.options);
        break;
      case 'cancel':
      case 'menu':
        this.classStep = new MenuButton(this.options);

        break;
      default:
        this.classStep = new MenuButton(this.options);

        break;
    }
  }

  render() {
    this.update();
    this.draw();
  }

  update() {
    this.classStep.update();
    this.classStep.mouse = this.cursor.mouse;
  }

  draw() {
    this.background.render();

    this.ctx.drawImage(
      this.images['logo'],
      window.innerWidth / 2 - 340,
      -100,
      700,
      700
    );

    this.classStep.draw();

    this.cursor.draw();
  }
}
