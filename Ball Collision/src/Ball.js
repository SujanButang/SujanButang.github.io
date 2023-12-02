class Ball {
  /**
   *
   * Initializing
   *
   * @param {number} leftPosition
   * @param {number} topPosition
   * @param {number} directionLeft
   * @param {number} directionTop
   * @param {HTMLElement} element
   */
  constructor(leftPosition, topPosition, directionLeft, directionTop, element) {
    this.leftPosition = leftPosition;
    this.topPosition = topPosition;
    this.directionLeft = directionLeft;
    this.directionTop = directionTop;
    this.element = element;
    this.radius = this.element.offsetWidth / 2;
  }

  /**
   *
   * @returns HTMLElement
   */
  getElement = () => this.element;

  getLeftPosition = () => this.leftPosition;
  getTopPosition = () => this.topPosition;

  /**
   * Plotting the ball by setting the position in the viewport
   */
  draw = () => {
    this.element.style.left = this.leftPosition + "px";
    this.element.style.top = this.topPosition + "px";
  };

  /**
   * Updating the position
   */
  move = () => {
    this.leftPosition += this.directionLeft * SPEED;
    this.topPosition += this.directionTop * SPEED;
  };

  /**
   * Compare the position on the ball with the boundary width
   * and height and detect collision
   *
   * @param {number} boundaryLeft
   * @param {number} boundaryTop
   * @param {number} boundaryWidth
   * @param {number} boundaryHeight
   * @param {number} ballWidth
   * @param {number} ballHeight
   */

  checkBoundaryCollision = (
    boundaryLeft,
    boundaryTop,
    boundaryWidth,
    boundaryHeight,
    ballWidth,
    ballHeight
  ) => {
    if (
      this.leftPosition < boundaryLeft ||
      this.leftPosition + ballWidth > boundaryWidth
    ) {
      this.directionLeft = -this.directionLeft;
    }

    if (
      this.topPosition < boundaryTop ||
      this.topPosition + ballHeight > boundaryHeight
    ) {
      this.directionTop = -this.directionTop;
    }

    // Additional check to reposition the ball if it's entirely outside the container
    if (this.leftPosition < boundaryLeft) {
      this.leftPosition = boundaryLeft;
    }

    if (this.topPosition < boundaryTop) {
      this.topPosition = boundaryTop;
    }

    if (this.leftPosition + ballWidth > boundaryWidth) {
      this.leftPosition = boundaryWidth - ballWidth;
    }

    if (this.topPosition + ballHeight > boundaryHeight) {
      this.topPosition = boundaryHeight - ballHeight;
    }
  };

  /**
   *
   * Compares the distance and the sum of radius of two balls
   * and detects collision
   *
   * @param {class} ball
   */
  checkBallCollision = (ball) => {
    const distance = calculateDistance(
      this.leftPosition,
      this.topPosition,
      ball.leftPosition,
      ball.topPosition
    );

    const sumOfRadii = this.radius + ball.radius;

    if (distance < sumOfRadii) {
      // // Calculate the relative velocity components
      // const relativeVelX = this.directionLeft - ball.directionLeft;
      // const relativeVelY = this.directionTop - ball.directionTop;

      // Apply conservation of energy
      const newVelX1 =
        (this.directionLeft * (this.radius - ball.radius) +
          2 * ball.radius * ball.directionLeft) /
        (this.radius + ball.radius);
      const newVelY1 =
        (this.directionTop * (this.radius - ball.radius) +
          2 * ball.radius * ball.directionTop) /
        (this.radius + ball.radius);

      const newVelX2 =
        (ball.directionLeft * (ball.radius - this.radius) +
          2 * this.radius * this.directionLeft) /
        (this.radius + ball.radius);
      const newVelY2 =
        (ball.directionTop * (ball.radius - this.radius) +
          2 * this.radius * this.directionTop) /
        (this.radius + ball.radius);

      // Update velocities after collision
      this.directionLeft = newVelX1;
      this.directionTop = newVelY1;

      ball.directionLeft = newVelX2;
      ball.directionTop = newVelY2;

      // Adjust positions to eliminate overlap
      const overlap = sumOfRadii - distance;
      const overlapRatio = overlap / distance;

      // Move the balls away from each other
      this.leftPosition +=
        overlapRatio * (this.leftPosition - ball.leftPosition);
      this.topPosition += overlapRatio * (this.topPosition - ball.topPosition);

      ball.leftPosition -=
        overlapRatio * (this.leftPosition - ball.leftPosition);
      ball.topPosition -= overlapRatio * (this.topPosition - ball.topPosition);
    }
  };
}
