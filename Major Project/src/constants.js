export const STAGE_FLOOR = 230;

export const fighterDirection = {
  LEFT: 1,
  RIGHT: -1,
};

export const attackType = {
  PUNCH: "punch",
  KICK: "kick",
};

export const fighterState = {
  IDLE: "idle",
  WALKFORWARD: "walkforward",
  WALKBACKWARD: "walkbackward",
  JUMP: "jump",
  CROUCH: "crouch",
  PUNCH: "punch",
  KICK: "kick",
  PUNCHCOMBO1: "punchCombo1",
  PUNCHCOMBO2: "punchCombo2",
  PUNCHCOMBO3: "punchCombo3",
  PUNCHCOMBO4: "punchCombo4",
  KICKCOMBO1: "kickCombo1",
  JUMPPUNCH: "jumpPunch",
  JUMPKICK: "jumpKick",
  CROUCHPUNCH: "crouchPunch",
  CROUCHKICK: "crouchKick",
  KIRECHARGE: "kiRecharge",
  ENERGYBALL: "energyBall",
};

export const control = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
  PUNCH: "punch",
  KICK: "kick",
  KIRECHARGE: "kiRecharge",
  ENERGYBALL: "energyBall",
};

export const controls = [
  {
    keyboard: {
      [control.LEFT]: "KeyA",
      [control.RIGHT]: "KeyD",
      [control.UP]: "KeyW",
      [control.DOWN]: "KeyS",
      [control.PUNCH]: "KeyJ",
      [control.KICK]: "KeyK",
      [control.KIRECHARGE]: "KeyI",
      [control.ENERGYBALL]: "KeyL",
    },
  },
  {
    keyboard: {
      [control.LEFT]: "ArrowLeft",
      [control.RIGHT]: "ArrowRight",
      [control.UP]: "ArrowUp",
      [control.DOWN]: "ArrowDown",
      [control.PUNCH]: "Slash",
      [control.KICK]: "Quote",
    },
  },
];

export const PushBox = {
  IDLE: [-25, -100, 60, 100],
  JUMP: [-25, -140, 60, 100],
  CROUCH: [-16, -80, 60, 80],
};
