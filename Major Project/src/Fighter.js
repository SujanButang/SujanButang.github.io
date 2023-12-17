import {
  boxOverlaps,
  getActualBoxDimensions,
  rectangleOverlaps,
} from "./collision.js";
import {
  STAGE_FLOOR,
  attackType,
  fighterDirection,
  fighterState,
} from "./constants.js";
import * as control from "./input.js";

export class Fighter {
  /**
   *
   * @param {String} name
   * @param {number} x
   * @param {number} y
   * @param {string} direction
   * @param {number} playerId
   */
  constructor(name, x, y, direction, playerId) {
    this.name = name;
    this.image = new Image();
    this.position = { x, y };
    this.velocity = { x: 0, y: 0 };
    this.playerId = playerId;
    this.frames = new Map();
    this.animationFrame = 0;
    this.animationTimer = 0;
    this.direction = direction;
    this.animations = {};
    this.gravity = 1000;
    this.initialVelocity = { jump: -350 };
    this.attackLanded = false;
    this.fire;
    this.health;
    this.healthBarPosition;
    this.ki;
    this.gameOver = false;

    this.opponent;
    this.CPUControlled;
    this.animationCompleted = false;

    this.boxes = {
      push: { x: 0, y: 0, width: 0, height: 0 },
      hit: { x: 0, y: 0, width: 0, height: 0 },
    };

    this.states = {
      [fighterState.IDLE]: {
        init: this.handleIdleInit.bind(this),
        update: this.handleIdleState.bind(this),
      },
      [fighterState.WALKFORWARD]: {
        init: this.handleWalkForwardInit.bind(this),
        update: this.handleWalkForwardState.bind(this),
      },
      [fighterState.WALKBACKWARD]: {
        init: this.handleWalkBackwardInit.bind(this),
        update: this.handleWalkBackwardState.bind(this),
      },
      [fighterState.JUMP]: {
        init: this.handleJumpInit.bind(this),
        update: this.handleJumpState.bind(this),
      },
      [fighterState.CROUCH]: {
        init: this.handleCrouchInit.bind(this),
        update: this.handleCrouchState.bind(this),
      },
      [fighterState.PUNCH]: {
        attackType: attackType.PUNCH,
        init: this.handlePunchInit.bind(this),
        update: this.handlePunchState.bind(this),
      },
      [fighterState.KICK]: {
        attackType: attackType.KICK,
        init: this.handleKickInit.bind(this),
        update: this.handleKickState.bind(this),
      },
      [fighterState.PUNCHCOMBO1]: {
        attackType: attackType.PUNCH,
        init: this.handlePunchCombo1Init.bind(this),
        update: this.handlePunchCombo1State.bind(this),
      },
      [fighterState.PUNCHCOMBO2]: {
        attackType: attackType.PUNCH,
        init: this.handlePunchCombo2Init.bind(this),
        update: this.handlePunchCombo2State.bind(this),
      },
      [fighterState.PUNCHCOMBO3]: {
        attackType: attackType.PUNCH,
        init: this.handlePunchCombo3Init.bind(this),
        update: this.handlePunchCombo3State.bind(this),
      },
      [fighterState.PUNCHCOMBO4]: {
        attackType: attackType.PUNCH,
        init: this.handlePunchCombo4Init.bind(this),
        update: this.handlePunchCombo4State.bind(this),
      },
      [fighterState.KICKCOMBO1]: {
        attackType: attackType.KICK,
        init: this.handleKickCombo1Init.bind(this),
        update: this.handleKickCombo1State.bind(this),
      },

      [fighterState.JUMPPUNCH]: {
        attackType: attackType.PUNCH,
        init: this.handleJumpPunchInit.bind(this),
        update: this.handleJumpPunchState.bind(this),
      },
      [fighterState.JUMPKICK]: {
        attackType: attackType.KICK,
        init: this.handleJumpKickInit.bind(this),
        update: this.handleJumpKickState.bind(this),
      },
      [fighterState.CROUCHPUNCH]: {
        attackType: attackType.PUNCH,
        init: this.handleCrouchPunchInit.bind(this),
        update: this.handleCrouchPunchState.bind(this),
      },
      [fighterState.CROUCHKICK]: {
        attackType: attackType.KICK,
        init: this.handleCrouchKickInit.bind(this),
        update: this.handleCrouchKickState.bind(this),
      },
      [fighterState.KIRECHARGE]: {
        init: this.handleKiRechargeInit.bind(this),
        update: this.handleKiRechargeState.bind(this),
      },
      [fighterState.ENERGYBALL]: {
        init: this.handleEnergyBallInit.bind(this),
        update: this.handleEnergyBallState.bind(this),
      },
      [fighterState.HURT1]: {
        init: this.handleHurt1Init.bind(this),
        update: this.handleHurt1State.bind(this),
      },
      [fighterState.HURT2]: {
        init: this.handleHurt2Init.bind(this),
        update: this.handleHurt2State.bind(this),
      },
      [fighterState.HURT3]: {
        init: this.handleHurt3Init.bind(this),
        update: this.handleHurt3State.bind(this),
      },
      [fighterState.HURT4]: {
        init: this.handleHurt4Init.bind(this),
        update: this.handleHurt4State.bind(this),
      },
      [fighterState.STANDINGBLOCK]: {
        init: this.handleStandingBlockInit.bind(this),
        update: this.handleStandingBlockState.bind(this),
      },
      [fighterState.CROUCHINGBLOCK]: {
        init: this.handleCrouchingBlockInit.bind(this),
        update: this.handleCrouchingBlockState.bind(this),
      },
      [fighterState.FALL]: {
        init: this.handleFallInit.bind(this),
        update: this.handleFallState.bind(this),
      },
      [fighterState.CROUCHHURT1]: {
        init: this.handleCrouchHurt1Init.bind(this),
        update: this.handleCrouchHurt1State.bind(this),
      },
      [fighterState.CROUCHHURT2]: {
        init: this.handleCrouchHurt2Init.bind(this),
        update: this.handleCrouchHurt2State.bind(this),
      },
    };
    this.changeState(fighterState.IDLE);
  }

