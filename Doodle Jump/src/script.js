const canvas = document.querySelector("canvas");

canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;

const ctx = canvas.getContext("2d");

var platformArray = [];

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

idleImage.src = "/assets/doodler/doodler1-right.png";

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
  let randomX = Math.floor((Math.random() * (CANVAS_WIDTH * 3)) / 4);
  return new Platform(
    {
      x: Math.floor(randomX),
      y: i ? CANVAS_HEIGHT - 95 * i - 150 : -30,
    },
    30,
    115,
    platformImg,
    ctx,
    doodler
  );
}

const platformImg = new Image();
platformImg.src = "/assets/platform/platform.png";

const platform = new Platform(
  { x: CANVAS_WIDTH / 2 - 115 / 2, y: CANVAS_HEIGHT - 50 },
  30,
  115,
  platformImg,
  ctx,

  doodler
);

platformImg.addEventListener("load", () => {
  platform.drawPlatform();
  platform.updatePlatform();
  platformArray.push(platform);

  for (let i = 0; i < 9; i++) {
    const platform = newPlatform(i);
    platformArray.push(platform);
  }
});

// clear platforms and add new platform

window.addEventListener("keydown", doodler.moveDoodler.bind(doodler));
