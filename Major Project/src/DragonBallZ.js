import { Stage } from "./Stage.js";
import { Goku } from "./Goku.js";
import { STAGE_FLOOR, fighterDirection } from "./constants.js";
import { Vegeta } from "./Vegeta.js";
import { Fire } from "./Fire.js";
import { Gohan } from "./Gohan.js";
export class DragonBallZ {
  constructor() {
    this.selected = localStorage.getItem("selected");
    this.opponent = localStorage.getItem("opponent");
    this.context = this.getContext();
    const selectedFighterClass = this.getFighterClass(this.selected);
    const opponentFighterClass = this.getFighterClass(this.opponent);

    this.fighters = [
      new selectedFighterClass(
        80,
        STAGE_FLOOR,
        fighterDirection.LEFT,
        0,
        "left"
      ),
      new opponentFighterClass(
        250,
        STAGE_FLOOR,
        fighterDirection.LEFT,
        1,
        "right"
      ),
    ];

    this.entities = [new Stage(), ...this.fighters];

    this.entities[1].opponent = this.entities[2];
    this.entities[2].opponent = this.entities[1];
    this.entities[1].fire = new Fire();
    this.entities[2].fire = new Fire();

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
      entity.update(this.frameTime, this.context, this.camera);
    }
  }

  draw() {
    for (const entity of this.entities) {
      entity.draw(this.context, this.camera);
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

  getFighterClass(fighterName) {
    switch (fighterName) {
      case "Goku":
        return Goku;
        
      case "Vegeta":
        return Vegeta;

      case "Gohan":
        return Gohan;
      default:
        throw new Error(`Unknown fighter: ${fighterName}`);
    }
  }
}
