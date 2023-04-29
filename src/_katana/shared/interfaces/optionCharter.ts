import { Cursor } from 'src/_katana2.0/cursor/cursor';

export interface Options {
  speed: number;
  attackSpeed: number;
  position: Position;
  angle: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

export interface Context {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export interface BaseCharterOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  position: Position;
  nickname: string;
  configCharter?: any;
  cursor: Cursor;
}

export interface ConfigCharter {
  speed: number;
  attack: number;
  size: Size;
  images: ImageData;
  position: {
    x: number;
    y: number;
  };
}
