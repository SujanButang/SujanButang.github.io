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
    try {
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
    } catch (error) {
    }
  };

  updatePlatform = () => {
    requestAnimationFrame(this.updatePlatform);
    //platforms
    if (
      this.doodler.velocityY < 0 &&
      this.doodler.y < CANVAS_HEIGHT * (3 / 4)
    ) {
      this.y -= -8;
    }

    // Check if the platform is out of the canvas
    if (this.y >= CANVAS_HEIGHT) {
      // Remove the platform instance from the array
      const index = platformArray.indexOf(this);
      if (index !== -1) {
        platformArray.splice(index, 1);

        const newPlatformInstance = newPlatform();
        platformArray.push(newPlatformInstance);
      }
    }

    this.drawPlatform();
  };

  cleanUp = () => {
    this.imageSrc = null;
  };
}
