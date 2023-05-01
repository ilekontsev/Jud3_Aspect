import { Coordinates } from '../../shared/utils/interfaces';

export class Vec2 {
  x = 0;
  y = 0;

  constructor(coordinates: Coordinates) {
    this.x = coordinates.x;
    this.y = coordinates.y;
  }

  get(): Coordinates {
    return { x: this.x, y: this.y };
  }

  set(otherCoordinates: Coordinates): void {
    this.x = otherCoordinates?.x || this.x;
    this.y = otherCoordinates?.y || this.y;
  }

  add(otherCoordinates: Coordinates): Coordinates {
    this.x += otherCoordinates.x;
    this.y += otherCoordinates.y;

    return this;
  }

  multScalar(scalar: number): Coordinates {
    this.x *= +scalar;
    this.y *= +scalar;

    return this;
  }
}