  /**
   * Gets the direction of a fighter
   *
   * @returns number
   */
  getDirection() {
    if (
      this.position.x + this.boxes.push.x + this.boxes.push.width <=
      this.opponent.position.x + this.opponent.boxes.push.x
    ) {
      return fighterDirection.RIGHT;
    } else if (
      this.position.x + this.boxes.push.x >=
      this.opponent.position.x +
        this.opponent.boxes.push.x +
        this.opponent.boxes.push.width
    ) {
      return fighterDirection.LEFT;
    }
    return this.direction;
  }

  /**
   * Extract the Push Boxes and HitBoxes of a fighter
   *
   * @param {string} frameKey
   * @returns Object
   */
  getBoxes(frameKey) {
    const [
      ,
      [pushX = 0, pushY = 0, pushWidth = 0, pushHeight = 0] = [],
      [hitX = 0, hitY = 0, hitWidth = 0, hitHeight = 0] = [],
    ] = this.frames.get(frameKey);
    return {
      push: {
        x: pushX,
        y: pushY,
        width: pushWidth,
        height: pushHeight,
      },
      hit: {
        x: this.direction == -1 ? hitX : -(hitX + hitWidth),
        y: hitY,
        width: hitWidth,
        height: hitHeight,
      },
    };
  }

  /**
   * Checking if fighter collided with opponent fighter
   *
   * @returns boolean
   */
  hasCollidedWithOpponent() {
    return rectangleOverlaps(
      this.position.x + this.boxes.push.x,
      this.position.y + this.boxes.push.y,
      this.boxes.push.width,
      this.boxes.push.height,
      this.opponent.position.x + this.opponent.boxes.push.x,
      this.opponent.position.y + this.opponent.boxes.push.y,
      this.opponent.boxes.push.width,
      this.opponent.boxes.push.height
    );
  }

  /**
   * Checking if the hitbox and the pushbox collided
   * and determining if the attack landed or not
   *
   * @param {Object} frameTime
   * @returns void
   */
  updateAttackBoxCollided(frameTime) {
    if (!this.states[this.currentState].attackType) return;
    const hitBoxScreenDimension = getActualBoxDimensions(
      this.position,
      this.direction,
      this.boxes.hit
    );

    const opponentPushBoxScreenDimension = getActualBoxDimensions(
      this.opponent.position,
      this.opponent.direction,
      this.opponent.boxes.push
    );
    if (!boxOverlaps(hitBoxScreenDimension, opponentPushBoxScreenDimension))
      return;
    this.attackLanded = true;
  }

