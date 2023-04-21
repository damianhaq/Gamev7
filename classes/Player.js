import { keys } from "../gameData.js";
import { Character } from "./Character.js";

export class Player extends Character {
  // TODO: oddaj parametr weapon: null lub weapon data
  constructor(x, y, radius, spriteSheetData, weaponData) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.spriteSheetData = spriteSheetData;
    this.weaponData = weaponData;
    console.log(this.weaponData);
  }

  moving() {
    const diagonalSpeed = this.movementSpeed / Math.sqrt(2); // prędkość na ukos

    if (keys.a || keys.d || keys.w || keys.s) {
      if (this.anim.state !== "run") this.anim.state = "run";
    } else {
      if (this.anim.state !== "idle") this.anim.state = "idle";
    }

    if (keys.d) {
      if (this.anim.xAxisFlip === true) this.anim.xAxisFlip = false;
    } else if (keys.a) {
      if (this.anim.xAxisFlip === false) this.anim.xAxisFlip = true;
    }

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
