import { Coordinates } from './interfaces';

export class Vec2 {
  coordinates = {
    x: 0,
    y: 0,
  };

  constructor(coordinates: Coordinates) {
    this.coordinates = coordinates;
  }

  add(otherCoordinates: Coordinates): Coordinates {
    if (this.coordinates.x < 0) {
      this.coordinates.x = 0;
    } else if (this.coordinates.x > window.innerWidth) {
      this.coordinates.x = window.innerWidth;
    } else {
      this.coordinates.x += otherCoordinates.x;
    }
    if (this.coordinates.y < 0) {
      this.coordinates.y = 0;
    } else if (this.coordinates.y > window.innerHeight) {
      this.coordinates.y = window.innerHeight;
    } else {
      this.coordinates.y += otherCoordinates.y;
    }
    return this.coordinates;
  }

  multScalar(scalar: number): Coordinates {
    this.coordinates.x *= +scalar;

    this.coordinates.y *= +scalar;

    return this.coordinates;
  }
}