  /**
   * Changing the state of the fighter
   *
   * @param {string} newState
   */
  changeState(newState) {
    this.currentState = newState;
    this.animationFrame = 0;
    this.states[this.currentState].init.call(this);
  }

  /**
   * Initializing the Idle state
   */
  handleIdleInit() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  /**
   * Check for user input and Change Fighter State while being idle
   */
  handleIdleState() {
    if (control.isBackward(this.playerId, this.direction)) {
      this.changeState(fighterState.WALKBACKWARD);
    }
    if (control.isForward(this.playerId, this.direction)) {
      this.changeState(fighterState.WALKFORWARD);
    }
    if (control.isUp(this.playerId)) this.changeState(fighterState.JUMP);
    if (control.isDown(this.playerId)) this.changeState(fighterState.CROUCH);

    if (control.isPunch(this.playerId)) this.changeState(fighterState.PUNCH);
    if (control.isKick(this.playerId)) this.changeState(fighterState.KICK);
    if (control.isKiRecharge(this.playerId))
      this.changeState(fighterState.KIRECHARGE);

    if (control.isEnergyBall(this.playerId) && this.ki >= 5)
      this.changeState(fighterState.ENERGYBALL);

    if (control.isBlock(this.playerId))
      this.changeState(fighterState.STANDINGBLOCK);

    if (control.isUltimate(this.playerId)) {
      this.changeState(fighterState.ULTIMATE);
    }
  }

  /**
   * Initializing the walking forward state
   */
  handleWalkForwardInit() {
    this.velocity.x = -60 * this.direction;
  }

  /**
   * Chack the control while in walking state and
   * update state as necessary
   */
  handleWalkForwardState() {
    if (!control.isForward(this.playerId, this.direction))
      this.changeState(fighterState.IDLE);
    if (control.isUp(this.playerId)) this.changeState(fighterState.JUMP);
    if (control.isDown(this.playerId)) this.changeState(fighterState.CROUCH);
    if (control.isPunch(this.playerId)) this.changeState(fighterState.PUNCH);
    if (control.isKick(this.playerId)) this.changeState(fighterState.KICK);
  }

  handleWalkBackwardInit() {
    this.velocity.x = 60 * this.direction;
  }
  handleWalkBackwardState() {
    if (!control.isBackward(this.playerId, this.direction))
      this.changeState(fighterState.IDLE);
    if (control.isUp(this.playerId)) this.changeState(fighterState.JUMP);

    if (control.isDown(this.playerId)) this.changeState(fighterState.CROUCH);
    if (control.isPunch(this.playerId)) this.changeState(fighterState.PUNCH);
    if (control.isKick(this.playerId)) this.changeState(fighterState.KICK);
  }

  handleJumpInit() {
    this.velocity.y = this.initialVelocity.jump;
    this.attackSounds[fighterState.PUNCH].play();
  }

  handleJumpState(frameTime) {
    this.velocity.y += this.gravity * frameTime.secondsPassed;
    if (this.position.y > STAGE_FLOOR) {
      this.position.y = STAGE_FLOOR;
      this.velocity.y = 0;
      this.changeState(fighterState.IDLE);
    }
    if (control.isPunch(this.playerId)) {
      this.changeState(fighterState.JUMPPUNCH);
    }
    if (control.isKick(this.playerId)) {
      this.changeState(fighterState.JUMPKICK);
    }
  }

  handleCrouchInit() {
    this.velocity = { x: 0, y: 0 };
  }

  handleCrouchState() {
    if (!control.isDown(this.playerId)) this.changeState(fighterState.IDLE);
    if (control.isPunch(this.playerId))
      this.changeState(fighterState.CROUCHPUNCH);
    if (control.isKick(this.playerId))
      this.changeState(fighterState.CROUCHKICK);
    if (control.isBlock(this.playerId))
      this.changeState(fighterState.CROUCHINGBLOCK);
  }

  handlePunchInit() {
    this.attackSounds[fighterState.PUNCH].play();
  }

