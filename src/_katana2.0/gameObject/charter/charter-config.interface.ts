import { Position, Size } from 'src/_katana2.0/shared/utils/interfaces/options';

export interface CharterConfig {
  position: Position;
  size: Size;
  scale: number;
  images: Record<string, HTMLImageElement>;
  attack: number;
  speed: number;
}
