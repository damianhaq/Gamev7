import { Character } from "./Character.js";

export class Enemy extends Character {
  constructor(x, y, radius, spriteSheetData) {
    super(x, y, radius, spriteSheetData);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.anim.spriteSheetData = spriteSheetData;

    this.movementSpeed = 1;
  }
}
