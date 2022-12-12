import { Warrior } from '../classes/Warrior';
export class InfinityMode {
  options;
  player;
  constructor(options) {
    this.options = options;
    this.init();
  }

  init() {
    this.player = new Warrior({...this.options, position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    nickname: 'zllodey'});
  }

  update() {
    this.player.update();
  }

  draw() {
    this.player.draw();
  }
}
