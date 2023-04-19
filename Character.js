import { c, spriteSheet } from "./app.js";
import { gameData, keys } from "./gameData.js";

export class Character {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    this.spriteSheetData = null;
  }

  update() {
    c.drawImage(
      spriteSheet,
      this.spriteSheetData.idle.x,
      this.spriteSheetData.idle.y,
      this.spriteSheetData.idle.w,
      this.spriteSheetData.idle.h,
      this.x - this.spriteSheetData.idle.w / 2 + gameData.camera.x,
      this.y - this.spriteSheetData.idle.h / 2 + gameData.camera.y,
      this.spriteSheetData.idle.w,
      this.spriteSheetData.idle.h
    );

    c.beginPath();
    c.arc(this.x + gameData.camera.x, this.y + gameData.camera.y, this.radius, 0, 2 * Math.PI);
    c.stroke();
  }
}

export class Player extends Character {
  constructor(x, y, radius, spriteSheetData) {
    super(x, y, radius, spriteSheetData);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.spriteSheetData = spriteSheetData;

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

export class Enemy extends Character {
  constructor(x, y, radius, spriteSheetData) {
    super(x, y, radius, spriteSheetData);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.spriteSheetData = spriteSheetData;

    this.movementSpeed = 1;
  }
}
