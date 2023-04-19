import { c, spriteSheet } from "../app.js";
import { gameData } from "../gameData.js";

export class Character {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 0;

    this.anim = {
      state: "idle",
      spriteSheetData: null,
      currentFrame: 0,
      frameDelayMS: 100,
      currentFrameDelayMS: 0,
    };
  }

  update(deltaTime) {
    // let fixedPosX =
    //   this.x +
    //   dimensions.map.x -
    //   this.spriteSheetData[this.animData.animState].w -
    //   this.animData.addX;

    // if (this.animData.xFlip) {
    //   c.scale(-1, 1); // Odbija rysunek wzdłuż osi Y
    //   fixedPosX = -(
    //     this.x +
    //     dimensions.map.x +
    //     this.spriteSheetData[this.animData.animState].w +
    //     this.animData.addX
    //   );
    // }

    c.drawImage(
      spriteSheet,
      this.anim.spriteSheetData[this.anim.state].x +
        this.anim.currentFrame * this.anim.spriteSheetData[this.anim.state].w,
      this.anim.spriteSheetData[this.anim.state].y,
      this.anim.spriteSheetData[this.anim.state].w,
      this.anim.spriteSheetData[this.anim.state].h,
      this.x - this.anim.spriteSheetData[this.anim.state].w / 2 + gameData.camera.x,
      this.y - this.anim.spriteSheetData[this.anim.state].h / 2 + gameData.camera.y,
      this.anim.spriteSheetData[this.anim.state].w,
      this.anim.spriteSheetData[this.anim.state].h
    );

    // frame counter
    this.anim.currentFrameDelayMS += deltaTime;
    if (this.anim.currentFrameDelayMS > this.anim.frameDelayMS) {
      // console.log(this.anim.currentFrame);
      this.anim.currentFrameDelayMS = 0;
      if (this.anim.currentFrame >= this.anim.spriteSheetData[this.anim.state].frames - 1) {
        this.anim.currentFrame = 0;
      } else {
        this.anim.currentFrame++;
      }
    }

    c.beginPath();
    c.arc(this.x + gameData.camera.x, this.y + gameData.camera.y, this.radius, 0, 2 * Math.PI);
    c.stroke();
  }
}
