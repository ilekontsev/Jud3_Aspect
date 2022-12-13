import { GameHelper } from './../game/gameHelper';
import { Helper } from 'src/_katana/menu/helper';
import { Vec2 } from '../shared/utils/vec2';

export class ActionButtons {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  selectedImage: HTMLImageElement;

  position = new Vec2({ x: 0, y: 0 });
  mouse = {
    x: 0,
    y: 0,
  };
  size = {
    x: 0,
    y: 0,
  };
  imageSrc = {};
  images = {};
  key: string;
  click = false;
  flagMouseDown = false;
  options;
  callbackMousedown;
  callbackMouseup;
  callbackEvents;

  initSubscription = false;

  constructor(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.imageSrc = options.images;
    this.size = options.size;
    this.key = options.key;
    this.position.set(options.position);
    this.callbackMousedown = this.updateMousedown.bind(this);
    this.callbackMouseup = this.updateMouseup.bind(this);
    this.callbackEvents = this.createEventSubscriptions.bind(this);
    this.init();
  }

  init() {
    this.loadedImages();
    this.createPointerlockchange();
    this.createEventSubscriptions();
    this.selectedImage = this.images['default'];
  }

  loadedImages() {
    for (let key in this.imageSrc) {
      const image = new Image();
      image.src = this.imageSrc[key];
      this.images[key] = image;
    }
  }

  createPointerlockchange() {
    document.addEventListener('pointerlockchange', this.callbackEvents);
  }

  createEventSubscriptions() {
    if (document.pointerLockElement === this.canvas) {
      document.addEventListener('mousedown', this.callbackMousedown);
      document.addEventListener('mouseup', this.callbackMouseup);
    } else {
      document.removeEventListener('mousedown', this.callbackMousedown);
      document.removeEventListener('mouseup', this.callbackMouseup);
    }
  }

  destroy() {
    document.removeEventListener('mousedown', this.callbackMousedown);
    document.removeEventListener('mouseup', this.callbackMouseup);
    document.removeEventListener('pointerlockchange', this.callbackEvents);
  }

  isCheckPosition() {
    this.mouse = GameHelper.cursorPosition;
    return (
      this.mouse.x >= this.position.x &&
      this.mouse.x <= this.position.x + this.size.x &&
      this.mouse.y >= this.position.y &&
      this.mouse.y <= this.position.y + this.size.y
    );
  }

  updateMousedown(event: MouseEvent) {
    event.preventDefault();
    if (this.isCheckPosition()) {
      this.flagMouseDown = true;
    }
  }

  updateMouseup(event: MouseEvent) {
    event.preventDefault();

    if (this.flagMouseDown && this.isCheckPosition()) {
      this.click = true;
    } else {
      this.click = false;
      this.flagMouseDown = false;
    }
  }

  update() {
    if (this.isCheckPosition() || this.click || this.flagMouseDown) {
      this.selectedImage =
        this.click || this.flagMouseDown
          ? this.images['active']
          : this.images['hover'];

      if (this.click) {
        this.options.callback && this.options.callback(this.key);
        Helper.button.key.next(this.key);
        this.click = false;
        this.flagMouseDown = false;
      }
    } else {
      this.selectedImage = this.images['default'];
    }
  }

  draw() {
    this.ctx.drawImage(
      this.selectedImage,
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    );
  }
}
