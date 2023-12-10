export class Stage {
  constructor() {
    this.background = document.querySelector('img[alt="background"]');
  }

  update() {}
  draw(ctx) {
    const canvas = ctx.canvas;

    // Calculate the scaling factors to fit the background within the canvas
    const scaleX = canvas.width / this.background.width;
    const scaleY = canvas.height / this.background.height;

    // Choose the minimum scaling factor to ensure the entire background is visible
    const scale = Math.max(scaleX, scaleY);

    // Calculate the new dimensions for the background
    const newWidth = this.background.width * scale;
    const newHeight = this.background.height * scale;

    // Calculate the centering offsets
    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    // Draw the background with the new dimensions and offsets
    ctx.drawImage(this.background, offsetX, offsetY, newWidth, newHeight);
  }
}
