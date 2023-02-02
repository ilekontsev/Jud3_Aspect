import { MENU } from 'src/app/game/game-field-jud3/constants/path-presets';
import { ActionButtons } from './actionButton';

export class Slider {
  options;
  ctx;
  canvas;
  images = [];
  key: string;
  selectedImage;
  size = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
  position = {
    x: 0,
    y: 0,
  };
  buttons = [];
  keyImage: string;
  positionButtons = {
    next: {
      location: 1,
    },
    prev: {
      location: -1,
    },
  };

  constructor(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.key = options.key;
    this.size = options.size ? options.size : this.size;
    this.position = options.position ? options.position : this.position;
    this.init();
  }

  init() {
    this.loadImages();
  }

  loadImages() {
    for (let key in this.options.image) {
      const image = new Image();
      image.src = this.options.image[key];
      this.images.push({ image, key });
    }
    this.selectedImage = this.images[0].image;
    this.keyImage = this.images[0].key;

    for (let key in MENU.sliders) {
      this.createAction(key, MENU.sliders[key]);
    }
  }

  count = 0;
  createAction(key, images) {
    const t = (key) => {
      if (key === 'next') {
        this.count++;
      } else {
        this.count--;
      }
      this.setIcon(this.count);
    };
    const button = new ActionButtons({
      canvas: this.canvas,
      ctx: this.ctx,
      key,
      images,
      callback: t,
      position: {
        x:
          this.positionButtons[key].location === 1
            ? this.position.x + this.size.x + 20
            : this.position.x - 120,
        y: this.position.y + 30,
      },
      size: {
        x: 100,
        y: 100,
      },
    });

    this.buttons.push(button);
  }

  setIcon(index = 0) {
    if (this.images.length - 1 < index) {
      this.count = 0;
    } else if (index < 0) {
      this.count = this.images.length - 1;
    }
    index = this.count;
    this.keyImage = this.images[index].key;
    this.selectedImage = this.images[index].image;
  }

  update(mouse) {
    this.buttons.forEach((item) => {
      item.update();
      item.mouse = mouse;
    });
  }

  draw() {
    this.buttons.forEach((button) => {
      button.draw();
    });

    this.ctx.drawImage(
      this.selectedImage,
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    );
  }

  destroy() {
    this.buttons.forEach((button) => {
      button.destroy();
    });
  }
}
