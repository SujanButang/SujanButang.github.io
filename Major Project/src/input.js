import { control, controls, fighterDirection } from "./constants.js";

const pressedKeys = new Set();

export function registerKeyboardEvents() {
  window.addEventListener("keydown", (event) => {
    event.preventDefault();

    pressedKeys.add(event.code);
  });

  window.addEventListener("keyup", (event) => {
    event.preventDefault();

    pressedKeys.delete(event.code);
  });
}

export const isKeyPressed = (code) => pressedKeys.has(code);
export const isKeyUp = (code) => !pressedKeys.has(code);

export const isLeft = (id) => isKeyPressed(controls[id].keyboard[control.LEFT]);
export const isRight = (id) =>
  isKeyPressed(controls[id].keyboard[control.RIGHT]);
export const isUp = (id) => isKeyPressed(controls[id].keyboard[control.UP]);
export const isDown = (id) => isKeyPressed(controls[id].keyboard[control.DOWN]);

export const isPunch = (id) =>
  isKeyPressed(controls[id].keyboard[control.PUNCH]);
export const isKick = (id) => isKeyPressed(controls[id].keyboard[control.KICK]);
export const isKiRecharge = (id) =>
  isKeyPressed(controls[id].keyboard[control.KIRECHARGE]);

export const isBlock = (id) =>
  isKeyPressed(controls[id].keyboard[control.BLOCK]);

export const isEnergyBall = (id) =>
  isKeyPressed(controls[id].keyboard[control.ENERGYBALL]);

export const isUltimate = (id) =>
  isKeyPressed(controls[id].keyboard[control.ULTIMATE]);
export const isForward = (id, direction) =>
  direction === fighterDirection.RIGHT ? isRight(id) : isLeft(id);
export const isBackward = (id, direction) =>
  direction === fighterDirection.LEFT ? isRight(id) : isLeft(id);

export const isRestart = (id) =>
  isKeyPressed(controls[id].keyboard[control.RESTART]);
export const isMenu = (id) =>
  isKeyPressed(controls[id].keyboard[control.MENU]);
