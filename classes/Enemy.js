import { Character } from "./Character.js";

export class Enemy extends Character {
  constructor(x, y, radius, spriteSheetData, weaponData) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.spriteSheetData = spriteSheetData;
    this.weaponData = weaponData;
  }
}
