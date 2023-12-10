import { Fighter } from "./Fighter.js";
import { PushBox, fighterState } from "./constants.js";

export class Goku extends Fighter {
  constructor(x, y, direction, playerId) {
    super("Goku", x, y, direction, playerId);
    this.image = document.querySelector('img[alt="goku"]');
    this.frames = new Map([
      //IDLE
      ["idle-1", [[2, 357, 113, 111], PushBox.IDLE]],
      ["idle-2", [[117, 357, 113, 111], PushBox.IDLE]],
      ["idle-3", [[232, 357, 113, 111], PushBox.IDLE]],
      ["idle-4", [[347, 357, 113, 111], PushBox.IDLE]],

      //WALK FORWARD
      ["walkforward-1", [[2, 583, 108, 115]]],
      ["walkforward-2", [[112, 583, 108, 115], PushBox.IDLE]],
      ["walkforward-3", [[222, 583, 108, 115], PushBox.IDLE]],
      ["walkforward-4", [[332, 583, 108, 115], PushBox.IDLE]],
      ["walkforward-5", [[442, 583, 108, 115], PushBox.IDLE]],
      ["walkforward-6", [[552, 583, 108, 115], PushBox.IDLE]],

      //WALK BACKWARD
      ["walkbackward-1", [[2, 583, 108, 115], PushBox.IDLE]],
      ["walkbackward-2", [[112, 583, 108, 115], PushBox.IDLE]],
      ["walkbackward-3", [[222, 583, 108, 115], PushBox.IDLE]],
      ["walkbackward-4", [[332, 583, 108, 115], PushBox.IDLE]],
      ["walkbackward-5", [[442, 583, 108, 115], PushBox.IDLE]],
      ["walkbackward-6", [[552, 583, 108, 115], PushBox.IDLE]],

      //JUMP
      ["jump-1", [[2, 1067, 105, 165], PushBox.JUMP]],
      ["jump-2", [[109, 1067, 105, 165], PushBox.JUMP]],
      ["jump-3", [[216, 1067, 105, 165], PushBox.JUMP]],
      ["jump-4", [[323, 1067, 105, 165], PushBox.JUMP]],
      ["jump-5", [[430, 1067, 105, 165], PushBox.JUMP]],
      ["jump-6", [[537, 1067, 105, 165], PushBox.JUMP]],
      ["jump-7", [[644, 1067, 105, 165], PushBox.JUMP]],
      ["jump-8", [[751, 1067, 105, 165], PushBox.JUMP]],

      //CROUCH
      ["crouch-1", [[2, 1236, 105, 107], PushBox.CROUCH]],
      ["crouch-2", [[109, 1236, 105, 107], PushBox.CROUCH]],
      ["crouch-3", [[216, 1236, 105, 107], PushBox.CROUCH]],

      //STANDING PUNCH
      ["punch-1", [[2, 1869, 145, 118], PushBox.IDLE]],
      ["punch-2", [[149, 1869, 145, 118], PushBox.IDLE, [20, -90, 49, 13]]],
      ["punch-3", [[296, 1869, 145, 118], PushBox.IDLE], [18, -90, 34, 12]],
      ["punch-4", [[443, 1869, 145, 118], PushBox.IDLE]],

      //STANDING KICK
      ["kick-1", [[2, 1991, 161, 149], PushBox.IDLE]],
      ["kick-2", [[165, 1991, 161, 149], PushBox.IDLE, [25, -100, 55, 20]]],
      ["kick-3", [[328, 1991, 161, 149], PushBox.IDLE, [25, -100, 55,20]]],
      ["kick-4", [[491, 1991, 161, 149], PushBox.IDLE]],
      ["kick-5", [[654, 1991, 161, 149], PushBox.IDLE]],
      ["kick-6", [[817, 1991, 161, 149], PushBox.IDLE]],
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
        "jump-8",
      ],
      [fighterState.CROUCH]: ["crouch-1", "crouch-2", "crouch-3"],
      [fighterState.PUNCH]: ["punch-1", "punch-2", "punch-3", "punch-4"],
      [fighterState.KICK]: [
        "kick-1",
        "kick-2",
        "kick-3",
        "kick-4",
        "kick-5",
        "kick-6",
      ],
    };

    this.initialVelocity = {
      jump: -350,
    };
  }
}
