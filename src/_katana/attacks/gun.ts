import { CannonGun } from '../baseClasses/canonGun';
import { GameHelper } from '../game/gameHelper';
import { getAngleByCursor, checkAngleForIcon } from '../shared/utils';

export class Gun {
  options;
  gun: any;
  canvas;
  callbackEvents;
  callbackKeydown;
  callbackKeyup;

  constructor(options) {
    this.canvas = options.canvas;
    this.options = options;
    this.callbackEvents = this.createEventSubscriptions.bind(this);
    this.callbackKeydown = this.updateKeydown.bind(this);
    this.callbackKeyup = this.updateKeyup.bind(this);
    this.createPointerlockchange();
    this.init();
  }

  createPointerlockchange() {
    document.addEventListener('pointerlockchange', this.callbackEvents);
  }

  createEventSubscriptions() {
    if (document.pointerLockElement === this.canvas) {
      document.addEventListener('keydown', this.callbackKeydown);
      document.addEventListener('keyup', this.callbackKeyup);
    } else {
      document.removeEventListener('keydown', this.callbackKeydown);
      document.removeEventListener('keyup', this.callbackKeyup);
    }
  }

  destroy() {
    document.removeEventListener('keydown', this.callbackKeydown);
    document.removeEventListener('keyup', this.callbackKeyup);
    document.removeEventListener('pointerlockchange', this.callbackEvents);
  }

  updateKeydown(event) {
    this.gun.keys[event.code] = true;
  }

  updateKeyup(event) {
    this.gun.keys[event.code] = false;
  }

  init() {
    this.createGun();
  }

  createGun() {
    this.gun = new CannonGun(this.options);
  }

  update() {
    this.gun.update();
    const angle = getAngleByCursor(GameHelper.cursorPosition);
    const obj = checkAngleForIcon(angle);
    this.gun.setIcon(obj);
  }

  draw() {
    this.gun.draw();
  }
}
