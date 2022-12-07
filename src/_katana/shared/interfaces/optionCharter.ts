export interface OptionsObject {
  speed: number;
  attackSpeed: number;
  position: PositionObject;
  angle: number;
}

export interface PositionObject {
  x: number;
  y: number;
}

export interface BaseCharterOptions {
  position: PositionObject;
}