import { drawSprite } from "../functions.js";

export class Item {
  constructor(x, y, isFlipX, angle, itemData) {
    this.x = x;
    this.y = y;
    // this.spriteSheetData = spriteSheetData;
    this.isFlipX = isFlipX;
    this.angle = angle;
    this.itemData = itemData;
    // console.log(this.itemData.spriteSheetData.w);
  }

  update() {
    if (typeof this.itemData.sprite === "undefined") return;
    drawSprite(
      this.itemData.sprite,
      this.x,
      this.y,
      this.itemData.sprite.w / 2,
      this.itemData.sprite.h / 2,
      this.angle,
      this.isFlipX
    );
    this.toUpdate();
  }

  toUpdate() {}
}
