export class Fire {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.frames = new Map([
      ["fire-1", [9, 7, 77, 84]],
      ["fire-2", [107, 7, 90, 84]],
      ["fire-3", [222, 7, 89, 85]],
    ]);

    this.currentFrame = "fire-1";
    this.image = document.querySelector('img[alt="fire"]');
  }
  setPosition(position) {
    this.position = { x: position.x, y: position.y };
  }

  update() {
    // Add logic here to update frames, if needed
  }

  draw(context) {
    const frame = this.frames.get(this.currentFrame);
    console.log(this.position);
    // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(
      this.image,
      // frame[0],
      // frame[1],
      // frame[2],
      // frame[3],
      // this.position.x,
      // this.position.y,
      // frame[2],
      // frame[3]
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );
    console.log("drawn");
  }

  // Add a method to switch to the next frame
  nextFrame() {
    const frameKeys = Array.from(this.frames.keys());
    const currentIndex = frameKeys.indexOf(this.currentFrame);
    const nextIndex = (currentIndex + 1) % frameKeys.length;
    this.currentFrame = frameKeys[nextIndex];
  }
}
