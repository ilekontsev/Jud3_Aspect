import { GameHelper } from 'src/_katana/game/gameHelper';
import { getAngleByCursor, checkAngleForIcon } from 'src/_katana/shared/utils';
import { CannonGun } from './canonGun';

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

    this.init();
  }

  init() {
    this.setBindCallback();
    this.createPointerlockchange();
    this.createGun();
  }

  destroy() {
    document.removeEventListener('keydown', this.callbackKeydown);
    document.removeEventListener('keyup', this.callbackKeyup);
    document.removeEventListener('pointerlockchange', this.callbackEvents);
  }

  createGun() {
    this.gun = new CannonGun(this.options);
  }

  //подписки
  createPointerlockchange() {
    document.addEventListener('pointerlockchange', this.callbackEvents);
  }

  setBindCallback() {
    this.callbackEvents = this.createEventSubscriptions.bind(this);
    this.callbackKeydown = this.updateKeydown.bind(this);
    this.callbackKeyup = this.updateKeyup.bind(this);
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

  updateKeydown(event) {
    this.gun.keys[event.code] = true;
  }

  updateKeyup(event) {
    this.gun.keys[event.code] = false;
  }

  setAngle() {
    const angle = getAngleByCursor(GameHelper.cursorPosition);
    const obj = checkAngleForIcon(angle);
    this.gun.setIcon(obj);
  }

  update() {
    this.setAngle();
    this.gun.update();
  }

  draw() {
    this.gun.draw();
  }
}
