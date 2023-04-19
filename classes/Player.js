import { keys } from "../gameData.js";
import { Character } from "./Character.js";

export class Player extends Character {
  constructor(x, y, radius, spriteSheetData) {
    super(x, y, radius, spriteSheetData);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.anim.spriteSheetData = spriteSheetData;
    this.movementSpeed = 1;
  }

  moving() {
    const diagonalSpeed = this.movementSpeed / Math.sqrt(2); // prędkość na ukos

    // if (keys.a || keys.d || keys.w || keys.s) {
    //   if (this.animData.animState !== "run") this.animData.animState = "run";
    // } else {
    //   if (this.animData.animState !== "idle") this.animData.animState = "idle";
    // }

    // if (keys.d) {
    //   if (this.animData.xFlip === true) this.animData.xFlip = false;
    // } else if (keys.a) {
    //   if (this.animData.xFlip === false) this.animData.xFlip = true;
    // }

    if (keys.a && keys.w) {
      this.x -= diagonalSpeed;
      this.y -= diagonalSpeed;
    } else if (keys.a && keys.s) {
      this.x -= diagonalSpeed;
      this.y += diagonalSpeed;
    } else if (keys.d && keys.w) {
      this.x += diagonalSpeed;
      this.y -= diagonalSpeed;
    } else if (keys.d && keys.s) {
      this.x += diagonalSpeed;
      this.y += diagonalSpeed;
    } else if (keys.a) {
      this.x -= this.movementSpeed;
    } else if (keys.d) {
      this.x += this.movementSpeed;
    } else if (keys.w) {
      this.y -= this.movementSpeed;
    } else if (keys.s) {
      this.y += this.movementSpeed;
    }
  }
}
