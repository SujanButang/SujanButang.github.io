import { UltimateState } from "./constants.js";

const frames = new Map([
  ["kame-1", [[65, 13, 300, 132]]],
  ["kame-2", [[67, 180, 299, 154]]],
  ["kame-3", [[66, 356, 303, 140]]],
  ["kame-4", [[66, 520, 361, 134]]],
  ["kame-5", [[66, 836, 360, 141]]],
  ["kame-6", [[66, 1280, 460, 152]]],
  ["kame-7", [[67, 1566, 606, 133]]],
  ["kame-8", [[67, 1914, 603, 134]]],
  ["kame-9", [[66, 2290, 1021, 146]]],
  ["kame-10", [[64, 2801, 1223, 147]]],
]);

const animations = {
  [UltimateState.ACTIVE]: [
    "kame-1",
    "kame-2",
    "kame-3",
    "kame-4",
    "kame-5",
    "kame-6",
    "kame-7",
    "kame-8",
    "kame-9",
    "kame-10",
  ],
};
export class KameHame {
  animationFrame = 0;
  state = UltimateState.ACTIVE;

  canvas = document.querySelector("canvas");
  ctx = this.canvas.getContext("2d");

  constructor(fighter, frameTime) {
    this.fighter = fighter;
    this.direction = this.fighter.direction;
    this.position = this.fighter.position;
    this.frameTime = frameTime;
    this.animationTimer = this.frameTime.previousTime;
    this.image = document.querySelector('img[alt="kamehame"]');
  }

  update(frameTime, ctx) {
    if (frameTime.previousTime > this.animationTimer + 90) {
      this.animationTimer = frameTime.previousTime;
      this.animationFrame++;
      if (this.animationFrame >= animations[this.state].length) {
        this.animationFrame = 0;
      }
    }
    this.draw(ctx);
  }

  draw(ctx) {
    const [[x, y, width, height]] = frames.get(
      animations[this.state][this.animationFrame]
    );

    ctx.scale(this.direction, 1);

    // Calculate the adjusted drawing position
    const drawX = Math.floor(this.position.x * this.direction - width / 2);
    const drawY = Math.floor(this.position.y - height);

    ctx.drawImage(this.image, x, y, width, height, drawX, drawY, width, height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
