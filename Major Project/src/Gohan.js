import { PushBox, fighterState } from "./constants.js";
import { Fighter } from "./Fighter.js";

export class Gohan extends Fighter {
  attackSounds = {
    [fighterState.PUNCH]: document.querySelector("audio#gohan-hit-1"),
    [fighterState.KICK]: document.querySelector("audio#gohan-hit-1"),
    [fighterState.PUNCHCOMBO1]: document.querySelector("audio#gohan-hit-2"),
    [fighterState.PUNCHCOMBO2]: document.querySelector("audio#gohan-hit-3"),
    [fighterState.PUNCHCOMBO3]: document.querySelector("audio#gohan-hit-4"),
    [fighterState.KICKCOMBO1]: document.querySelector("audio#gohan-hit-4"),

    [fighterState.HURT1]: document.querySelector("audio#gohan-hurt-1"),
    [fighterState.HURT2]: document.querySelector("audio#gohan-hurt-2"),
    [fighterState.HURT3]: document.querySelector("audio#gohan-hurt-3"),

    [fighterState.CROUCHHURT1]: document.querySelector("audio#gohan-hurt-1"),
    [fighterState.CROUCHHURT2]: document.querySelector("audio#gohan-hurt-2"),

    [fighterState.FALL]: document.querySelector("audio#gohan-fall"),
    [fighterState.KIRECHARGE]: document.querySelector("audio#gohan-ki"),
  };
  constructor(x, y, direction, playerId, healthBarPosition) {
    super("Gohan", x, y, direction, playerId);
    this.image = document.querySelector('img[alt="gohan"]');
    this.frameTime = { previousTime: 0, secondPassed: 0 };
    this.frames = new Map([
      //IDLE
      ["idle-1", [[2, 366, 72, 104], PushBox.IDLE]],
      ["idle-2", [[76, 366, 72, 104], PushBox.IDLE]],
      ["idle-3", [[150, 366, 72, 104], PushBox.IDLE]],
      ["idle-4", [[224, 366, 72, 104], PushBox.IDLE]],

      //WALK FORWARD
      ["walkforward-1", [[2, 569, 84, 107], PushBox.IDLE]],
      ["walkforward-2", [[88, 569, 84, 107], PushBox.IDLE]],
      ["walkforward-3", [[174, 569, 84, 107], PushBox.IDLE]],
      ["walkforward-4", [[260, 569, 84, 107], PushBox.IDLE]],
      ["walkforward-5", [[346, 569, 84, 107], PushBox.IDLE]],

      //WALK BACKWARD
      ["walkbackward-1", [[2, 569, 84, 107], PushBox.IDLE]],
      ["walkbackward-2", [[88, 569, 84, 107], PushBox.IDLE]],
      ["walkbackward-3", [[174, 569, 84, 107], PushBox.IDLE]],
      ["walkbackward-4", [[260, 569, 84, 107], PushBox.IDLE]],
      ["walkbackward-5", [[346, 569, 84, 107], PushBox.IDLE]],

      //JUMP
      ["jump-1", [[2, 995, 89, 123], PushBox.JUMP]],
      ["jump-2", [[93, 995, 89, 123], PushBox.JUMP]],
      ["jump-3", [[184, 995, 89, 123], PushBox.JUMP]],
      ["jump-4", [[275, 995, 89, 123], PushBox.JUMP]],
      ["jump-5", [[366, 995, 89, 123], PushBox.JUMP]],
      ["jump-6", [[457, 995, 89, 123], PushBox.JUMP]],
      ["jump-7", [[548, 995, 89, 123], PushBox.JUMP]],

      //CROUCH
      ["crouch-1", [[2, 1122, 65, 100], PushBox.CROUCH]],
      ["crouch-2", [[69, 1122, 65, 100], PushBox.CROUCH]],
      ["crouch-3", [[136, 1122, 65, 100], PushBox.CROUCH]],

      //STANDING PUNCH
      ["punch-1", [[2, 1665, 114, 110], PushBox.IDLE]],
      ["punch-2", [[118, 1665, 114, 110], PushBox.IDLE, [8, -85, 49, 13]]],
      ["punch-3", [[234, 1665, 114, 110], PushBox.IDLE]],
      ["punch-4", [[350, 1665, 114, 110], PushBox.IDLE]],
      ["punch-5", [[466, 1665, 114, 110], PushBox.IDLE]],

      //STANDING KICK
      ["kick-1", [[2, 1779, 104, 172], PushBox.IDLE]],
      ["kick-2", [[108, 1779, 104, 172], PushBox.IDLE]],
      ["kick-3", [[214, 1779, 104, 172], PushBox.IDLE, [-5, -150, 55, 70]]],
      ["kick-4", [[320, 1779, 104, 172], PushBox.IDLE]],
      ["kick-5", [[426, 1779, 104, 172], PushBox.IDLE]],
      ["kick-6", [[532, 1779, 104, 172], PushBox.IDLE]],

      //PUNCHCOMBO-1
      ["punchCombo1-1", [[2, 2987, 131, 106], PushBox.IDLE]],
      ["punchCombo1-2", [[135, 2987, 131, 106], PushBox.IDLE]],
      ["punchCombo1-3", [[268, 2987, 131, 106], PushBox.IDLE]],
      [
        "punchCombo1-4",
        [[401, 2987, 131, 106], PushBox.IDLE, [8, -70, 49, 13]],
      ],
      [
        "punchCombo1-5",
        [[534, 2987, 131, 106], PushBox.IDLE, [8, -70, 49, 13]],
      ],
      ["punchCombo1-6", [[667, 2987, 131, 106], PushBox.IDLE]],

      //PUNCH COMBO 2
      ["punchCombo2-1", [[2, 3376, 104, 109], PushBox.IDLE]],
      ["punchCombo2-2", [[108, 3376, 104, 109], PushBox.IDLE]],
      [
        "punchCombo2-3",
        [[214, 3376, 104, 109], PushBox.IDLE, [10, -110, 30, 90]],
      ],
      [
        "punchCombo2-4",
        [[320, 3376, 104, 109], PushBox.IDLE, [10, -110, 30, 90]],
      ],

      //PUNCH COMBO 3
      ["punchCombo3-1", [[2, 1955, 116, 107], PushBox.IDLE]],
      ["punchCombo3-2", [[120, 1955, 116, 107], PushBox.IDLE]],
      [
        "punchCombo3-3",
        [[238, 1955, 116, 107], PushBox.IDLE, [10, -110, 30, 90]],
      ],
      [
        "punchCombo3-4",
        [[356, 1955, 116, 107], PushBox.IDLE, [10, -110, 30, 90]],
      ],
      ["punchCombo3-5", [[474, 1955, 116, 107], PushBox.IDLE]],
      [
        "punchCombo3-6",
        [[592, 1955, 116, 107], PushBox.IDLE, [10, -110, 40, 90]],
      ],
      [
        "punchCombo3-7",
        [[710, 1955, 116, 107], PushBox.IDLE, [10, -110, 40, 90]],
      ],
      [
        "punchCombo3-8",
        [[828, 1955, 116, 107], PushBox.IDLE, [10, -110, 40, 90]],
      ],
      [
        "punchCombo3-9",
        [[946, 1955, 116, 107], PushBox.IDLE, [10, -110, 40, 90]],
      ],

      //PUNCH COMBO 4
      ["punchCombo4-1", [[2, 2236, 106, 101], PushBox.IDLE]],
      [
        "punchCombo4-2",
        [[110, 2236, 106, 101], PushBox.IDLE, [8, -70, 49, 13]],
      ],
      [
        "punchCombo4-3",
        [[218, 2236, 106, 101], PushBox.IDLE, [8, -70, 49, 13]],
      ],

      //KICK COMBO 1
      ["kickCombo1-1", [[2, 2751, 118, 116], PushBox.IDLE]],
      ["kickCombo1-2", [[122, 2751, 118, 116], PushBox.IDLE]],
      ["kickCombo1-3", [[242, 2751, 118, 116], PushBox.IDLE]],
      ["kickCombo1-4", [[362, 2751, 118, 116], PushBox.IDLE]],
      ["kickCombo1-5", [[482, 2751, 118, 116], PushBox.IDLE]],
      ["kickCombo1-6", [[602, 2751, 118, 116], PushBox.IDLE]],
      ["kickCombo1-7", [[722, 2751, 118, 116], PushBox.IDLE]],

      //JUMP PUNCH
      ["jumpPunch-1", [[2, 2341, 98, 105], PushBox.JUMP]],
      ["jumpPunch-2", [[102, 2341, 98, 105], PushBox.JUMP, [15, -30, 35, 20]]],
      ["jumpPunch-3", [[202, 2341, 98, 105], PushBox.JUMP, [15, -30, 35, 20]]],
      ["jumpPunch-4", [[302, 2341, 98, 105], PushBox.JUMP]],

      //JUMP KICK
      ["jumpKick-1", [[2, 2341, 98, 105], PushBox.JUMP]],
      ["jumpKick-2", [[102, 2341, 98, 105], PushBox.JUMP, [15, -30, 35, 20]]],
      ["jumpKick-3", [[202, 2341, 98, 105], PushBox.JUMP, [15, -30, 35, 20]]],
      ["jumpKick-4", [[302, 2341, 98, 105], PushBox.JUMP]],

      //CROUCHING PUNCH
      ["crouchPunch-1", [[2, 2066, 120, 83], PushBox.CROUCH]],
      [
        "crouchPunch-2",
        [[124, 2066, 120, 83], PushBox.CROUCH, [20, -40, 39, 13]],
      ],
      ["crouchPunch-3", [[246, 2066, 120, 83], PushBox.CROUCH]],

      //CROUCHING KICK
      ["crouchKick-1", [[2, 2153, 104, 79], PushBox.CROUCH]],
      [
        "crouchKick-2",
        [[108, 2153, 104, 79], PushBox.CROUCH, [20, -20, 29, 13]],
      ],
      ["crouchKick-3", [[214, 2153, 104, 79], PushBox.CROUCH]],

      //KI RECHARGE
      ["kiRecharge-1", [[2, 1536, 73, 125], fighterState.IDLE]],
      ["kiRecharge-2", [[77, 1536, 73, 125], fighterState.IDLE]],
      ["kiRecharge-3", [[152, 1536, 73, 125], fighterState.IDLE]],
      ["kiRecharge-4", [[227, 1536, 73, 125], fighterState.IDLE]],
      ["kiRecharge-5", [[302, 1536, 73, 125], fighterState.IDLE]],

      //HURT1
      ["hurt1-1", [[2, 5191, 75, 117]]],
      ["hurt1-2", [[79, 5191, 75, 117]]],
      ["hurt1-3", [[156, 5191, 75, 117]]],
      ["hurt1-4", [[233, 5191, 75, 117]]],

      //HURT2
      ["hurt2-1", [[2, 5312, 89, 113]]],
      ["hurt2-2", [[93, 5312, 89, 113]]],

      //HURT 3
      ["hurt3-1", [[2, 5429, 69, 104]]],
      ["hurt3-1", [[73, 5429, 69, 104]]],

      //HURT4
      ["hurt4-1", [[216, 6014, 105, 104]]],
      ["hurt4-2", [[323, 6014, 105, 104]]],
      ["hurt4-3", [[2, 6014, 105, 104]]],
      ["hurt4-4", [[109, 6014, 105, 104]]],

      //FALL
      ["fall-1", [[2, 6122, 124, 114]]],
      ["fall-2", [[128, 6122, 124, 114]]],
      ["fall-3", [[254, 6122, 124, 114]]],
      ["fall-4", [[380, 6122, 124, 114]]],
      ["fall-5", [[506, 6122, 124, 114]]],
      ["fall-6", [[632, 6122, 124, 114]]],
      ["fall-7", [[758, 6122, 124, 114]]],

      //STANDING BLOCK
      ["standingBlock-1", [[2, 680, 66, 107]]],
      ["standingBlock-2", [[70, 680, 66, 107]]],
      ["standingBlock-3", [[138, 680, 66, 107]]],

      //CROUCHING BLOCK
      ["crouchingBlock-1", [[2, 791, 64, 89]]],
      ["crouchingBlock-2", [[68, 791, 64, 89]]],
      ["crouchingBlock-3", [[134, 791, 64, 89]]],

      //ULTIMATE
      ["ultimate-1", [[2, 4622, 86, 123]]],
      ["ultimate-2", [[90, 4622, 86, 123]]],
      ["ultimate-3", [[178, 4622, 86, 123]]],
      ["ultimate-4", [[266, 4622, 86, 123]]],
      ["ultimate-5", [[354, 4622, 86, 123]]],

      //CROUCH HURT 1
      ["crouchHurt1-1", [[2, 5634, 105, 90]]],
      ["crouchHurt1-2", [[109, 5634, 105, 90]]],

      //CROUCH HURT 2
      ["crouchHurt2-1", [[2, 5728, 88, 87]]],
      ["crouchHurt2-2", [[92, 5728, 88, 87]]],
    ]);

    this.animations = {
      [fighterState.IDLE]: ["idle-1", "idle-2", "idle-3", "idle-4"],
      [fighterState.WALKFORWARD]: [
        "walkforward-1",
        "walkforward-2",
        "walkforward-3",
        "walkforward-4",
        "walkforward-5",
      ],
      [fighterState.WALKBACKWARD]: [
        "walkbackward-1",
        "walkbackward-2",
        "walkbackward-3",
        "walkbackward-4",
        "walkbackward-5",
      ],
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
      [fighterState.PUNCH]: [
        "punch-1",
        "punch-2",
        "punch-3",
        "punch-4",
        "punch-5",
      ],
      [fighterState.KICK]: [
        "kick-1",
        "kick-2",
        "kick-3",
        "kick-4",
        "kick-5",
        "kick-6",
      ],
      [fighterState.PUNCHCOMBO1]: [
        "punchCombo1-1",
        "punchCombo1-2",
        "punchCombo1-3",
        "punchCombo1-4",
        "punchCombo1-5",
        "punchCombo1-6",
      ],
      [fighterState.PUNCHCOMBO2]: [
        "punchCombo2-1",
        "punchCombo2-2",
        "punchCombo2-3",
        "punchCombo2-4",
      ],
      [fighterState.PUNCHCOMBO3]: [
        "punchCombo3-1",
        "punchCombo3-2",
        "punchCombo3-3",
        "punchCombo3-4",
        "punchCombo3-5",
        "punchCombo3-6",
        "punchCombo3-7",
        "punchCombo3-8",
        "punchCombo3-9",
      ],
      [fighterState.PUNCHCOMBO4]: [
        "punchCombo4-1",
        "punchCombo4-2",
        "punchCombo4-3",
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
      ],
      [fighterState.CROUCHPUNCH]: [
        "crouchPunch-1",
        "crouchPunch-2",
        "crouchPunch-3",
      ],
      [fighterState.CROUCHKICK]: [
        "crouchKick-1",
        "crouchKick-2",
        "crouchKick-3",
      ],
      [fighterState.KIRECHARGE]: [
        "kiRecharge-1",
        "kiRecharge-2",
        "kiRecharge-3",
        "kiRecharge-4",
        "kiRecharge-5",
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
      ],
      [fighterState.CROUCHHURT1]: ["crouchHurt1-1", "crouchHurt1-2"],
      [fighterState.CROUCHHURT2]: ["crouchHurt2-1", "crouchHurt2-2"],
    };

    this.initialVelocity = {
      jump: -350,
    };
    this.health = 150;
    this.healthBarPosition = healthBarPosition;
    this.ki = 0;
  }
}
