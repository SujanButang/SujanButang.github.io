import { Fighter } from "./Fighter.js";
import { PushBox, fighterState } from "./constants.js";

export class Piccolo extends Fighter {
  constructor(x, y, direction, playerId) {
    super("Piccolo", x, y, direction, playerId);
    this.image = document.querySelector('img[alt="piccolo"]');
    this.frames = new Map([
      //IDLE
      ["idle-1", [[2, 382, 130, 136], PushBox.IDLE]],
      ["idle-2", [[134, 382, 130, 136], PushBox.IDLE]],
      ["idle-3", [[266, 382, 130, 136], PushBox.IDLE]],
      ["idle-4", [[398, 382, 130, 136], PushBox.IDLE]],

      //WALK FORWARD
      ["walkforward-1", [[2, 646, 124, 134], PushBox.IDLE]],
      ["walkforward-2", [[128, 646, 124, 134], PushBox.IDLE]],
      ["walkforward-3", [[254, 646, 124, 134], PushBox.IDLE]],
      ["walkforward-4", [[380, 646, 124, 134], PushBox.IDLE]],
      ["walkforward-5", [[506, 646, 124, 134], PushBox.IDLE]],
      ["walkforward-6", [[632, 646, 124, 134], PushBox.IDLE]],

      //WALK BACKWARD
      ["walkbackward-1", [[2, 646, 124, 134], PushBox.IDLE]],
      ["walkbackward-2", [[128, 646, 124, 134], PushBox.IDLE]],
      ["walkbackward-3", [[254, 646, 124, 134], PushBox.IDLE]],
      ["walkbackward-4", [[380, 646, 124, 134], PushBox.IDLE]],
      ["walkbackward-5", [[506, 646, 124, 134], PushBox.IDLE]],
      ["walkbackward-6", [[632, 646, 124, 134], PushBox.IDLE]],

      //JUMP
      ["jump-1", [[2, 1173, 127, 200], PushBox.JUMP]],
      ["jump-2", [[131, 1173, 127, 200], PushBox.JUMP]],
      ["jump-3", [[260, 1173, 127, 200], PushBox.JUMP]],
      ["jump-4", [[389, 1173, 127, 200], PushBox.JUMP]],
      ["jump-5", [[518, 1173, 127, 200], PushBox.JUMP]],
      ["jump-6", [[647, 1173, 127, 200], PushBox.JUMP]],
      ["jump-7", [[776, 1173, 127, 200], PushBox.JUMP]],

      //CROUCH
      ["crouch-1", [[2, 1377, 121, 121], PushBox.CROUCH]],
      ["crouch-2", [[125, 1377, 121, 121], PushBox.CROUCH]],
      ["crouch-3", [[248, 1377, 121, 121], PushBox.CROUCH]],

      //STANDING PUNCH
      
    ]);

    this.animations = {
      [fighterState.WALKFORWARD]: [
        "walkforward-1",
        "walkforward-2",
        "walkforward-3",
        "walkforward-4",
        "walkforward-5",
        "walkforward-6",
      ],
      [fighterState.WALKBACKWARD]: [
        "walkbackward-1",
        "walkbackward-2",
        "walkbackward-3",
        "walkbackward-4",
        "walkbackward-5",
        "walkbackward-6",
      ],
      [fighterState.IDLE]: ["idle-1", "idle-2", "idle-3", "idle-4"],
      [fighterState.JUMP]: [
        "jump-1",
        "jump-2",
        "jump-3",
        "jump-4",
        "jump-5",
        "jump-6",
        "jump-7",
      ],
      [fighterState.CROUCH]: ["crouch-1", "crouch-2", "crouch-3"],
    };

    this.initialVelocity = {
      jump: -350,
    };
  }
}
