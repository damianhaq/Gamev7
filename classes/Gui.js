import { c, spriteSheet } from "../app.js";
import { drawSprite, drawText, getItemPosFromIndexInInventory } from "../functions.js";
import { gameData, keys, spriteSheetData } from "../gameData.js";

export class Gui {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.childs = [];
    this.parent = { x: 0, y: 0, w: 0, h: 0 };
    this.id = null;
  }

  update() {
    this.toUpdate();
    // this.updateChilds();
  }

  toUpdate() {}

  // updateChilds() {
  //   if (this.childs.length > 0) {
  //     this.childs.forEach((el) => {
  //       el.toUpdate({ x: this.x + this.parent.x, y: this.y + this.parent.y, w: this.w, h: this.h });
  //     });
  //   }
  // }

  addChilds(instancesArr) {
    this.childs = instancesArr;
  }
}

export class Window extends Gui {
  constructor(x, y, cellsW, cellsH, spriteSheetData, isMovable) {
    super();
    this.x = x;
    this.y = y;
    this.w = cellsW * 16;
    this.h = cellsH * 16;
    this.cellsW = cellsW;
    this.cellsH = cellsH;
    this.spriteSheetData = spriteSheetData;
    this.isMovable = isMovable;

    this.drag = false;
  }

  toUpdate() {
    for (let i = 0; i < this.cellsH; i++) {
      for (let j = 0; j < this.cellsW; j++) {
        let cell = this.spriteSheetData.field;

        // draw edges
        if (i === 0) cell = this.spriteSheetData.edges.top;
        if (i === this.cellsH - 1) cell = this.spriteSheetData.edges.bottom;
        if (j === this.cellsW - 1) cell = this.spriteSheetData.edges.right;
        if (j === 0) cell = this.spriteSheetData.edges.left;

        // draw corners
        if (i === 0 && j === 0)
          this.isMovable === true
            ? (cell = this.spriteSheetData.corners.leftTopMovable)
            : (cell = this.spriteSheetData.corners.leftTop);
        if (i === 0 && j === this.cellsW - 1) cell = this.spriteSheetData.corners.topRight;
        if (i === this.cellsH - 1 && j === 0) cell = this.spriteSheetData.corners.leftBottom;
        if (i === this.cellsH - 1 && j === this.cellsW - 1)
          cell = this.spriteSheetData.corners.rightBottom;

        c.drawImage(
          spriteSheet,
          cell.x,
          cell.y,
          cell.w,
          cell.h,
          this.x + 0 * j + j * 16,
          this.y + 0 * i + i * 16,
          16,
          16
        );
      }
    }

    // update child's
    if (this.childs.length > 0) {
      this.childs.forEach((el) => {
        el.toUpdate({ x: this.x, y: this.y, w: this.w, h: this.h });
      });
    }

    if (this.isMovable) this.changePosition();
  }

  changePosition() {
    const mouseOffset = { x: 8, y: 8 };
    if (
      keys.mouse.x > this.x &&
      keys.mouse.x < this.x + 16 &&
      keys.mouse.y > this.y &&
      keys.mouse.y < this.y + 16 &&
      keys.mouse.click
    ) {
      this.drag = true;
      drawText(this.x + 10, this.y, `x: ${this.x.toFixed()} y: ${this.y.toFixed()}`);
    }

    if (!keys.mouse.click) this.drag = false;

    if (this.drag) {
      this.x = keys.mouse.x - mouseOffset.x;
      this.y = keys.mouse.y - mouseOffset.y;
    }
  }
}

export class Button extends Gui {
  constructor(x, y, cellsW, executeFunc) {
    super();
    this.x = x;
    this.y = y;
    this.w = cellsW * 16;
    this.h = 16;
    this.cellsW = cellsW;
    this.executeFunc = executeFunc;

    this.state = "idle"; // hover | pressed | idle
    this.isPressed = false;
  }

  toUpdate(parentData) {
    if (this.parent.x !== parentData.x) this.parent.x = parentData.x;
    if (this.parent.y !== parentData.y) this.parent.y = parentData.y;
    if (this.parent.w !== parentData.w) this.parent.w = parentData.w;
    if (this.parent.h !== parentData.h) this.parent.h = parentData.h;

    let x2, y2;
    if (this.x === "center") {
      x2 = this.parent.w / 2 - this.w / 2;
    } else x2 = this.x;
    if (this.y === "center") {
      y2 = this.parent.h / 2 - this.h / 2;
    } else y2 = this.y;

    this.checkMouseState(parentData.x, parentData.y, x2, y2);

    for (let i = 0; i < this.cellsW; i++) {
      let cell = spriteSheetData.gui.button.middle[this.state];

      if (this.cellsW === 1) {
        cell = spriteSheetData.gui.buttonSmall[this.state];
      } else {
        if (i === 0) cell = spriteSheetData.gui.button.leftEdge[this.state];
        if (i === this.cellsW - 1) cell = spriteSheetData.gui.button.rightEdge[this.state];
      }

      c.drawImage(
        spriteSheet,
        cell.x,
        cell.y,
        cell.w,
        cell.h,
        x2 + 0 * i + i * 16 + parentData.x,
        y2 + parentData.y,
        16,
        16
      );
    }

    // update child's
    if (this.childs.length > 0) {
      this.childs.forEach((el) => {
        let px = 0; // If button is pressed then everything inside need to be 1 pixel down
        this.state === "pressed" ? (px = 1) : 0;
        el.toUpdate({ x: x2 + this.parent.x, y: y2 + this.parent.y + px, w: this.w, h: this.h });
      });
    }
  }

