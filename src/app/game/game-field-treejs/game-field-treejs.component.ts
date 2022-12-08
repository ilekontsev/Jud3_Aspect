import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game-field-treejs',
  templateUrl: './game-field-treejs.component.html',
  styleUrls: ['./game-field-treejs.component.scss'],
})
export class GameFieldTreejsComponent implements OnInit {
  @ViewChild('canvas') readonly canvas;
  ctx: CanvasRenderingContext2D;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;

    setInterval(() => {
      this.rotateAngle += 2;
      this.render();
    }, 35);
  }
  rotateAngle = 35;
  render() {
    const x = this.canvas.nativeElement.width / 2;
    const y = this.canvas.nativeElement.height / 2;


    this.ctx.save();
    this.ctx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.ctx.strokeRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.ctx.save();






    this.ctx.fillRect(30, 30, 50, 50);
    this.ctx.beginPath();
    this.ctx.moveTo(50, 30);
    this.ctx.lineTo(50, 10);
    this.ctx.stroke();
    this.ctx.save();



    this.ctx.fillRect(100, 100, 100, 100);
    this.ctx.save();

    this.ctx.beginPath();
    this.ctx.moveTo(0, window.innerHeight / 2);
    this.ctx.lineTo(window.innerWidth, window.innerHeight / 2);
    this.ctx.moveTo(window.innerWidth / 2, 0);
    this.ctx.lineTo(window.innerWidth / 2, window.innerHeight);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.translate(x, y);
    const angle = (this.rotateAngle * Math.PI) / 180;
    this.ctx.rotate(angle);
    this.ctx.fillRect(250 - 300, 100 - 150, 100, 100);
    this.ctx.restore();

    // window.requestAnimationFrame(this.render.bind(this));
  }
}