  handlePunchState() {
    if (
      this.attackLanded &&
      this.animationFrame >= this.animations[this.currentState].length - 1 &&
      (this.opponent.currentState !== fighterState.STANDINGBLOCK ||
        this.opponent.currentState !== fighterState.CROUCHINGBLOCK)
    ) {
      this.opponent.health -= 5;
      this.opponent.changeState(fighterState.HURT2);
      if (this.ki <= 100) {
        this.ki += 3;
      }
      this.attackLanded = false;
      if (control.isPunch(this.playerId)) {
        this.changeState(fighterState.PUNCHCOMBO1);
      }
    } else if (
      !control.isPunch(this.playerId) &&
      this.animationFrame >= this.animations[this.currentState].length - 1
    ) {
      this.changeState(fighterState.IDLE);
    }
  }

  handleKickInit() {
    this.attackSounds[fighterState.KICK].play();
  }

  handleKickState() {
    if (
      this.attackLanded &&
      this.animationFrame >= this.animations[this.currentState].length - 1 &&
      (this.opponent.currentState !== fighterState.STANDINGBLOCK ||
        this.opponent.currentState !== fighterState.CROUCHINGBLOCK)
    ) {
      this.opponent.health -= 10;
      this.attackLanded = false;
      this.opponent.changeState(fighterState.HURT2);
      if (this.ki <= 100) {
        this.ki += 3;
      }

      //if attack landed and control is still down change state to the next combo
      if (control.isKick(this.playerId)) {
        this.changeState(fighterState.KICKCOMBO1);
      }
      if (!control.isKick(this.playerId)) this.changeState(fighterState.IDLE);
    } else if (
      !control.isKick(this.playerId) &&
      this.animationFrame >= this.animations[this.currentState].length - 1
    ) {
      this.changeState(fighterState.IDLE);
    }
  }

  handlePunchCombo1Init() {
    this.attackSounds[fighterState.PUNCHCOMBO1].play();
  }

  handlePunchCombo1State() {
    if (
      this.attackLanded &&
      this.animationFrame >= this.animations[this.currentState].length - 1 &&
      control.isPunch(this.playerId) &&
      (this.opponent.currentState !== fighterState.STANDINGBLOCK ||
        this.opponent.currentState !== fighterState.CROUCHINGBLOCK)
    ) {
      this.opponent.health -= 5;
      if (this.ki <= 100) {
        this.ki += 3;
      }
      this.opponent.changeState(fighterState.HURT2);
      this.attackLanded = false;
      this.changeState(fighterState.PUNCHCOMBO2);
    } else if (
      !control.isPunch(this.playerId) &&
      this.animationFrame >= this.animations[this.currentState].length - 1
    ) {
      this.changeState(fighterState.IDLE);
    }
  }
  handlePunchCombo2Init() {
    this.attackSounds[fighterState.PUNCHCOMBO2].play();
  }

  handlePunchCombo2State() {
    if (
      this.attackLanded &&
      this.animationFrame >= this.animations[this.currentState].length - 1 &&
      control.isPunch(this.playerId) &&
      (this.opponent.currentState !== fighterState.STANDINGBLOCK ||
        this.opponent.currentState !== fighterState.CROUCHINGBLOCK)
    ) {
      this.opponent.health -= 5;
      if (this.ki <= 100) {
        this.ki += 3;
      }
      this.opponent.changeState(fighterState.HURT3);

      this.attackLanded = false;
      this.changeState(fighterState.PUNCHCOMBO3);
    } else if (
      !control.isPunch(this.playerId) &&
      this.animationFrame >= this.animations[this.currentState].length - 1
    ) {
      this.changeState(fighterState.IDLE);
    }
  }
  handlePunchCombo3Init() {
    this.attackSounds[fighterState.PUNCHCOMBO3].play();
  }

  handlePunchCombo3State() {
    if (
      this.attackLanded &&
      this.animationFrame >= this.animations[this.currentState].length - 1 &&
      control.isPunch(this.playerId) &&
      (this.opponent.currentState !== fighterState.STANDINGBLOCK ||
        this.opponent.currentState !== fighterState.CROUCHINGBLOCK)
    ) {
      this.opponent.health -= 5;
      this.opponent.changeState(fighterState.HURT2);

      if (this.ki <= 100) {
        this.ki += 3;
      }
      this.attackLanded = false;
      this.changeState(fighterState.PUNCHCOMBO4);
    } else if (
      !control.isPunch(this.playerId) &&
      this.animationFrame >= this.animations[this.currentState].length - 1
    ) {
      this.changeState(fighterState.IDLE);
    }
  }
  handlePunchCombo4Init() {
    this.attackSounds[fighterState.PUNCHCOMBO4].play();
  }

