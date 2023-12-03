class Doodler {
  /**
   *
   * @param {Object} position
   * @param {number} height
   * @param {number} width
   * @param {object} animations
   * @param {string} imageSource
   * @param {number} velocityX
   * @param {number} velocityY
   * @param {Object} keysPressed
   * @param {number} gravity
   */
  constructor(
    position,
    height,
    width,
    animations,
    imageSource,
    velocityX,
    velocityY,
    keysPressed,
    gravity,
    platformArray
  ) {
    this.x = position.x;
    this.y = position.y;
    this.height = height;
    this.width = width;
    this.animations = animations;
    this.imageSource = imageSource;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.keysPressed = keysPressed;
    this.gravity = gravity;
    this.platformArray = platformArray;
    this.updateDoodlerPosition = this.updateDoodlerPosition.bind(this);
    this.moveDoodler = this.moveDoodler.bind(this);

    this.updateDoodlerPosition();
  }

  /**
   * Draw the doodler on the screen after image has been loaded
   */
  drawDoodler = () => {
    this.clearCanvas();
    ctx.drawImage(this.imageSource, this.x, this.y, this.width, this.height);
  };

  /**
   * If any key pressed set the movement velocity and also change the doodler image
   */
  moveDoodler() {
    if (this.keysPressed.D == true) {
      this.velocityX = MOVEMENT_VELOCITY;
      this.imageSource = new Image();
      this.imageSource.src = this.animations.faceRight.imageSrc;
    } else if (this.keysPressed.A) {
      this.velocityX = -MOVEMENT_VELOCITY;
      this.imageSource = new Image();
      this.imageSource.src = this.animations.faceLeft.imageSrc;
    } else {
      this.velocityX = 0;
    }
  }

  /**
   * Update the doodler position and keep drawing the new position of the doodler
   */
  updateDoodlerPosition() {
    requestAnimationFrame(this.updateDoodlerPosition);
    this.clearCanvas();

    this.x += this.velocityX; // Moving Left or Right

    // Gravity at Work
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    if (this.x >= CANVAS_WIDTH) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = CANVAS_WIDTH;
    }

    const visiblePlatforms = platformArray.filter((platform) => {
      // Only consider platforms that are within the visible area
      return (
        platform.x + platform.width >= this.x - CANVAS_WIDTH / 2 &&
        platform.x <= this.x + CANVAS_WIDTH / 2
      );
    });

    for (const platform of visiblePlatforms) {
      if (this.detectCollision(this, platform) && this.velocityY >= 0) {
        
        //Play jump sound effect on each collision
        const jump = new Audio("/assets/audio/jump.mp3");
        jump.play();

        this.velocityY = -9; // jump
      }
      platform.drawPlatform();
    }

    this.drawDoodler();
  }

  detectCollision = (doodler, platform) => {
    return (
      doodler.x <= platform.x + platform.width / 2 && // doodler's top left corner doesn't reach platform's top right corner
      doodler.x + doodler.width / 2 >= platform.x && // doodler's top right corner passes platform's top left corner
      doodler.y <= platform.y + platform.height && // doodler's top left corner doesn't reach platform's bottom left corner
      doodler.y + doodler.height >= platform.y &&
      doodler.velocityY >= 0 // doodler is moving downward
    );
  };

  clearCanvas = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };
}
