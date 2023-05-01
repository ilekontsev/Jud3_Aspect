export class Camera {
  x;
  y;
  constructor(x, y) {
    // x and y are top-left coordinates of the camera rectangle relative to the map.
    // This rectangle is exctaly cvs.width px wide and cvs.height px tall.
    this.x = x || 0;
    this.y = y || 0;
  }

  focus(cvs, map, player) {
    // Account for half of player w/h to make their rectangle centered
    this.x = this.clamp(player.config.position.x - cvs.width / 2 + player.config.size.w / 2, 0, map.config.size.w * map.config.scale - cvs.width);
    this.y = this.clamp(player.config.position.y - cvs.height / 2 + player.config.size.h / 2, 0, map.config.size.h * map.config.scale - cvs.height);
    }

  clamp(coord, min, max) {
    if (coord < min) {
      return min;
    } else if (coord > max) {
      return max;
    } else {
      return coord;
    }
  }
}
