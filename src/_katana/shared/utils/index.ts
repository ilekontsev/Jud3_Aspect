export function inRad(num) {
  return (num * 180) / Math.PI;
}

export function checkPositionByField(target, fieldX, filedY) {
  if (target.x > fieldX) {
    target.x = fieldX;
  }
  if (target.x < 0) {
    target.x = 0;
  }
  if (target.y > filedY) {
    target.y = filedY;
  }
  if (target.y < 0) {
    target.y = 0;
  }
}
