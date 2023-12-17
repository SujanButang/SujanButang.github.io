export class Stage {
  constructor() {
    this.background =
      localStorage.getItem("stage") == "Gizard Wasteland"
        ? document.querySelector('img[alt="wasteland"]')
        : document.querySelector('img[alt="background"]');
    this.audio =
      localStorage.getItem("stage") == "Gizard Wasteland"
        ? document.querySelector("audio#plains")
        : document.querySelector("audio#rocky");
  }

  update() {}
  draw(ctx, camera) {
    this.audio.play();
    ctx.drawImage(this.background, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
