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
    drawSprite(
      this.spriteSheetData,
      this.x,
      this.y,
      this.spriteSheetData.w / 2,
      this.spriteSheetData.h / 2,
      this.angle,
      this.isFlipX
    );
    this.toUpdate();
  }

  toUpdate() {}
}
