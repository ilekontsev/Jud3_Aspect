import { InfinityMode } from './infinityMode';

export class Game {
  options;
  game;
  constructor(options) {
    this.options = options;
    this.init();
  }

  init() {
    this.game = new InfinityMode(this.options);
  }

  render() {
    this.update();
    this.draw();
  }

  update() {
    this.game.update()
  }

  draw() {
    this.game.draw()

  }
}
