const canvas = document.querySelector("canvas");

canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;

const ctx = canvas.getContext("2d");

var platformArray = [];
var gameOver = false;
var gameOverSoundPlayed = false;

var score = 0;
var maxScore = 0;

var gameReset = false;
/**
 * Doodler
 */
const position = {
  x: CANVAS_WIDTH / 2 - DOODLER_HEIGHT / 2,
  y: (CANVAS_HEIGHT * 7) / 8 - DOODLER_HEIGHT,
};

// Images for changing doodler's direction
const animations = {
  faceLeft: {
    imageSrc: "../assets/doodler/doodler1-left.png",
  },
  faceRight: {
    imageSrc: "../assets/doodler/doodler1-right.png",
  },
};

const idleImage = new Image();

idleImage.src = "../assets/doodler/doodler1-right.png";

const doodler = new Doodler(
  position,
  DOODLER_HEIGHT,
  DOODLER_WIDTH,
  animations,
  idleImage,
  0,
  0,
  keys,
  GRAVITY,
  platformArray
);

/**
 * Platform
 */

function newPlatform(i) {
  var randomX = Math.floor((Math.random() * (CANVAS_WIDTH * 3)) / 4);
  return new Platform(
    {
      x: Math.floor(randomX),
      y: i ? CANVAS_HEIGHT - 85 * i - 150 : 20,
    },
    30,
    115,
    platformImg,
    ctx,
    doodler
  );
}

const platformImg = new Image();
platformImg.src = "../assets/platform/platform.png";

const platform = new Platform(
  { x: CANVAS_WIDTH / 2 - 115 / 2, y: CANVAS_HEIGHT - 90 },
  30,
  115,
  platformImg,
  ctx,
  doodler
);
platform.drawPlatform();

platformImg.addEventListener("load", () => {
  platformArray.push(platform);

  for (var i = 0; i < 8; i++) {
    const platform = newPlatform(i);
    platformArray.push(platform);
  }
});

window.addEventListener("keydown", doodler.moveDoodler.bind(doodler));

function update() {
  requestAnimationFrame(update);

  //Updating Scores
  var points = Math.floor(50 * Math.random()); //(0-1) *50 --> (0-50)
  if (doodler.velocityY < 0) {
    //negative going up
    maxScore += points;
    if (score < maxScore) {
      score = maxScore;
    }
  } else if (doodler.velocityY >= 0) {
    maxScore -= points;
  }

  ctx.fillStyle = "black";
  ctx.font = "16px sans-serif";
  ctx.fillText(score, 80, 200);

  //Game Over Logic
  if (doodler.y > CANVAS_HEIGHT) {
    gameOver = true;
    if (!gameOverSoundPlayed) {
      const gameOver = new Audio("../assets/audio/gameover.mp3");
      gameOver.play();
      gameOverSoundPlayed = true;
    }
  }
  if (gameOver) {
    for (var i = 0; i < platformArray.length; i++) {
      platformArray[i].y -= 10;
      if (platformArray[i].y < 0) {
        platformArray[i].cleanUp();
        platformArray.splice(i, 1);
        i--;
      }
    }
    ctx.fillStyle = "black";
    ctx.font = "16px sans-serif";
    ctx.fillText(
      "Game Over: Press 'Space' to Restart",
      CANVAS_WIDTH / 7,
      (CANVAS_HEIGHT * 7) / 8
    );
  }

  // Resetting the game
  if (keys.SPACE && gameOver && platformArray.length === 0) {
    doodler.x = position.x;
    doodler.y = position.y;
    doodler.velocityX = 0;
    doodler.velocityY = 0;
    gameOver = false;
    gameOverSoundPlayed = false;
    score = 0;
    maxScore = 0;

    platformArray = [];

    const initialPlatform = new Platform(
      { x: CANVAS_WIDTH / 2 - 115 / 2, y: CANVAS_HEIGHT - 90 },
      30,
      115,
      platformImg,
      ctx,
      doodler
    );
    platformArray.push(initialPlatform);

    for (var i = 0; i < 8; i++) {
      const platform = newPlatform(i);
      platformArray.push(platform);
    }
  }
}
update();
