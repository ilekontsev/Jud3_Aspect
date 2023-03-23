export class DeltaTime {
  private lastFrame = +new Date();

  get() {
    const currentFrame = +new Date();
    const dt = currentFrame - this.lastFrame;
    this.lastFrame = currentFrame;
    return dt;
  }
}
