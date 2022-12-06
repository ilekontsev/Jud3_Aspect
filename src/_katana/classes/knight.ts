import { BaseCharter } from '../baseClasses/charter';

export class Knight extends BaseCharter {
  image = new Image();

  constructor(canvas, ctx, options) {
    super(canvas, ctx, options);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    this.image.crossOrigin = 'anonymous';
    this.image.src = 'assets/img/knight.png';
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0);
    };
  }

  render() {
    this.key();
    this.renderIcon();
    this.calcAngle();
  }

  renderIcon() {
    this.rotate();

    this.ctx.drawImage(
      this.image,

      this.position.coordinates.x - 50,
      this.position.coordinates.y - 50,

      100,
      100
    );

    // this.ctx.beginPath();

    // this.ctx.fillRect(
    //   this.position.coordinates.x,
    //   this.position.coordinates.y,
    //   10,
    //   10
    // );
    // this.ctx.moveTo(
    //   this.position.coordinates.x + 20,
    //   this.position.coordinates.y + 10
    // );
    // this.ctx.lineTo(
    //   this.position.coordinates.x,
    //   this.position.coordinates.y + 10
    // );

    // this.ctx.stroke();
  }
}
