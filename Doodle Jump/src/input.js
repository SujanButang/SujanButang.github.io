let moving = false;

const keys = {
  A: false,
  D: false,

  SPACE: false,
};

const handleKeyDown = (e) => {
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

const handleKeyUp = (e) => {
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

const handleDeviceOrientation = (e) => {
  // Use e.gamma or e.beta values to determine the tilt
  // Adjust the threshold values based on your requirements
  if (e.gamma > 10) {
    keys.D = true;
    keys.A = false;
  } else if (e.gamma < -10) {
    keys.A = true;
    keys.D = false;
  } else {
    keys.A = false;
    keys.D = false;
  }
};

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
window.addEventListener("deviceorientation", handleDeviceOrientation);