  handlePunchCombo4State() {
    if (
      this.animationFrame >= this.animations[this.currentState].length - 1 &&
      (this.opponent.currentState !== fighterState.STANDINGBLOCK ||
        this.opponent.currentState !== fighterState.CROUCHINGBLOCK)
    ) {
      this.opponent.health -= 10;
      if (this.ki <= 100) {
        this.ki += 3;
      }
      this.opponent.changeState(fighterState.HURT4);

      this.attackLanded = false;
      this.changeState(fighterState.IDLE);
    }
  }

  handleKickCombo1Init() {
    this.attackSounds[fighterState.KICKCOMBO1aad].play();
  }

  handleKickCombo1State() {
    if (
      this.animationFrame >= this.animations[this.currentState].length - 1 &&
      (this.opponent.currentState !== fighterState.STANDINGBLOCK ||
        this.opponent.currentState !== fighterState.CROUCHINGBLOCK)
    ) {
      this.opponent.health -= 15;
      this.opponent.changeState(fighterState.HURT4);
      if (this.ki <= 100) {
        this.ki += 3;
      }

      this.attackLanded = false;
      this.changeState(fighterState.IDLE);
    }
  }

  handleJumpPunchInit() {
    this.attackSounds[fighterState.PUNCHCOMBO1].play();
  }

  handleJumpPunchState(frameTime) {
    this.velocity.y += this.gravity * frameTime.secondsPassed;

    if (this.position.y > STAGE_FLOOR) {
      this.position.y = STAGE_FLOOR;
      this.velocity.y = 0;
      this.changeState(fighterState.IDLE);
    }
    if (
      this.attackLanded &&
      this.animationFrame >= this.animations[this.currentState].length - 1 &&
      (this.opponent.currentState !== fighterState.STANDINGBLOCK ||
        this.opponent.currentState !== fighterState.CROUCHINGBLOCK)
    ) {
      this.opponent.health -= 3;
      this.opponent.changeState(fighterState.HURT2);

      if (this.ki <= 100) {
        this.ki += 1;
      }
      this.attackLanded = false;
    }
  }

  handleJumpKickInit() {
    this.attackSounds[fighterState.PUNCHCOMBO2].play();
  }

  handleJumpKickState(frameTime) {
    this.velocity.y += this.gravity * frameTime.secondsPassed;

    if (this.position.y > STAGE_FLOOR) {
      this.position.y = STAGE_FLOOR;
      this.velocity.y = 0;
      this.changeState(fighterState.IDLE);
    }
    if (
      this.attackLanded &&
      this.animationFrame >= this.animations[this.currentState].length - 1 &&
      (this.opponent.currentState !== fighterState.STANDINGBLOCK ||
        this.opponent.currentState !== fighterState.CROUCHINGBLOCK)
    ) {
      this.opponent.health -= 3;
      this.opponent.changeState(fighterState.HURT4);

      if (this.ki <= 100) {
        this.ki += 1;
      }
      this.attackLanded = false;
    }
  }

  handleCrouchPunchInit() {
    this.attackSounds[fighterState.PUNCHCOMBO1].play();
  }
  handleCrouchPunchState() {
    if (
      this.attackLanded &&
      this.animationFrame >= this.animations[this.currentState].length - 1 &&
      (this.opponent.currentState !== fighterState.STANDINGBLOCK ||
        this.opponent.currentState !== fighterState.CROUCHINGBLOCK)
    ) {
      this.opponent.health -= 5;
      if (this.opponent.currentState == fighterState.CROUCH) {
        this.opponent.changeState(fighterState.CROUCHHURT1);
      } else {
        this.opponent.changeState(fighterState.HURT1);
      }
      if (this.ki <= 100) {
        this.ki += 3;
      }
      this.changeState(fighterState.CROUCH);
    } else if (
      this.animationFrame >=
      this.animations[this.currentState].length - 1
    ) {
      this.changeState(fighterState.CROUCH);
    }
  }
  handleCrouchKickInit() {
    this.attackSounds[fighterState.PUNCHCOMBO3].play();
  }

