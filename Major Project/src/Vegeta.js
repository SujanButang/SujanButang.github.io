import { Fighter } from "./Fighter.js";
import { PushBox, fighterState } from "./constants.js";

export class Vegeta extends Fighter {
  constructor(x, y, direction, playerId) {
    super("Vegeta", x, y, direction, playerId);
    this.image = document.querySelector('img[alt="vegeta"]');
    this.frames = new Map([
      //IDLE
      ["idle-1", [[2, 375, 87, 112], PushBox.IDLE]],
      ["idle-2", [[91, 375, 87, 112], PushBox.IDLE]],
      ["idle-3", [[180, 375, 87, 112], PushBox.IDLE]],
      ["idle-4", [[269, 375, 87, 112], PushBox.IDLE]],

      //WALK FORWARD
      ["walkforward-1", [[2, 602, 98, 117], PushBox.IDLE]],
      ["walkforward-2", [[102, 602, 98, 117], PushBox.IDLE]],
      ["walkforward-3", [[202, 602, 98, 117], PushBox.IDLE]],
      ["walkforward-4", [[302, 602, 98, 117], PushBox.IDLE]],
      ["walkforward-5", [[402, 602, 98, 117], PushBox.IDLE]],
      ["walkforward-6", [[502, 602, 98, 117], PushBox.IDLE]],

      //WALK BACKWARD
      ["walkbackward-1", [[2, 602, 98, 117], PushBox.IDLE]],
      ["walkbackward-2", [[102, 602, 98, 117], PushBox.IDLE]],
      ["walkbackward-3", [[202, 602, 98, 117], PushBox.IDLE]],
      ["walkbackward-4", [[302, 602, 98, 117], PushBox.IDLE]],
      ["walkbackward-5", [[402, 602, 98, 117], PushBox.IDLE]],
      ["walkbackward-6", [[502, 602, 98, 117], PushBox.IDLE]],

      //JUMP
      ["jump-1", [[2, 1089, 88, 150], PushBox.JUMP]],
      ["jump-2", [[92, 1089, 88, 150], PushBox.JUMP]],
      ["jump-3", [[182, 1089, 88, 150], PushBox.JUMP]],
      ["jump-4", [[272, 1089, 88, 150], PushBox.JUMP]],
      ["jump-5", [[362, 1089, 88, 150], PushBox.JUMP]],
      ["jump-6", [[452, 1089, 88, 150], PushBox.JUMP]],
      ["jump-7", [[542, 1089, 88, 150], PushBox.JUMP]],

      //CROUCH
      ["crouch-1", [[2, 1243, 89, 105], PushBox.CROUCH]],
      ["crouch-2", [[93, 1243, 89, 105], PushBox.CROUCH]],
      ["crouch-3", [[184, 1243, 89, 105], PushBox.CROUCH]],

      //STANDING PUNCH
      ["punch-1", [[2, 1892, 133, 109], PushBox.IDLE]],
      ["punch-2", [[137, 1892, 133, 109], PushBox.IDLE]],
      ["punch-3", [[272, 1892, 133, 109], PushBox.IDLE]],
      ["punch-4", [[407, 1892, 133, 109], PushBox.IDLE]],

      //STANDING KICK
      ["kick-1", [[2, 2005, 99, 136], PushBox.IDLE]],
      ["kick-2", [[103, 2005, 99, 136], PushBox.IDLE]],
      ["kick-3", [[204, 2005, 99, 136], PushBox.IDLE]],
      ["kick-4", [[305, 2005, 99, 136], PushBox.IDLE]],
      ["kick-5", [[406, 2005, 99, 136], PushBox.IDLE]],
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
      [fighterState.PUNCH]: ["punch-1", "punch-2", "punch-3", "pinch-4"],
      [fighterState.KICK]: ["kick-1", "kick-2", "kick-3", "kick-4", "kick-5"],
    };

    this.initialVelocity = {
      jump: -350,
    };
  }
}
