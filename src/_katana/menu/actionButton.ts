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

  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.imageSrc = options.images;
    this.size = options.size;
    this.key = options.key;
    this.position.set(options.position);
    this.init();
  }

  init() {
    this.loadedImages();
    this.createEventSubscriptions();
  }

  loadedImages() {
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

    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement === this.canvas) {
        document.addEventListener('mousemove', callbackMousemover);
        document.addEventListener('mousedown', callbackMousedown);
        document.addEventListener('mouseup', callbackMouseup);
      } else {
        document.removeEventListener('mousemove', callbackMousemover);
        document.removeEventListener('mousedown', callbackMousedown);
        document.removeEventListener('mouseup', callbackMouseup);
      }
    });
  }

  updateMousemove(event) {
    this.mouse.x += event.movementX;
    this.mouse.y += event.movementY;
  }

  isCheckPosition() {
    return (
      this.mouse.x >= this.position.x &&
      this.mouse.x <= this.position.x + this.size.x &&
      this.mouse.y >= this.position.y &&
      this.mouse.y <= this.position.y + this.size.y
    );
  }

  updateMousedown() {
    if (this.isCheckPosition()) {
      this.flagMouseDown = true;
    }
  }

  updateMouseup() {
    if (this.flagMouseDown && this.isCheckPosition()) {
      this.click = true;
    } else {
      this.click = false;
      this.flagMouseDown = false;
    }
  }

  render() {
    this.update();
    this.draw();
  }

  update() {
    if (this.isCheckPosition() || this.click || this.flagMouseDown) {
      this.selectedImage =
        this.click || this.flagMouseDown
          ? this.images['active']
          : this.images['hover'];
    } else {
      this.selectedImage = this.images['default'];
    }
  }

  draw() {
    this.ctx.drawImage(this.selectedImage, this.position.x, this.position.y);
  }
}
