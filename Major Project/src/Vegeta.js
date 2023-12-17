import { Fighter } from "./Fighter.js";
import { PushBox, fighterState } from "./constants.js";

export class Vegeta extends Fighter {
  attackSounds = {
    [fighterState.PUNCH]: document.querySelector("audio#vegeta-hit-1"),
    [fighterState.KICK]: document.querySelector("audio#vegeta-hit-1"),
    [fighterState.PUNCHCOMBO1]: document.querySelector("audio#vegeta-hit-2"),
    [fighterState.PUNCHCOMBO2]: document.querySelector("audio#vegeta-hit-3"),
    [fighterState.PUNCHCOMBO3]: document.querySelector("audio#vegeta-hit-4"),
    [fighterState.KICKCOMBO1]: document.querySelector("audio#vegeta-hit-4"),

    [fighterState.HURT1]: document.querySelector("audio#vegeta-hurt-1"),
    [fighterState.HURT2]: document.querySelector("audio#vegeta-hurt-2"),
    [fighterState.HURT3]: document.querySelector("audio#vegeta-hurt-3"),

    [fighterState.CROUCHHURT1]: document.querySelector("audio#vegeta-hurt-1"),
    [fighterState.CROUCHHURT2]: document.querySelector("audio#vegeta-hurt-2"),

    [fighterState.FALL]: document.querySelector("audio#vegeta-fall"),
    [fighterState.KIRECHARGE]: document.querySelector("audio#vegeta-ki"),
  };

  constructor(x, y, direction, playerId, healthBarPosition) {
    super("Vegeta", x, y, direction, playerId);
    this.image = document.querySelector('img[alt="vegeta"]');
    this.CPUControlled = true;
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
      [
        "crouchKick-2",
        [[148, 2282, 144, 101], PushBox.CROUCH, [10, -50, 55, 20]],
      ],
      [
        "crouchKick-3",
        [[294, 2282, 144, 101], PushBox.CROUCH, [10, -50, 55, 20]],
      ],
      ["crouchKick-4", [[440, 2282, 144, 101], PushBox.CROUCH]],

      //CROUCHING PUNCH
      ["crouchPunch-1", [[2, 2387, 162, 101], PushBox.CROUCH]],
      ["crouchPunch-2", [[166, 2387, 162, 101], PushBox.CROUCH]],
      [
        "crouchPunch-3",
        [[330, 2387, 162, 101], PushBox.CROUCH, [30, -25, 55, 20]],
      ],
      ["crouchPunch-4", [[494, 2387, 162, 101], PushBox.CROUCH]],
      ["crouchPunch-5", [[658, 2387, 162, 101], PushBox.CROUCH]],
      ["crouchPunch-6", [[822, 2387, 162, 101], PushBox.CROUCH]],
      ["crouchPunch-7", [[986, 2387, 162, 101], PushBox.CROUCH]],

      //JUMP PUNCH
      ["jumpPunch-1", [[2, 2492, 101, 127], PushBox.JUMP]],
      ["jumpPunch-2", [[105, 2492, 101, 127], PushBox.JUMP, [20, -70, 25, 40]]],
      ["jumpPunch-3", [[208, 2492, 101, 127], PushBox.JUMP, [20, -70, 25, 40]]],
      ["jumpPunch-4", [[311, 2492, 101, 127], PushBox.JUMP]],

      //JUMP KICK
      ["jumpKick-1", [[2, 2623, 136, 123], PushBox.JUMP]],
      ["jumpKick-2", [[140, 2623, 136, 123], PushBox.JUMP]],
      ["jumpKick-3", [[278, 2623, 136, 123], PushBox.JUMP]],
      ["jumpKick-4", [[416, 2623, 136, 123], PushBox.JUMP]],
      ["jumpKick-5", [[554, 2623, 136, 123], PushBox.JUMP, [20, -70, 45, 40]]],
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

      //HURT1
      ["hurt1-1", [[2, 5926, 99, 116]]],
      ["hurt1-2", [[103, 5926, 99, 116]]],
      ["hurt1-3", [[204, 5926, 99, 116]]],
      ["hurt1-4", [[305, 5926, 99, 116]]],

      //HURT2
      ["hurt2-1", [[2, 6046, 88, 118]]],
      ["hurt2-2", [[92, 6046, 88, 118]]],

      //HURT3
      ["hurt3-1", [[2, 6168, 90, 113]]],
      ["hurt3-2", [[94, 6168, 90, 113]]],

      //HURT4
      ["hurt4-1", [[377, 6592, 123, 99]]],
      ["hurt4-2", [[252, 6592, 123, 99]]],
      ["hurt4-3", [[2, 6592, 123, 99]]],
      ["hurt4-4", [[127, 6592, 123, 99]]],

      //CROUCH HURT 1
      ["crouchHurt1-1", [[2, 6396, 130, 99]]],
      ["crouchHurt1-2", [[134, 6396, 130, 99]]],

      //CROUCH HURT 2
      ["crouchHurt2-1", [[2, 6499, 116, 89]]],
      ["crouchHurt2-2", [[120, 6499, 116, 89]]],

      //FALL
      ["fall-1", [[2, 6932, 153, 98]]],
      ["fall-2", [[157, 6932, 153, 98]]],
      ["fall-3", [[312, 6932, 153, 98]]],
      ["fall-4", [[467, 6932, 153, 98]]],
      ["fall-5", [[622, 6932, 153, 98]]],
      ["fall-6", [[777, 6932, 153, 98]]],
      ["fall-7", [[932, 6932, 153, 98]]],
      ["fall-8", [[1087, 6932, 153, 98]]],

      //STANDING BLOCK
      ["standingBlock-1", [[2, 723, 87, 119]]],
      ["standingBlock-2", [[91, 723, 87, 119]]],
      ["standingBlock-3", [[180, 723, 87, 119]]],

      //CROUCHING BLOCK
      ["crouchingBlock-1", [[2, 846, 83, 105]]],
      ["crouchingBlock-2", [[87, 846, 83, 105]]],
      ["crouchingBlock-3", [[172, 846, 83, 105]]],
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
      [fighterState.HURT1]: ["hurt1-1", "hurt1-2", "hurt1-3", "hurt1-4"],
      [fighterState.HURT2]: ["hurt2-1", "hurt2-2"],
      [fighterState.HURT3]: ["hurt3-1", "hurt3-2"],
      [fighterState.HURT4]: ["hurt4-1", "hurt4-2", "hurt4-3", "hurt4-4"],
      [fighterState.FALL]: [
        "fall-1",
        "fall-2",
        "fall-3",
        "fall-4",
        "fall-5",
        "fall-6",
        "fall-7",
        "fall-8",
      ],
      [fighterState.STANDINGBLOCK]: [
        "standingBlock-1",
        "standingBlock-2",
        "standingBlock-3",
      ],
      [fighterState.CROUCHINGBLOCK]: [
        "crouchingBlock-1",
        "crouchingBlock-2",
        "crouchingBlock-3",
      ],
      [fighterState.CROUCHHURT1]: ["crouchHurt1-1", "crouchHurt1-2"],
      [fighterState.CROUCHHURT2]: ["crouchHurt2-1", "crouchHurt2-2"],
    };

    this.initialVelocity = {
      jump: -350,
    };

    this.health = 150;
    this.ki = 0;

    this.healthBarPosition = healthBarPosition;
  }
}
