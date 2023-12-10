export const STAGE_FLOOR = 230;

export const fighterDirection = {
  LEFT: 1,
  RIGHT: -1,
};

export const fighterState = {
  IDLE: "idle",
  WALKFORWARD: "walkforward",
  WALKBACKWARD: "walkbackward",
  JUMP: "jump",
  CROUCH: "crouch",
  PUNCH: "punch",
  KICK: "kick",
};

export const control = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
  PUNCH:'punch',
  KICK:'kick'
};

export const controls = [
  {
    keyboard: {
      [control.LEFT]: "KeyA",
      [control.RIGHT]: "KeyD",
      [control.UP]: "KeyW",
      [control.DOWN]: "KeyS",
      [control.PUNCH]:'KeyJ',
      [control.KICK]:'KeyK'
    },
  },
  {
    keyboard: {
      [control.LEFT]: "ArrowLeft",
      [control.RIGHT]: "ArrowRight",
      [control.UP]: "ArrowUp",
      [control.DOWN]: "ArrowDown",
    },
  },
];

export const PushBox = {
  IDLE: [-25, -100, 60, 100],
  JUMP: [-25, -140, 60, 100],
  CROUCH: [-16, -80, 60, 80],
};
