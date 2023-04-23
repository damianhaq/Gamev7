import { drawSprite } from "../functions.js";

export class Item {
  constructor(x, y, spriteSheetData, isFlipX, angle, id) {
    this.x = x;
    this.y = y;
    this.spriteSheetData = spriteSheetData;
    this.isFlipX = isFlipX;
    this.angle = angle;
    this.id = id;
  }

  update() {
    drawSprite(this.spriteSheetData, this.x, this.y, 0, 0, 0, false);
    this.toUpdate();
  }

  toUpdate() {}
}
