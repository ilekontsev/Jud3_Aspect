import { Gun } from '../attacks/gun';
import { Berserker } from '../classes/Berserker';
import { Hunter } from '../classes/Hunter';
import { Warrior } from './../classes/Warrior';
import { ArenaMode } from './arenaMode';
import { DefenseMode } from './defenseMode';
import { InfinityMode } from './infinityMode';

export class Game {
  options;
  game;
  player;
  gun;

  constructor(options) {
    this.options = options;
    this.init();
  }

  init() {
    this.initGame();
    this.initGun();
    this.initCharter();
  }

  initGame() {
    switch (this.options.config.mode) {
      case 'infinity':
        this.game = new InfinityMode(this.options);
        break;
      case 'defense':
        this.game = new DefenseMode(this.options);
        break;
      case 'arena':
        this.game = new ArenaMode(this.options);
        break;
      default:
        break;
    }
  }

  initCharter() {
    switch (this.options.config.class) {
      case 'warrior':
        this.player = new Warrior(this.options);
        break;
      case 'berserker':
        this.player = new Berserker(this.options);
        break;
      case 'hunter':
        this.player = new Hunter(this.options);
        break;
      default:
        break;
    }
  }

  initGun() {
    this.gun = new Gun(this.options);
  }

  render() {
    this.update();
    this.draw();
  }

  update() {
    this.game.update();
    this.player.update();
    this.gun.update();
  }

  draw() {
    this.game.draw();

    this.player.draw();
    this.gun.draw();
  }
}
