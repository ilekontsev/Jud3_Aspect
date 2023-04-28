import { ConfigCharter } from 'src/_katana/shared/interfaces/optionCharter';

export interface IBase {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  config: ConfigCharter;
}
