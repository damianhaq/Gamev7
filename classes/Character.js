import { c, spriteSheet } from "../app.js";
import { drawSprite } from "../functions.js";
import { gameData } from "../gameData.js";

export class Character {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    this.spriteSheetData = null;
    this.movementSpeed = 1;

    this.anim = {
      state: "idle",
      currentFrame: 0,
      frameDelayMS: 100,
      currentFrameDelayMS: 0,
      xAxisFlip: true,
    };

    this.weaponData = false;
    this.weapon = {
      xAxisFlip: true,
      rotationPoint: {
        x: 0,
        y: 0,
      },
      rotationAngle: 4,
    };
  }

  update(deltaTime) {
    if (this.weaponData) this.drawWeapon();

    this.drawMe(deltaTime);
  }

  drawWeapon() {
    drawSprite(
      this.weaponData.sprite,
      this.x,
      this.y,
      this.weaponData.sprite.w / 2,
      this.weaponData.sprite.h,
      45,
      false
    );
  }

  drawMe(deltaTime) {
    c.save();
    let fixedPosX = this.x - this.spriteSheetData[this.anim.state].w / 2 + gameData.camera.x;

    if (this.anim.xAxisFlip) {
      c.scale(-1, 1); // Odbija rysunek wzdłuż osi Y
      fixedPosX = -(this.x + gameData.camera.x + this.spriteSheetData[this.anim.state].w / 2);
    }

    c.drawImage(
      spriteSheet,
      this.spriteSheetData[this.anim.state].x +
        this.anim.currentFrame * this.spriteSheetData[this.anim.state].w,
      this.spriteSheetData[this.anim.state].y,
      this.spriteSheetData[this.anim.state].w,
      this.spriteSheetData[this.anim.state].h,
      fixedPosX,
      this.y - this.spriteSheetData[this.anim.state].h / 2 + gameData.camera.y,
      this.spriteSheetData[this.anim.state].w,
      this.spriteSheetData[this.anim.state].h
    );

    // frame counter
    this.anim.currentFrameDelayMS += deltaTime;
    if (this.anim.currentFrameDelayMS > this.anim.frameDelayMS) {
      // console.log(this.anim.currentFrame);
      this.anim.currentFrameDelayMS = 0;
      if (this.anim.currentFrame >= this.spriteSheetData[this.anim.state].frames - 1) {
        this.anim.currentFrame = 0;
      } else {
        this.anim.currentFrame++;
      }
    }
    c.restore();

    c.beginPath();
    c.arc(this.x + gameData.camera.x, this.y + gameData.camera.y, this.radius, 0, 2 * Math.PI);
    c.stroke();
  }

  // holdWeapon() {}
}
