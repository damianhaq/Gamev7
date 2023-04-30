import { c, spriteSheet } from "../app.js";
import { gameData, keys, spriteSheetData } from "../gameData.js";

export class Gui {
  constructor() {
    this.childs = [];
  }

  update() {}

  addChilds(instancesArr) {
    this.childs = instancesArr;
  }
}

export class Window extends Gui {
  constructor(x, y, cellsW, cellsH) {
    super();
    this.x = x;
    this.y = y;
    this.cellsW = cellsW;
    this.cellsH = cellsH;

    this.drag = false;
  }

  update() {
    for (let i = 0; i < this.cellsW; i++) {
      for (let j = 0; j < this.cellsH; j++) {
        let cell = spriteSheetData.gui.blueWindow.field;

        // draw edges
        if (i === 0) cell = spriteSheetData.gui.blueWindow.edges.top;
        if (i === this.cellsW - 1) cell = spriteSheetData.gui.blueWindow.edges.bottom;
        if (j === this.cellsH - 1) cell = spriteSheetData.gui.blueWindow.edges.right;
        if (j === 0) cell = spriteSheetData.gui.blueWindow.edges.left;

        // draw corners
        if (i === 0 && j === 0) cell = spriteSheetData.gui.blueWindow.corners.leftTop;
        if (i === 0 && j === this.cellsH - 1)
          cell = spriteSheetData.gui.blueWindow.corners.topRight;
        if (i === this.cellsW - 1 && j === 0)
          cell = spriteSheetData.gui.blueWindow.corners.leftBottom;
        if (i === this.cellsW - 1 && j === this.cellsH - 1)
          cell = spriteSheetData.gui.blueWindow.corners.rightBottom;

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
        el.update(this.x, this.y);
      });
    }

    this.changePosition();
  }

  changePosition() {
    const mouseOffset = { x: 8, y: 8 };
    // let drag = false;
    if (
      keys.mouse.x > this.x &&
      keys.mouse.x < this.x + 16 &&
      keys.mouse.y > this.y &&
      keys.mouse.y < this.y + 16 &&
      keys.mouse.click
    ) {
      this.drag = true;
      // mouseOffset.x = keys.mouse.x - this.x;
      // mouseOffset.y = keys.mouse.y - this.y;
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
    this.cellsW = cellsW;
    this.executeFunc = executeFunc;

    this.state = "idle"; // hover | pressed | idle
    this.isPressed = false;
  }

  update(refX, refY) {
    this.checkMouseState(refX, refY);

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
        this.x + 0 * i + i * 16 + refX,
        this.y + refY,
        16,
        16
      );
    }

    // update child's
    if (this.childs.length > 0) {
      this.childs.forEach((el) => {
        el.update(this.x + refX, this.y + refY);
      });
    }
  }

  checkMouseState(refX, refY) {
    if (
      keys.mouse.x > this.x + refX &&
      keys.mouse.x < this.x + refX + this.cellsW * 16 &&
      keys.mouse.y > this.y + refY &&
      keys.mouse.y < this.y + refY + 16
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

  update(refX, refY) {
    c.save();
    c.fillStyle = this.font.color;
    c.font = `${this.font.size}px MinimalPixelv2`;
    c.fillText(this.text, this.x + refX, this.y + refY);
    c.restore();
  }
}
