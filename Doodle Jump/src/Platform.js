class Platform {
  constructor(position, height, width, imageSrc, ctx, doodler) {
    this.x = position.x;
    this.y = position.y;
    this.height = height;
    this.width = width;
    // this.animations = animations;
    this.imageSrc = imageSrc;
    this.ctx = ctx;
    this.doodler = doodler;
    this.updatePlatform = this.updatePlatform.bind(this);

    this.updatePlatform();
  }

  /**
   * Draw the platforms on the screen
   */
  drawPlatform = () => {
    ctx.drawImage(
      this.imageSrc,
      2,
      2,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };

  updatePlatform = () => {
    requestAnimationFrame(this.updatePlatform);
    //platforms
    if (
      this.doodler.velocityY < 0 &&
      this.doodler.y < (CANVAS_HEIGHT * 3) / 4
    ) {
      this.y -= -8;
    }

    this.drawPlatform();
  };
}
