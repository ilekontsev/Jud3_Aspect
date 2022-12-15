export class Projectile {
  options: any;
  static staticObjects = [];
  static dynamicObjects = [];

  static bullets: any = [];

  constructor(options) {
    this.options = options;
  }

  static checkCollision() {
    const share = [...this.staticObjects, ...this.dynamicObjects];
    for (let i of this.bullets) {
      for (let j of share) {
        if (this.MacroCollision(i, j)) {
          i.active = false;
          j?.hpBar && j?.hpBar.setIcon();
          break;
        }
      }
    }
  }

  static MacroCollision(bullet, obj) {
    const checkRight =
      bullet.position.x + window.innerWidth / 2 <
      obj.position.x + obj.size.w / 2;
    const checkLeft =
      bullet.position.x + window.innerWidth / 2 >
      obj.position.x - obj.size.w / 2;

    const checkTop =
      bullet.position.y + window.innerHeight / 2 >
      obj.position.y - obj.size.h / 2;

    const checkBottom =
      bullet.position.y + window.innerHeight / 2 <
      obj.position.y + obj.size.h / 2;

    if (checkRight && checkLeft && checkBottom && checkTop) {
      return true;
    }
    return false;
  }
}
