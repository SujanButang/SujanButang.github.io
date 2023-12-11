export class Stage {
  constructor() {
    this.background = document.querySelector('img[alt="background"]');
  }

  update() {}
  draw(ctx, camera) {
    ctx.drawImage(this.background, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
