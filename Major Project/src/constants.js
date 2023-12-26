export const STAGE_FLOOR = 230;

export const fighterDirection = {
  LEFT: 1,
  RIGHT: -1,
};

export const attackType = {
  PUNCH: "punch",
  KICK: "kick",
};

/**
 * Fighter State Look Up object
 */
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
  HURT1: "hurt1",
  HURT2: "hurt2",
  HURT3: "hurt3",
  HURT4: "hurt4",
  STANDINGBLOCK: "standingBlock",
  CROUCHINGBLOCK: "crouchingBlock",
  FALL: "fall",
  CROUCHHURT1: "crouchHurt1",
  CROUCHHURT2: "crouchHurt2",
  ULTIMATE: "ultimate",
};

export const UltimateState = {
  ACTIVE: "active",
};
export const UltimateCollidedState = {
  NONE: "none",
  OPPONENT: "opponent",
};

/**
 * Control lookup object
 */
export const control = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
  PUNCH: "punch",
  KICK: "kick",
  KIRECHARGE: "kiRecharge",
  ENERGYBALL: "energyBall",
  BLOCK: "block",
  ULTIMATE: "ultimate",
  RESTART: "restart",
  MENU: "menu",
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
      [control.BLOCK]: "KeyB",
      // [control.ULTIMATE]: "KeyU",
      [control.RESTART]: "Space",
      [control.MENU]: "Escape",
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
      [control.BLOCK]: "Period",
      [control.KIRECHARGE]: "Semicolon",
    },
  },
];

export const PushBox = {
  IDLE: [-25, -100, 60, 100],
  JUMP: [-25, -140, 60, 100],
  CROUCH: [-16, -80, 60, 80],
};
