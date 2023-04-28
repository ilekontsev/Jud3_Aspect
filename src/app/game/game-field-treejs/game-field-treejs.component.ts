import { Component, OnInit, ViewChild } from '@angular/core';
import { CONFIG } from 'src/_katana/main/actions/move/moveConfig';
import { DeltaTime } from 'src/_katana/main/delta-time/deltaTime';
import { Vec2 } from 'src/_katana/main/vector/vec2';


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
    document.addEventListener('keydown', (event) => {
      this.keys[event.code] = true;
    });

    document.addEventListener('keyup', (event) => {
      this.keys[event.code] = false;
    });

    setInterval(() => {
      this.rotateAngle += 2;
      this.render();
    }, 35);
  }
  rotateAngle = 35;

  keys = {};
  velocity = new Vec2({ x: 0, y: 0 });

  stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  pressKey() {
    this.stop();

    if (this.keys[CONFIG.left]) {
      this.velocity.x = -0.3;
    }
    if (this.keys[CONFIG.right]) {
      this.velocity.x = +0.3;
    }
    if (this.keys[CONFIG.up]) {
      this.velocity.y = -0.3;
    }
    if (this.keys[CONFIG.down]) {
      this.velocity.y = +0.3;
    }

    this.move();
  }
  deltaTime = new DeltaTime();
  position = new Vec2({ x: 0, y: 0 });
  move() {
    const dt = this.deltaTime.get();

    this.position.add(this.velocity.multScalar(dt));
  }

  render() {
    const x = this.canvas.nativeElement.width / 2;
    const y = this.canvas.nativeElement.height / 2;

    this.pressKey();
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

    this.ctx.fillRect(30 - this.position.x, 30 - this.position.y, 50, 50);
    this.ctx.beginPath();
    this.ctx.moveTo(50 - this.position.x, 30 - this.position.y);
    this.ctx.lineTo(50 - this.position.x, 10 - this.position.y);
    this.ctx.stroke();
    this.ctx.save();

    this.ctx.fillRect(100 - this.position.x, 100 - this.position.y, 100, 100);


    this.ctx.fillRect(-230 - this.position.x, -330 - this.position.y, 50, 50);

    this.ctx.save();

    this.ctx.beginPath();
    this.ctx.moveTo(0, window.innerHeight / 2);
    this.ctx.lineTo(window.innerWidth, window.innerHeight / 2);
    this.ctx.moveTo(window.innerWidth / 2, 0);
    this.ctx.lineTo(window.innerWidth / 2, window.innerHeight);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.save();

    this.ctx.translate(x, y);

    const angle = (this.rotateAngle * Math.PI) / 180;
    this.ctx.rotate(angle);
    this.ctx.fillRect(250 - 300, 100 - 150, 100, 100);
    this.ctx.restore();

    // window.requestAnimationFrame(this.render.bind(this));
  }
}
