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

    this.opponent;

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
    };
    this.changeState(fighterState.IDLE);
  }

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
    ddd;
  }

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

    // console.log("hit",hitBoxScreenDimension)
    // console.log("push",opponentPushBoxScreenDimension)
    if (!boxOverlaps(hitBoxScreenDimension, opponentPushBoxScreenDimension))
      return;
    this.attackLanded = true;
    console.log(this.name + " has hit " + this.opponent.name);
  }

  changeState(newState) {
    this.currentState = newState;
    this.animationFrame = 0;
    this.states[this.currentState].init.call(this);
  }

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
    if (control.isEnergyBall(this.playerId))
      this.changeState(fighterState.ENERGYBALL);
  }

  handleWalkForwardInit() {
    this.velocity.x = -60 * this.direction;
  }
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
  }

  handlePunchInit() {}

  handlePunchState() {
    if (
      this.attackLanded &&
      this.animationFrame >= this.animations[this.currentState].length - 1
    ) {
      this.opponent.health -= 5;
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

  handleKickInit() {}

  handleKickState() {
    if (
      this.attackLanded &&
      this.animationFrame >= this.animations[this.currentState].length - 1
    ) {
      this.opponent.health -= 5;
      this.attackLanded = false;
      if (control.isKick(this.playerId)) {
        this.changeState(fighterState.KICKCOMBO1);
      }
    } else if (
      !control.isKick(this.playerId) &&
      this.animationFrame >= this.animations[this.currentState].length - 1
    ) {
      this.changeState(fighterState.IDLE);
    }
  }

  handlePunchCombo1Init() {}

  handlePunchCombo1State() {
    if (
      this.attackLanded &&
      this.animationFrame >= this.animations[this.currentState].length - 1 &&
      control.isPunch(this.playerId)
    ) {
      this.opponent.health -= 5;
      this.attackLanded = false;
      this.changeState(fighterState.PUNCHCOMBO2);
    } else if (
      !control.isPunch(this.playerId) &&
      this.animationFrame >= this.animations[this.currentState].length - 1
    ) {
      this.changeState(fighterState.IDLE);
    }
  }
  handlePunchCombo2Init() {}

  handlePunchCombo2State() {
    if (
      this.attackLanded &&
      this.animationFrame >= this.animations[this.currentState].length - 1 &&
      control.isPunch(this.playerId)
    ) {
      this.opponent.health -= 5;
      this.attackLanded = false;
      this.changeState(fighterState.PUNCHCOMBO3);
    } else if (
      !control.isPunch(this.playerId) &&
      this.animationFrame >= this.animations[this.currentState].length - 1
    ) {
      this.changeState(fighterState.IDLE);
    }
  }
  handlePunchCombo3Init() {}

  handlePunchCombo3State() {
    if (
      this.attackLanded &&
      this.animationFrame >= this.animations[this.currentState].length - 1 &&
      control.isPunch(this.playerId)
    ) {
      this.opponent.health -= 5;
      this.attackLanded = false;
      this.changeState(fighterState.PUNCHCOMBO4);
    } else if (
      !control.isPunch(this.playerId) &&
      this.animationFrame >= this.animations[this.currentState].length - 1
    ) {
      this.changeState(fighterState.IDLE);
    }
  }
  handlePunchCombo4Init() {}

  handlePunchCombo4State() {
    if (this.animationFrame >= this.animations[this.currentState].length - 1) {
      this.opponent.health -= 5;
      this.attackLanded = false;
      this.changeState(fighterState.IDLE);
    }
  }

  handleKickCombo1Init() {}

  handleKickCombo1State() {
    if (this.animationFrame >= this.animations[this.currentState].length - 1) {
      this.opponent.health -= 5;
      this.attackLanded = false;
      this.changeState(fighterState.IDLE);
    }
  }

  handleJumpPunchInit() {}

  handleJumpPunchState(frameTime) {
    this.velocity.y += this.gravity * frameTime.secondsPassed;

    if (this.position.y > STAGE_FLOOR) {
      this.position.y = STAGE_FLOOR;
      this.velocity.y = 0;
      this.changeState(fighterState.IDLE);
    }
  }

  handleJumpKickInit() {}

  handleJumpKickState(frameTime) {
    this.velocity.y += this.gravity * frameTime.secondsPassed;

    if (this.position.y > STAGE_FLOOR) {
      this.position.y = STAGE_FLOOR;
      this.velocity.y = 0;
      this.changeState(fighterState.IDLE);
    }
  }

  handleCrouchPunchInit() {}
  handleCrouchPunchState() {
    if (this.animationFrame >= this.animations[this.currentState].length - 1) {
      this.changeState(fighterState.CROUCH);
    }
  }
  handleCrouchKickInit() {}

  handleCrouchKickState() {
    if (this.animationFrame >= this.animations[this.currentState].length - 1) {
      this.changeState(fighterState.CROUCH);
    }
  }

  handleKiRechargeInit() {}

  handleKiRechargeState(frameTime, ctx) {
    this.fire.setPosition({ x: 200, y: 200 });
    this.fire.draw(ctx);
    if (!control.isKiRecharge(this.playerId))
      this.changeState(fighterState.IDLE);
  }

  handleEnergyBallInit() {}

  handleEnergyBallState() {
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

  updateAnimation(frameTime, ctx) {
    if (frameTime.previousTime > this.animationTimer + 90) {
      this.animationTimer = frameTime.previousTime;

      this.boxes = this.getBoxes(
        this.animations[this.currentState][this.animationFrame]
      );
      this.animationFrame++;

      if (this.animationFrame >= this.animations[this.currentState].length) {
        if (this.currentState == fighterState.CROUCH) {
          this.animationFrame = this.animations[this.currentState].length - 1;
        } else if (this.currentState == fighterState.KIRECHARGE) {
          this.animationFrame = this.animations[this.currentState].length - 1;
        } else {
          this.animationFrame = 0;
        }
      }
    }
  }

  update(frameTime, ctx) {
    // console.log(this.opponent.health);
    this.position.x += this.velocity.x * frameTime.secondsPassed;
    this.position.y += this.velocity.y * frameTime.secondsPassed;

    this.direction = this.getDirection();

    this.states[this.currentState].update(frameTime, ctx);
    this.handleStageConstraints(frameTime, ctx);
    this.updateAnimation(frameTime, ctx);
    this.updateAttackBoxCollided(frameTime);
  }

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
    this.drawDebugBox(ctx, Object.values(boxes.push), "#55FF55");

    //HIT BOX
    this.drawDebugBox(ctx, Object.values(boxes.hit), "#FF0000");

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(Math.floor(this.position.x) - 5.5, Math.floor(this.position.y));
    ctx.lineTo(Math.floor(this.position.x) + 4.5, Math.floor(this.position.y));
    ctx.moveTo(Math.floor(this.position.x), Math.floor(this.position.y) - 5.5);
    ctx.lineTo(Math.floor(this.position.x), Math.floor(this.position.y) + 4.5);
    ctx.stroke();
  }

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

    this.drawDebug(ctx);
    this.drawHealthBar(ctx);
    this.drawKiBar(ctx);
  }

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

  drawKiBar(ctx) {
    if (this.healthBarPosition == "left") {
      ctx.strokeStyle = "gray";

      ctx.strokeRect(20, 50, 100, 10);

      if (this.health >= 0) {
        ctx.fillStyle = "blue";
        ctx.fillRect(20, 50, this.health, 10);
      }
    } else {
      ctx.strokeStyle = "gray";
      ctx.strokeRect(ctx.canvas.width - 20 - 150, 50, 100, 10);

      if (this.health >= 0) {
        ctx.fillStyle = "green";
        ctx.fillRect(ctx.canvas.width - 20 - this.health, 50, this.health, 10);
      }
    }
  }
}
