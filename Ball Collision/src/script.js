const viewport = document.querySelector(".container");

/**
 * apply styles to the viewport element
 */
applyStyles(viewport, {
  height: calculatePercentage(viewport.clientHeight, 94) + "px",
  width: calculatePercentage(viewport.clientWidth, 95) + "px",
  position: "relative",
  margin: 0,
  padding: 0,
  border: "2px solid red",
});

/**
 * Arrays to store the balls
 */
const ballsArray = [];

/**
 * Creating ball element,
 * applying style,
 * adding it in DOM,
 * positioning it
 */
for (let i = 0; i < BALL_COUNT; i++) {
  const element = document.createElement("div");
  applyStyles(element, {
    width: `${getRandom(10, 30)}px`,
    aspectRatio: 1,
    borderRadius: "50%",
    backgroundColor: generateRandomColor(),
    position: "absolute",
  });
  viewport.appendChild(element);
  const width = element.offsetWidth;
  const height = element.offsetHeight;

  const xCordinate = getRandom(0, viewport.clientWidth - width);
  const yCordinate = getRandom(0, viewport.clientHeight - height);
  element.setAttribute("id", `ball-${i}`);

  const ball = new Ball(
    xCordinate,
    yCordinate,
    getRandom(-1, 1),
    getRandom(-1, 1),
    element
  );
  ballsArray.push(ball);
}

function render() {
  ballsArray.forEach((ball, index) => {
    const currentBall = document.getElementById(`ball-${index}`);
    const rect = currentBall.getBoundingClientRect();
    const ballWidth = rect.width;
    const ballHeight = rect.height;

    ball.draw();
    ball.move();
    ball.checkBoundaryCollision(
      0,
      0,
      viewport.clientWidth,
      viewport.clientHeight,
      ballWidth,
      ballHeight
    );
    ballsArray.forEach((otherball) => {
      if (ball === otherball) return;
      ball.checkBallCollision(otherball);
    });
  });
  requestAnimationFrame(render);
}

render();
