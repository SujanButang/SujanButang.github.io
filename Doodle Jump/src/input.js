let moving = false;

const keys = {
  A: false,
  D: false,
  W: false,
  S: false,
  SPACE: false,
};

window.onkeydown = (e) => {
  console.log(e.code);
  moving = true;
  switch (e.code) {
    case "KeyA":
      keys.A = true;
      break;
    case "KeyD":
      keys.D = true;
      break;
    case "ArrowLeft":
      keys.A = true;
      break;
    case "ArrowRight":
      keys.D = true;
      break;

    case "Space":
      keys.SPACE = true;
      break;
  }
};

window.onkeyup = (e) => {
  moving = false;
  switch (e.code) {
    case "KeyA":
      keys.A = false;
      break;
    case "KeyD":
      keys.D = false;
      break;
    case "ArrowLeft":
      keys.A = false;
      break;
    case "ArrowRight":
      keys.D = false;
      break;

    case "Space":
      keys.SPACE = false;
      break;
  }
};
