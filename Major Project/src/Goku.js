import { Fighter } from "./Fighter.js";
import { KameHame } from "./KameHame.js";
import { PushBox, fighterState } from "./constants.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
export class Goku extends Fighter {

  attackSounds = {
    [fighterState.PUNCH]: document.querySelector("audio#goku-hit-1"),
    [fighterState.KICK]: document.querySelector("audio#goku-hit-1"),
    [fighterState.PUNCHCOMBO1]: document.querySelector("audio#goku-hit-2"),
    [fighterState.PUNCHCOMBO2]: document.querySelector("audio#goku-hit-3"),
    [fighterState.PUNCHCOMBO3]: document.querySelector("audio#goku-hit-4"),
    [fighterState.KICKCOMBO1]: document.querySelector("audio#goku-hit-4"),

    [fighterState.HURT1]: document.querySelector("audio#goku-hurt-1"),
    [fighterState.HURT2]: document.querySelector("audio#goku-hurt-2"),
    [fighterState.HURT3]: document.querySelector("audio#goku-hurt-3"),

    [fighterState.CROUCHHURT1]: document.querySelector("audio#goku-hurt-1"),
    [fighterState.CROUCHHURT2]: document.querySelector("audio#goku-hurt-2"),

    [fighterState.FALL]: document.querySelector("audio#goku-fall"),
    [fighterState.KIRECHARGE]: document.querySelector("audio#goku-ki"),
  };
  constructor(x, y, direction, playerId, healthBarPosition) {
    super("Goku", x, y, direction, playerId);
    this.image = document.querySelector('img[alt="goku"]');
    this.frameTime = {
      previousTime: 0,
      secondsPassed: 0,
    };
    this.CPUControlled = false;
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
      ["kick-3", [[328, 1991, 161, 149], PushBox.IDLE, [25, -100, 55, 20]]],
      ["kick-4", [[491, 1991, 161, 149], PushBox.IDLE]],
      ["kick-5", [[654, 1991, 161, 149], PushBox.IDLE]],
      ["kick-6", [[817, 1991, 161, 149], PushBox.IDLE]],

      //punchCombo-1
      ["punchCombo1-1", [[2, 3536, 148, 124], PushBox.IDLE]],
      ["punchCombo1-2", [[152, 3536, 148, 124], PushBox.IDLE]],
      ["punchCombo1-3", [[302, 3536, 148, 124], PushBox.IDLE]],
      [
        "punchCombo1-4",
        [[452, 3536, 148, 124], PushBox.IDLE, [20, -120, 49, 25]],
        ,
      ],
      [
        "punchCombo1-5",
        [[602, 3536, 148, 124], PushBox.IDLE, [20, -120, 30, 25]],
      ],
      ["punchCombo1-6", [[752, 3536, 148, 124], PushBox.IDLE]],

      //punchCombo-2
      ["punchCombo2-1", [[2, 3976, 101, 154], PushBox.IDLE]],
      [
        "punchCombo2-2",
        [[105, 3976, 101, 154], PushBox.IDLE, [5, -120, 40, 50]],
      ],
      [
        "punchCombo2-3",
        [[208, 3976, 101, 154], PushBox.IDLE, [5, -120, 40, 50]],
      ],
      [
        "punchCombo2-4",
        [[311, 3976, 101, 154], PushBox.IDLE, [5, -120, 40, 50]],
      ],
      ["punchCombo2-5", [[414, 3976, 101, 154], PushBox.IDLE]],
      ["punchCombo2-6", [[517, 3976, 101, 154], PushBox.IDLE]],

      //punchCombo-3
      ["punchCombo3-1", [[2, 4134, 142, 122], PushBox.IDLE]],
      ["punchCombo3-2", [[146, 4134, 142, 122], PushBox.IDLE]],
      [
        "punchCombo3-3",
        [[290, 4134, 142, 122], PushBox.IDLE, [20, -80, 50, 20]],
      ],
      [
        "punchCombo3-4",
        [[434, 4134, 142, 122], PushBox.IDLE, [20, -80, 50, 20]],
      ],
      [
        "punchCombo3-5",
        [[578, 4134, 142, 122], PushBox.IDLE, [20, -80, 50, 20]],
      ],
      ["punchCombo3-6", [[722, 4134, 142, 122], PushBox.IDLE]],

      //punchCombo-4
      ["punchCombo4-1", [[2, 4260, 158, 157], PushBox.IDLE]],
      ["punchCombo4-2", [[162, 4260, 158, 157], PushBox.IDLE]],
      ["punchCombo4-3", [[322, 4260, 158, 157], PushBox.IDLE]],
      [
        "punchCombo4-4",
        [[482, 4260, 158, 157], PushBox.IDLE, [30, -100, 50, 25]],
      ],
      [
        "punchCombo4-5",
        [[642, 4260, 158, 157], PushBox.IDLE, [30, -100, 50, 25]],
      ],
      ["punchCombo4-6", [[802, 4260, 158, 157], PushBox.IDLE]],

      //KICK COMBO 1
      ["kickCombo1-1", [[2, 3224, 159, 153], PushBox.IDLE]],
      ["kickCombo1-2", [[163, 3224, 159, 153], PushBox.IDLE]],
      [
        "kickCombo1-3",
        [[324, 3224, 159, 153], PushBox.IDLE, [15, -110, 55, 20]],
      ],
      [
        "kickCombo1-4",
        [[485, 3224, 159, 153], PushBox.IDLE, [15, -110, 55, 20]],
      ],
      ["kickCombo1-5", [[646, 3224, 159, 153], PushBox.IDLE]],
      ["kickCombo1-6", [[807, 3224, 159, 153], PushBox.IDLE]],

      //Jumping Punch
      ["jumpPunch-1", [[2, 2489, 151, 138], PushBox.JUMP]],
      ["jumpPunch-2", [[155, 2489, 151, 138], PushBox.JUMP, [15, -50, 55, 20]]],
      ["jumpPunch-3", [[308, 2489, 151, 138], PushBox.JUMP]],
      ["jumpPunch-4", [[461, 2489, 151, 138], PushBox.JUMP]],

      //Jumping Kick
      ["jumpKick-1", [[2, 2631, 152, 150], PushBox.JUMP]],
      ["jumpKick-2", [[156, 2631, 152, 150], PushBox.JUMP]],
      ["jumpKick-3", [[310, 2631, 152, 150], PushBox.JUMP]],
      ["jumpKick-4", [[464, 2631, 152, 150], PushBox.JUMP, [15, -110, 55, 90]]],
      ["jumpKick-5", [[618, 2631, 152, 150], PushBox.JUMP]],
      ["jumpKick-6", [[772, 2631, 152, 150], PushBox.JUMP]],

      //Crouching Punch
      ["crouchPunch-1", [[2, 2277, 134, 106], PushBox.CROUCH]],
      [
        "crouchPunch-2",
        [[138, 2277, 134, 106], PushBox.CROUCH, [20, -80, 49, 13]],
      ],
      [
        "crouchPunch-3",
        [[274, 2277, 134, 106], PushBox.CROUCH, [20, -80, 49, 13]],
      ],
      ["crouchPunch-4", [[410, 2277, 134, 106], PushBox.CROUCH]],

      //Crouching Kick
      ["crouchKick-1", [[2, 2387, 177, 98], PushBox.CROUCH]],
      ["crouchKick-2", [[181, 2387, 177, 98], PushBox.CROUCH]],
      [
        "crouchKick-3",
        [[360, 2387, 177, 98], PushBox.CROUCH, [30, -55, 55, 20]],
      ],
      [
        "crouchKick-4",
        [[539, 2387, 177, 98], PushBox.CROUCH, [30, -55, 55, 20]],
      ],
      ["crouchKick-5", [[718, 2387, 177, 98], PushBox.CROUCH]],
      ["crouchKick-6", [[897, 2387, 177, 98], PushBox.CROUCH]],

      //Ki Recharge
      ["kiRecharge-1", [[2, 5040, 128, 162], PushBox.IDLE]],
      ["kiRecharge-2", [[132, 5040, 128, 162], PushBox.IDLE]],
      ["kiRecharge-3", [[262, 5040, 128, 162], PushBox.IDLE]],
      ["kiRecharge-4", [[392, 5040, 128, 162], PushBox.IDLE]],

      //HURT1
      ["hurt1-1", [[2, 6214, 101, 148]]],
      ["hurt1-2", [[105, 6214, 101, 148]]],
      ["hurt1-3", [[208, 6214, 101, 148]]],
      ["hurt1-4", [[311, 6214, 101, 148]]],

      //HURT2
      ["hurt2-1", [[2, 6366, 109, 138]]],
      ["hurt2-2", [[113, 6366, 109, 138]]],

      //HURT3
      ["hurt3-1", [[2, 6508, 84, 129]]],
      ["hurt3-2", [[88, 6508, 84, 129]]],

      //HURT4
      ["hurt4-1", [[296, 6957, 145, 115]]],
      ["hurt4-2", [[443, 6957, 145, 115]]],
      ["hurt4-3", [[2, 6957, 145, 115]]],
      ["hurt4-4", [[149, 6957, 145, 115]]],

      //CROUCH HURT 1
      ["crouchHurt1-1", [[2, 6742, 126, 103]]],
      ["crouchHurt1-2", [[130, 6742, 126, 103]]],

      //CROUCH HURT 2
      ["crouchHurt2-1", [[2, 6849, 113, 104]]],
      ["crouchHurt2-2", [[117, 6849, 113, 104]]],

      //FALL
      ["fall-1", [[2, 7350, 153, 107]]],
      ["fall-2", [[157, 7350, 153, 107]]],
      ["fall-3", [[312, 7350, 153, 107]]],
      ["fall-4", [[467, 7350, 153, 107]]],
      ["fall-5", [[622, 7350, 153, 107]]],
      ["fall-6", [[777, 7350, 153, 107]]],
      ["fall-7", [[932, 7350, 153, 107]]],

      // //ENERGY BALL
      // ["energyBall-1", [[2, 2144, 128, 129], PushBox.IDLE]],
      // ["energyBall-2", [[132, 2144, 128, 129], PushBox.IDLE]],
      // ["energyBall-3", [[262, 2144, 128, 129], PushBox.IDLE]],
      // ["energyBall-4", [[392, 2144, 128, 129], PushBox.IDLE]],
      // ["energyBall-5", [[522, 2144, 128, 129], PushBox.IDLE]],
      // ["energyBall-6", [[652, 2144, 128, 129], PushBox.IDLE]],

      //STANDING BLOCK
      ["standingBlock-1", [[2, 702, 97, 122]]],
      ["standingBlock-2", [[101, 702, 97, 122]]],
      ["standingBlock-3", [[200, 702, 97, 122]]],

      //CROUCHING BLOCK
      ["crouchingBlock-1", [[2, 828, 82, 101]]],
      ["crouchingBlock-2", [[86, 828, 82, 101]]],
      ["crouchingBlock-3", [[170, 828, 82, 101]]],

      //ULTIMATE
      ["ultimate-1", [[2, 5539, 135, 124]]],
      ["ultimate-2", [[139, 5539, 135, 124]]],
      ["ultimate-3", [[276, 5539, 135, 124]]],
      ["ultimate-4", [[413, 5539, 135, 124]]],
      ["ultimate-5", [[550, 5539, 135, 124]]],
      ["ultimate-6", [[687, 5539, 135, 124]]],
      ["ultimate-7", [[824, 5539, 135, 124]]],
      ["ultimate-8", [[961, 5539, 135, 124]]],
      ["ultimate-9", [[1098, 5539, 135, 124]]],
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
        "punchCombo2-5",
        "punchCombo2-6",
      ],
      [fighterState.PUNCHCOMBO3]: [
        "punchCombo3-1",
        "punchCombo3-2",
        "punchCombo3-3",
        "punchCombo3-4",
        "punchCombo3-5",
        "punchCombo3-6",
      ],
      [fighterState.PUNCHCOMBO4]: [
        "punchCombo4-1",
        "punchCombo4-2",
        "punchCombo4-3",
        "punchCombo4-4",
        "punchCombo4-5",
        "punchCombo4-6",
      ],
      [fighterState.KICKCOMBO1]: [
        "kickCombo1-1",
        "kickCombo1-2",
        "kickCombo1-3",
        "kickCombo1-4",
        "kickCombo1-5",
        "kickCombo1-6",
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
      [fighterState.CROUCHPUNCH]: [
        "crouchPunch-1",
        "crouchPunch-2",
        "crouchPunch-3",
        "crouchPunch-4",
      ],
      [fighterState.CROUCHKICK]: [
        "crouchKick-1",
        "crouchKick-2",
        "crouchKick-3",
        "crouchKick-4",
        "crouchKick-5",
        "crouchKick-6",
      ],
      [fighterState.KIRECHARGE]: [
        "kiRecharge-1",
        "kiRecharge-2",
        "kiRecharge-3",
        "kiRecharge-4",
      ],

      // [fighterState.ENERGYBALL]: [
      //   "energyBall-1",
      //   "energyBall-2",
      //   "energyBall-3",
      //   "energyBall-4",
      //   "energyBall-5",
      //   "energyBall-6",
      // ],
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
      [fighterState.ULTIMATE]: [
        "ultimate-1",
        "ultimate-2",
        "ultimate-3",
        "ultimate-4",
        "ultimate-5",
        "ultimate-6",
        "ultimate-7",
        "ultimate-8",
        "ultimate-9",
      ],
    };

    this.initialVelocity = {
      jump: -350,
    };
    this.health = 150;
    this.healthBarPosition = healthBarPosition;
    this.ki = 0;

    this.states[fighterState.ULTIMATE] = {
      init: this.handleUltimateInit.bind(this),
      update: this.handleUltimateState.bind(this),
    };
  }

  handleUltimateInit() {}
  handleUltimateState() {
    if (this.animationFrame >= this.animations[this.currentState].length - 1) {
      const kame = new KameHame(this, this.frameTime);
      kame.draw(ctx);
      kame.update(this.frameTime,ctx);
    }
  }
}
