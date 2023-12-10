import { Stage } from "./Stage.js";
import { Goku } from "./Goku.js";
import { STAGE_FLOOR, fighterDirection } from "./constants.js";
import { Vegeta } from "./Vegeta.js";

export class DragonBallZ {
  constructor() {
    this.context = this.getContext();
    this.fighters = [];

    this.entities = [
      new Stage(),
      new Vegeta(250, STAGE_FLOOR, fighterDirection.LEFT, 1),
      new Goku(80, STAGE_FLOOR, fighterDirection.RIGHT, 0),
    ];

    this.entities[1].opponent = this.entities[2];
    this.entities[2].opponent = this.entities[1];

    //To maintain constant fps
    this.frameTime = {
      previousTime: 0,
      secondsPassed: 0,
    };
  }

  getContext() {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    return ctx;
  }

  update() {
    for (const entity of this.entities) {
      entity.update(this.frameTime, this.context);
    }
  }

  draw() {
    for (const entity of this.entities) {
      entity.draw(this.context);
    }
  }

  frame(time) {
    window.requestAnimationFrame(this.frame.bind(this));
    this.frameTime = {
      secondsPassed: (time - this.frameTime.previousTime) / 1000,
      previousTime: time,
    };

    this.update();
    this.draw();
  }

  start() {
    window.requestAnimationFrame(this.frame.bind(this));
  }
}
