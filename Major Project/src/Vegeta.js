import { Fighter } from "./Fighter.js";
import { PushBox, fighterState } from "./constants.js";

export class Vegeta extends Fighter {
  constructor(x, y, direction, playerId, healthBarPosition) {
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
      ["punch-2", [[137, 1892, 133, 109], PushBox.IDLE, [20, -75, 49, 13]]],
      ["punch-3", [[272, 1892, 133, 109], PushBox.IDLE]],
      ["punch-4", [[407, 1892, 133, 109], PushBox.IDLE]],

      //STANDING KICK
      ["kick-1", [[2, 2005, 99, 136], PushBox.IDLE]],
      ["kick-2", [[103, 2005, 99, 136], PushBox.IDLE]],
      ["kick-3", [[204, 2005, 99, 136], PushBox.IDLE, [10, -130, 30, 45]]],
      ["kick-4", [[305, 2005, 99, 136], PushBox.IDLE, [10, -130, 30, 45]]],
      ["kick-5", [[406, 2005, 99, 136], PushBox.IDLE]],

      //PUNCH COMBO 1
      ["punchCombo1-1", [[2, 3406, 131, 127], PushBox.IDLE]],
      [
        "punchCombo1-2",
        [[135, 3406, 131, 127], PushBox.IDLE, [20, -105, 49, 13]],
      ],
      [
        "punchCombo1-3",
        [[268, 3406, 131, 127], PushBox.IDLE, [20, -105, 49, 13]],
      ],
      ["punchCombo1-4", [[401, 3406, 131, 127], PushBox.IDLE]],

      //PUNCH COMBO 2
      ["punchCombo2-1", [[2, 3797, 144, 141], PushBox.IDLE]],
      ["punchCombo2-2", [[148, 3797, 144, 141], PushBox.IDLE]],
      [
        "punchCombo2-3",
        [[294, 3797, 144, 141], PushBox.IDLE, [10, -100, 49, 13]],
      ],
      [
        "punchCombo2-4",
        [[440, 3797, 144, 141], PushBox.IDLE, [10, -100, 49, 13]],
      ],
      ["punchCombo2-5", [[586, 3797, 144, 141], PushBox.IDLE]],

      //PUNCH COMBO 3
      ["punchCombo3-1", [[2, 3942, 123, 127], PushBox.IDLE]],
      ["punchCombo3-2", [[127, 3942, 123, 127], PushBox.IDLE]],
      [
        "punchCombo3-3",
        [[252, 3942, 123, 127], PushBox.IDLE, [10, -120, 49, 25]],
      ],
      [
        "punchCombo3-4",
        [[377, 3942, 123, 127], PushBox.IDLE, [10, -120, 49, 25]],
      ],
      [
        "punchCombo3-5",
        [[502, 3942, 123, 127], PushBox.IDLE, [10, -120, 49, 25]],
      ],
      ["punchCombo3-6", [[627, 3942, 123, 127], PushBox.IDLE]],
      ["punchCombo3-7", [[752, 3942, 123, 127], PushBox.IDLE]],

      //PUNCH COMBO 4
      ["punchCombo4-1", [[2, 4083, 141, 109], PushBox.IDLE]],
      ["punchCombo4-2", [[145, 4083, 141, 109], PushBox.IDLE]],
      ["punchCombo4-3", [[288, 4083, 141, 109], PushBox.IDLE]],
      ["punchCombo4-4", [[431, 4083, 141, 109], PushBox.IDLE]],

      //KICK COMBO 1
      ["kickCombo1-1", [[2, 3942, 123, 127], PushBox.IDLE]],
      ["kickCombo1-2", [[127, 3942, 123, 127], PushBox.IDLE]],
      [
        "kickCombo1-3",
        [[252, 3942, 123, 127], PushBox.IDLE, [10, -120, 49, 25]],
      ],
      [
        "kickCombo1-4",
        [[377, 3942, 123, 127], PushBox.IDLE, [10, -120, 49, 25]],
      ],
      [
        "kickCombo1-5",
        [[502, 3942, 123, 127], PushBox.IDLE, [10, -120, 49, 25]],
      ],
      ["kickCombo1-6", [[627, 3942, 123, 127], PushBox.IDLE]],
      ["kickCombo1-7", [[752, 3942, 123, 127], PushBox.IDLE]],

      //CROUCHING KICK
      ["crouchKick-1", [[2, 2282, 144, 101], PushBox.CROUCH]],
      ["crouchKick-2", [[148, 2282, 144, 101], PushBox.CROUCH]],
      ["crouchKick-3", [[294, 2282, 144, 101], PushBox.CROUCH]],
      ["crouchKick-4", [[440, 2282, 144, 101], PushBox.CROUCH]],

      //CROUCHING PUNCH
      ["crouchPunch-1", [[2, 2387, 162, 101], PushBox.CROUCH]],
      ["crouchPunch-2", [[166, 2387, 162, 101], PushBox.CROUCH]],
      ["crouchPunch-3", [[330, 2387, 162, 101], PushBox.CROUCH]],
      ["crouchPunch-4", [[494, 2387, 162, 101], PushBox.CROUCH]],
      ["crouchPunch-5", [[658, 2387, 162, 101], PushBox.CROUCH]],
      ["crouchPunch-6", [[822, 2387, 162, 101], PushBox.CROUCH]],
      ["crouchPunch-7", [[986, 2387, 162, 101], PushBox.CROUCH]],

      //JUMP PUNCH
      ["jumpPunch-1", [[2, 2492, 101, 127], PushBox.JUMP]],
      ["jumpPunch-2", [[105, 2492, 101, 127], PushBox.JUMP]],
      ["jumpPunch-3", [[208, 2492, 101, 127], PushBox.JUMP]],
      ["jumpPunch-4", [[311, 2492, 101, 127], PushBox.JUMP]],

      //JUMP KICK
      ["jumpKick-1", [[2, 2623, 136, 123], PushBox.JUMP]],
      ["jumpKick-2", [[140, 2623, 136, 123], PushBox.JUMP]],
      ["jumpKick-3", [[278, 2623, 136, 123], PushBox.JUMP]],
      ["jumpKick-4", [[416, 2623, 136, 123], PushBox.JUMP]],
      ["jumpKick-5", [[554, 2623, 136, 123], PushBox.JUMP]],
      ["jumpKick-6", [[692, 2623, 136, 123], PushBox.JUMP]],

      //KI RECHARGE
      ["kiRecharge-1", [[2, 7034, 89, 141], PushBox.IDLE]],
      ["kiRecharge-2", [[93, 7034, 89, 141], PushBox.IDLE]],
      ["kiRecharge-3", [[184, 7034, 89, 141], PushBox.IDLE]],
      ["kiRecharge-4", [[275, 7034, 89, 141], PushBox.IDLE]],
      ["kiRecharge-5", [[366, 7034, 89, 141], PushBox.IDLE]],
      ["kiRecharge-6", [[457, 7034, 89, 141], PushBox.IDLE]],
      ["kiRecharge-7", [[548, 7034, 89, 141], PushBox.IDLE]],
      ["kiRecharge-8", [[639, 7034, 89, 141], PushBox.IDLE]],
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
      [fighterState.PUNCH]: ["punch-1", "punch-2", "punch-3", "punch-4"],
      [fighterState.KICK]: ["kick-1", "kick-2", "kick-3", "kick-4", "kick-5"],
      [fighterState.PUNCHCOMBO1]: [
        "punchCombo1-1",
        "punchCombo1-2",
        "punchCombo1-3",
        "punchCombo1-4",
      ],
      [fighterState.PUNCHCOMBO2]: [
        "punchCombo2-1",
        "punchCombo2-2",
        "punchCombo2-3",
        "punchCombo2-4",
        "punchCombo2-5",
      ],
      [fighterState.PUNCHCOMBO3]: [
        "punchCombo3-1",
        "punchCombo3-2",
        "punchCombo3-3",
        "punchCombo3-4",
        "punchCombo3-5",
        "punchCombo3-6",
        "punchCombo3-7",
      ],
      [fighterState.PUNCHCOMBO4]: [
        "punchCombo4-1",
        "punchCombo4-2",
        "punchCombo4-3",
        "punchCombo4-4",
      ],
      [fighterState.KICKCOMBO1]: [
        "kickCombo1-1",
        "kickCombo1-2",
        "kickCombo1-3",
        "kickCombo1-4",
        "kickCombo1-5",
        "kickCombo1-6",
        "kickCombo1-7",
      ],

      [fighterState.CROUCHKICK]: [
        "crouchKick-1",
        "crouchKick-2",
        "crouchKick-3",
        "crouchKick-4",
      ],
      [fighterState.CROUCHPUNCH]: [
        "crouchPunch-1",
        "crouchPunch-2",
        "crouchPunch-3",
        "crouchPunch-4",
        "crouchPunch-5",
        "crouchPunch-6",
        "crouchPunch-7",
      ],
      [fighterState.JUMPPUNCH]: [
        "jumpPunch-1",
        "jumpPunch-2",
        "jumpPunch-3",
        "jumpPunch-4",
      ],
      [fighterState.JUMPKICK]: [
        "jumpKick-1",
        "jumpKick-2",
        "jumpKick-3",
        "jumpKick-4",
        "jumpKick-5",
        "jumpKick-6",
      ],
      [fighterState.KIRECHARGE]: [
        "kiRecharge-1",
        "kiRecharge-2",
        "kiRecharge-3",
        "kiRecharge-4",
        "kiRecharge-5",
        "kiRecharge-6",
        "kiRecharge-7",
        "kiRecharge-8",
      ],
    };

    this.initialVelocity = {
      jump: -350,
    };

    this.health = 150;

    this.healthBarPosition = healthBarPosition;
  }
}
