export interface Options {
  speed: number;
  attackSpeed: number;
  position: Position;
  angle: number;
}

export interface Position{
  x: number;
  y: number;
}

export interface BaseCharterOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  position: Position;
  nickname: string;
}