  handleCrouchKickState(frameTime) {
    if (
      this.attackLanded &&
      this.animationFrame >= this.animations[this.currentState].length - 1 &&
      (this.opponent.currentState !== fighterState.STANDINGBLOCK ||
        this.opponent.currentState !== fighterState.CROUCHINGBLOCK)
    ) {
      this.opponent.health -= 5;
      if (this.opponent.currentState == fighterState.CROUCH) {
        this.opponent.changeState(fighterState.CROUCHHURT2);
      } else {
        this.opponent.changeState(fighterState.FALL);
      }

      this.attackLanded = false;

      if (this.ki <= 100) {
        this.ki += 3;
      }
      this.changeState(fighterState.CROUCH);
    } else if (
      this.animationFrame >=
      this.animations[this.currentState].length - 1
    ) {
      this.changeState(fighterState.CROUCH);
    }
  }

  handleKiRechargeInit() {
    this.attackSounds[fighterState.KIRECHARGE].play();
  }

  handleKiRechargeState(frameTime, ctx) {
    this.fire.setPosition({ x: 200, y: 200 });
    this.fire.draw(ctx);
    if (this.ki <= 100) {
      this.ki += 0.2;
    }
    if (!control.isKiRecharge(this.playerId))
      this.changeState(fighterState.IDLE);
  }

  handleEnergyBallInit() {}

  handleEnergyBallState() {
    if (this.animationFrame >= this.animations[this.currentState].length - 1) {
      this.ki -= 5;
      this.changeState(fighterState.IDLE);
    }
  }

  handleHurt1Init() {
    this.attackSounds[fighterState.HURT1].play();
  }

  handleHurt1State() {
    if (this.animationFrame >= this.animations[this.currentState].length - 1) {
      this.changeState(fighterState.IDLE);
    }
  }
  handleHurt2Init() {
    this.attackSounds[fighterState.HURT2].play();
  }

  handleHurt2State() {
    if (this.animationFrame >= this.animations[this.currentState].length - 1) {
      this.changeState(fighterState.IDLE);
    }
  }
  handleHurt3Init() {
    this.attackSounds[fighterState.HURT3].play();
  }

  handleHurt3State() {
    if (this.animationFrame >= this.animations[this.currentState].length - 1) {
      this.changeState(fighterState.IDLE);
    }
  }
  handleHurt4Init() {
    this.attackSounds[fighterState.HURT2].play();
  }

  handleHurt4State() {
    if (this.animationFrame >= this.animations[this.currentState].length - 1) {
      this.changeState(fighterState.FALL);
    }
  }

  handleStandingBlockInit() {}

  handleStandingBlockState() {
    if (!control.isBlock(this.playerId)) this.changeState(fighterState.IDLE);
  }

  handleCrouchingBlockInit() {}
  handleCrouchingBlockState() {
    if (!control.isBlock(this.playerId)) this.changeState(fighterState.IDLE);
  }

  handleFallInit() {
    this.attackSounds[fighterState.FALL].play();
  }
  handleFallState() {
    if (this.animationFrame >= this.animations[this.currentState].length - 1) {
      this.changeState(fighterState.IDLE);
    }
  }

  handleCrouchHurt1Init() {
    this.attackSounds[fighterState.HURT3].play();
  }

  handleCrouchHurt1State() {
    if (this.animationFrame >= this.animations[this.currentState].length - 1) {
      this.changeState(fighterState.CROUCH);
    }
  }