  checkMouseState(refX, refY, x2, y2) {
    if (
      keys.mouse.x > x2 + refX &&
      keys.mouse.x < x2 + refX + this.cellsW * 16 &&
      keys.mouse.y > y2 + refY &&
      keys.mouse.y < y2 + refY + 16
    ) {
      if (keys.mouse.click) {
        if (this.state !== "pressed") this.state = "pressed";
        if (this.isPressed !== true) this.isPressed = true;
      } else {
        if (this.state !== "hover") this.state = "hover";

        if (this.isPressed) {
          this.execute();
          if (this.isPressed !== false) this.isPressed = false;
        }
      }
    } else {
      if (this.state !== "idle") this.state = "idle";
      if (this.isPressed !== false) this.isPressed = false;
    }
  }

  execute() {
    this.executeFunc();
  }
}

export class Text extends Gui {
  constructor(x, y, text) {
    super();
    this.x = x;
    this.y = y;

    this.text = text;

    this.outline = true;
    this.font = {
      color: "#fff",
      size: 7,
    };
  }

  toUpdate(parentData) {
    if (this.parent.x !== parentData.x) this.parent.x = parentData.x;
    if (this.parent.y !== parentData.y) this.parent.y = parentData.y;
    if (this.parent.w !== parentData.w) this.parent.w = parentData.w;
    if (this.parent.h !== parentData.h) this.parent.h = parentData.h;

    c.save();
    c.fillStyle = this.font.color;
    c.font = `${this.font.size}px MinimalPixelv2`;
    c.textAlign = "start"; // Possible values: start, end, left, right or center.

    let x2, y2;
    if (this.x === "center") {
      c.textAlign = "center";
      x2 = this.parent.x + this.parent.w / 2;
      // console.log(x2);
    } else x2 = this.x + this.parent.x;

    if (this.y === "center") {
      c.textAlign = "center";
      y2 = this.parent.y + this.parent.h / 2 + this.font.size / 2;
    } else y2 = this.y + this.parent.y;

    c.fillText(this.text, x2, y2);
    // c.beginPath();
    // c.arc(x2, y2, 5, 0, Math.PI * 2);
    // c.stroke();
    c.restore();
  }
}

export class Icon extends Gui {
  constructor(x, y, spriteSheetData) {
    super();
    this.x = x;
    this.y = y;
    this.w = spriteSheetData.w;
    this.h = spriteSheetData.h;
    this.spriteSheetData = spriteSheetData;
  }

  toUpdate(parentData) {
    if (this.parent.x !== parentData.x) this.parent.x = parentData.x;
    if (this.parent.y !== parentData.y) this.parent.y = parentData.y;
    if (this.parent.w !== parentData.w) this.parent.w = parentData.w;
    if (this.parent.h !== parentData.h) this.parent.h = parentData.h;

    let x2, y2;
    if (this.x === "center") {
      x2 = this.parent.w / 2 - this.w / 2;
    } else x2 = this.x;
    if (this.y === "center") {
      y2 = this.parent.h / 2 - this.h / 2;
    } else y2 = this.y;

    c.drawImage(
      spriteSheet,
      this.spriteSheetData.x,
      this.spriteSheetData.y,
      this.spriteSheetData.w,
      this.spriteSheetData.h,
      x2 + parentData.x,
      y2 + parentData.y,
      this.spriteSheetData.w,
      this.spriteSheetData.h
    );
  }
}

export class Inventory extends Gui {
  constructor(x, y, cellsW, cellsH, spriteSheetData) {
    super();
    this.x = x;
    this.y = y;
    this.w = cellsW * 16;
    this.h = cellsH * 16;
    this.cellsW = cellsW;
    this.cellsH = cellsH;
    this.spriteSheetData = spriteSheetData;
  }

  toUpdate(parentData) {
    if (this.parent.x !== parentData.x) this.parent.x = parentData.x;
    if (this.parent.y !== parentData.y) this.parent.y = parentData.y;
    if (this.parent.w !== parentData.w) this.parent.w = parentData.w;
    if (this.parent.h !== parentData.h) this.parent.h = parentData.h;

    let x2, y2;
    if (this.x === "center") {
      x2 = this.parent.w / 2 - this.w / 2;
    } else x2 = this.x;
    if (this.y === "center") {
      y2 = this.parent.h / 2 - this.h / 2;
    } else y2 = this.y;

    for (let i = 0; i < this.cellsH; i++) {
      for (let j = 0; j < this.cellsW; j++) {
        c.drawImage(
          spriteSheet,
          this.spriteSheetData.x,
          this.spriteSheetData.y,
          this.spriteSheetData.w,
          this.spriteSheetData.h,
          x2 + 0 * j + j * 16 + parentData.x,
          y2 + 0 * i + i * 16 + parentData.y,
          16,
          16
        );
      }
    }

    this.drawItems(x2 + parentData.x, y2 + parentData.y, this.cellsW, this.cellsH);
  }

  drawItems(x2, y2, cellsW, cellsH) {
    gameData.playerInventory.forEach((item, index) => {
      const pos = getItemPosFromIndexInInventory(index, x2, y2, cellsW, cellsH);
      // console.log(x2, y2);

      // drawSprite(item.spriteSheetData, pos.x, pos.y, 0, 0, 0, false);
      c.drawImage(
        spriteSheet,
        item.spriteSheetData.x,
        item.spriteSheetData.y,
        item.spriteSheetData.w,
        item.spriteSheetData.h,
        pos.x + 8 - item.spriteSheetData.w / 2,
        pos.y + 8 - item.spriteSheetData.h / 2,
        item.spriteSheetData.w,
        item.spriteSheetData.h
      );
    });
  }
}
