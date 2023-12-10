import { DragonBallZ } from "./DragonBallZ.js";
import { registerKeyboardEvents } from "./input.js";

window.onload = function () {
  new DragonBallZ().start();
  registerKeyboardEvents();
};
