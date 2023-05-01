export function inDeg(num) {
  return (num * 180) / Math.PI;
}

export function checkPositionByField(target, fieldX, filedY) {
  if (target.x >= fieldX) {
    target.x = fieldX;
  }
  if (target.x < 0) {
    target.x = 0;
  }
  if (target.y >= filedY) {
    target.y = filedY;
  }
  if (target.y < 0) {
    target.y = 0;
  }
}

export function getAngleByCursor(
  mouse,
  x = window.innerWidth / 2,
  y = window.innerHeight / 2
) {
  return Math.atan2(mouse.y - y,  mouse.x - x);
}

export function checkAngleForIcon(angle) {
  const angleDeg = inDeg(angle);
  const obj = {
    key: 'down',
    reflect: false,
  };
  //diag up
  if (angleDeg < -10 && angleDeg > -80) {
    obj.key = 'diagUp';
  }

  if (angleDeg < -100 && angleDeg > -170) {
    obj.key = 'diagUp';
    obj.reflect = true;
  }

  //diag down
  if (angleDeg > 10 && angleDeg < 80) {
    obj.key = 'diagDown';
  }

  if (angleDeg < 170 && angleDeg > 100) {
    obj.key = 'diagDown';
    obj.reflect = true;
  }

  //left
  if (angleDeg > -10 && angleDeg < 10) {
    obj.key = 'side';
  }
  //right
  if (angleDeg > 170 || angleDeg < -170) {
    obj.key = 'side';
    obj.reflect = true;
  }
  //up
  if (angleDeg > -100 && angleDeg < -80) {
    obj.key = 'up';
  }

  //down
  if (angleDeg > 80 && angleDeg < 100) {
    obj.key = 'down';
  }
  return obj;
}