  handleCrouchHurt2Init() {
    this.attackSounds[fighterState.HURT2].play();
  }
  handleCrouchHurt2State() {
    if (this.animationFrame >= this.animations[this.currentState].length - 1) {
      this.changeState(fighterState.CROUCH);
    }
  }
  /**
   * Limit the fighters within the stage constraints
   *
   * @param {canvas context} ctx
   */
  handleStageConstraints(frameTime, ctx) {
    if (this.position.x > ctx.canvas.width - this.boxes.push.width) {
      this.position.x = ctx.canvas.width - this.boxes.push.width;
    }

    if (this.position.x < this.boxes.push.width) {
      this.position.x = this.boxes.push.width;
    }
    if (this.hasCollidedWithOpponent()) {
      if (this.position.x <= this.opponent.position.x) {
        this.position.x = Math.max(
          this.opponent.position.x +
            this.opponent.boxes.push.x -
            (this.boxes.push.x + this.boxes.push.width),
          this.boxes.push.width
        );
        if (
          [fighterState.IDLE, fighterState.CROUCH, fighterState.JUMP].includes(
            this.opponent.currentState
          )
        ) {
          this.opponent.position.x += 66 * frameTime.secondsPassed;
        }
      }
      if (this.position.x >= this.opponent.position.x) {
        Math.min(
          this.opponent.position.x +
            this.opponent.boxes.push.x +
            this.opponent.boxes.push.width +
            (this.boxes.push.width + this.boxes.push.x),
          ctx.canvas.width - this.boxes.push.width
        );
        if (
          [fighterState.IDLE, fighterState.CROUCH, fighterState.JUMP].includes(
            this.opponent.currentState
          )
        ) {
          this.opponent.position.x -= 66 * frameTime.secondsPassed;
        }
      }
    }
  }

  /**
   * check for the animation state and update the animation as required
   *
   * @param {Object} frameTime
   * @param {Canvas Context} ctx
   */
  updateAnimation(frameTime, ctx) {
    if (
      frameTime.previousTime > this.animationTimer + 90 &&
      this.currentState !== fighterState.HURT1 &&
      this.currentState !== fighterState.HURT2 &&
      this.currentState !== fighterState.HURT3 &&
      this.currentState !== fighterState.HURT4
    ) {
      this.animationTimer = frameTime.previousTime;

      this.boxes = this.getBoxes(
        this.animations[this.currentState][this.animationFrame]
      );
      this.animationFrame++;

      if (this.animationFrame >= this.animations[this.currentState].length) {
        if (
          this.currentState == fighterState.CROUCH ||
          this.currentState == fighterState.KIRECHARGE ||
          this.currentState == fighterState.STANDINGBLOCK ||
          this.currentState == fighterState.CROUCHINGBLOCK
        ) {
          this.animationFrame = this.animations[this.currentState].length - 1;
        } else {
          this.animationFrame = 0;
        }
      }
    } else if (
      frameTime.previousTime > this.animationTimer + 100 &&
      (this.currentState === fighterState.HURT1 ||
        this.currentState === fighterState.HURT2 ||
        this.currentState === fighterState.HURT3 ||
        this.currentState === fighterState.HURT4)
    ) {
      this.animationTimer = frameTime.previousTime;

      this.boxes = this.getBoxes(
        this.animations[this.currentState][this.animationFrame]
      );
      this.animationFrame++;

      if (this.animationFrame >= this.animations[this.currentState].length) {
        this.animationFrame = 0;
      }
    }
  }

  /**
   * Game Loop
   *
   * @param {Object} frameTime
   * @param {canvas context} ctx
   */
  update(frameTime, ctx) {
    this.position.x += this.velocity.x * frameTime.secondsPassed;
    this.position.y += this.velocity.y * frameTime.secondsPassed;

    this.direction = this.getDirection();

    this.states[this.currentState].update(frameTime, ctx);
    this.handleStageConstraints(frameTime, ctx);
    this.updateAnimation(frameTime, ctx);
    this.updateAttackBoxCollided(frameTime);

    if (this.gameOver && control.isRestart(this.playerId)) {
      location.reload();
    } else if (this.gameOver && control.isMenu(this.playerId)) {
      window.location.href = "./main.html";
    }
    if (this.opponent.CPUControlled) {
      this.updateCPUControl();
    }
  }

  /**
   * Drawing debugging boxes to visualize the hit states
   *
   * @param {context} ctx
   * @param {Array} dimension
   * @param {string} baseColor
   * @returns
   */
  drawDebugBox(ctx, dimension, baseColor) {
    if (!Array.isArray(dimension)) return;

    const [x = 0, y = 0, width = 0, height = 0] = dimension;
    ctx.beginPath();
    ctx.strokeStyle = baseColor + "AA";
    ctx.fillStyle = baseColor + "44";
    ctx.fillRect(
      Math.floor(this.position.x + x) + 0.5,
      Math.floor(this.position.y + y) + 0.5,
      width,
      height
    );

    ctx.rect(
      Math.floor(this.position.x + x) + 0.5,
      Math.floor(this.position.y + y) + 0.5,
      width,
      height
    );

    ctx.stroke();
  }

