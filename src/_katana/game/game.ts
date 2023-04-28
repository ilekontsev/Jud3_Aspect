import { ArenaMode } from '../gameMode/arenaMode';
import { DefenseMode } from '../gameMode/defenseMode';
import { InfinityMode } from '../gameMode/infinityMode';
import { PATH_PRESETS } from 'src/app/game/game-field-jud3/constants/path-presets';
import { GameHelper } from './gameHelper';
import { Gun } from '../gameObject/guns/gun';
import { Projectile } from '../fysics/projectile';
import { Berserker } from '../gameObject/charters/Berserker';
import { Hunter } from '../gameObject/charters/Hunter';
import { Warrior } from '../gameObject/charters/Warrior';

export class Game {
  options;
  game;
  player;
  gun: Gun;
  objects = [];

  image = new Image();

  constructor(options) {
    this.options = options;
    this.init();
    this.image.src = PATH_PRESETS.mapGame;
  }

  init(): void {
    this.initGame();
    this.initGun();
    this.initCharter();
  }

  initGame(): void {
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

  initCharter(): void {
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

  initGun(): void {
    this.gun = new Gun(this.options);

    setInterval(() => {
      this.gun = null;
    }, 5000);
  }

  render(): void {
    this.update();
    this.draw();
  }

  update(): void {
    this.game.update();

    this.objects.forEach((item) => {
      item.update();
    });

    this.player.update();
    this.gun?.update();
    Projectile.checkCollision();
  }

  draw(): void {
    this.options.ctx.drawImage(
      this.image,
      -(window.innerWidth * 2) - GameHelper.charterPosition.x,
      -(window.innerHeight * 2) - GameHelper.charterPosition.y,
      window.innerWidth * 4,
      window.innerHeight * 4,
    );

    this.objects.forEach((item) => {
      item.draw();
    });

    this.game.draw();
    this.player.draw();
    this.gun?.draw();
  }
}
