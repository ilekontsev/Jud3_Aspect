import { Cursor } from 'src/_katana2.0/cursor/cursor';

export interface Options {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
}

export interface CharterOptions extends Options {
  nickname: string;
  position: Position;
  cursor: Cursor;
}

export interface IBasePlayer {
  position: Position;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}