  drawDebug(ctx) {
    ctx.lineWidth = 1;

    const frameKey = this.animations[this.currentState][this.animationFrame];
    const boxes = this.getBoxes(frameKey);

    //PUSH BOX
    // this.drawDebugBox(ctx, Object.values(boxes.push), "#55FF55");

    //HIT BOX
    // this.drawDebugBox(ctx, Object.values(boxes.hit), "#FF0000");

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(Math.floor(this.position.x) - 5.5, Math.floor(this.position.y));
    ctx.lineTo(Math.floor(this.position.x) + 4.5, Math.floor(this.position.y));
    ctx.moveTo(Math.floor(this.position.x), Math.floor(this.position.y) - 5.5);
    ctx.lineTo(Math.floor(this.position.x), Math.floor(this.position.y) + 4.5);
    ctx.stroke();
  }

  /**
   * Drawing required sprites
   *
   * @param {context} ctx
   * @returns void
   */
  draw(ctx) {
    const [[x, y, width, height]] = this.frames.get(
      this.animations[this.currentState][this.animationFrame]
    );

    ctx.scale(this.direction, 1);

    // Calculate the adjusted drawing position
    const drawX = Math.floor(this.position.x * this.direction - width / 2);
    const drawY = Math.floor(this.position.y - height);

    ctx.drawImage(this.image, x, y, width, height, drawX, drawY, width, height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // this.drawDebug(ctx);
    this.drawHealthBar(ctx);
    this.drawKiBar(ctx);

    if (this.opponent.health <= 0) {
      this.gameOver = true;
      this.drawWinMessage(ctx);
      return;
    }
  }

  /**
   * Drawing the health bar of the fighters
   *
   * @param {context} ctx
   */
  drawHealthBar(ctx) {
    if (this.healthBarPosition == "left") {
      ctx.font = "12px serif";
      ctx.fillText(this.name, 20, 25);
      ctx.strokeStyle = "gray";

      ctx.strokeRect(20, 30, 150, 10);

      if (this.health >= 0) {
        ctx.fillStyle = "green";
        ctx.fillRect(20, 30, this.health, 10);
      }
    } else {
      ctx.font = "12px serif";
      ctx.fillText(this.name, ctx.canvas.width - 20 - 35, 25);

      ctx.strokeStyle = "gray";
      ctx.strokeRect(ctx.canvas.width - 20 - 150, 30, 150, 10);

      if (this.health >= 0) {
        ctx.fillStyle = "green";
        ctx.fillRect(ctx.canvas.width - 20 - this.health, 30, this.health, 10);
      }
    }
  }

  drawWinMessage(ctx) {
    ctx.font = "30px serif";
    ctx.fillStyle = "red";
    ctx.fillText(
      `${this.name} won!`,
      ctx.canvas.width / 2 - 60,
      ctx.canvas.height / 2
    );

    ctx.font = "18px serif";
    ctx.fillStyle = "black";
    ctx.fillText(
      "Press Space to restart or Esc to go to main Menu",
      ctx.canvas.width / 2 - 180,
      ctx.canvas.height / 2 + 30
    );
  }

  drawKiBar(ctx) {
    if (this.healthBarPosition == "left") {
      ctx.strokeStyle = "gray";

      ctx.strokeRect(20, 45, 100, 5);

      ctx.fillStyle = "blue";
      ctx.fillRect(20, 45, this.ki, 5);
    } else {
      ctx.strokeStyle = "gray";
      ctx.strokeRect(ctx.canvas.width - 20 - 100, 45, 100, 5);

      ctx.fillStyle = "blue";
      ctx.fillRect(ctx.canvas.width - 20 - this.ki, 45, this.ki, 5);
    }
  }

  updateCPUControl() {
    //PLayer Movement
    if (this.position.x <= this.opponent.position.x) {
    }
  }
}
