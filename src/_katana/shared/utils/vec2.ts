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
    this.coordinates.x += otherCoordinates.x;
    this.coordinates.y += otherCoordinates.y;

    return this.coordinates;
  }

  multScalar(scalar: number): Coordinates {
    this.coordinates.x *= +scalar;
    this.coordinates.y *= +scalar;

    return this.coordinates;
  }
}
