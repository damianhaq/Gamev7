import { c, spriteSheet } from "../app.js";
import { calculateDirection, drawSprite } from "../functions.js";
import { gameData, keys } from "../gameData.js";

export class Character {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    this.spriteSheetData = null;
    this.movementSpeed = 1;

    this.group = null;
    this.text = null;

    this.anim = {
      state: "idle",
      currentFrame: 0,
      frameDelayMS: 100,
      currentFrameDelayMS: 0,
      xAxisFlip: true,
    };

    this.animAttack = {
      isSwingLeft: false,
      isAttacking: false,
      duration: 500,
      currentDuration: 0,
    };

    this.weaponData = false;
    this.weapon = {
      xAxisFlip: true,
      rotationAngle: 4,
      angleChangeSpeed: 2.5, // its attack speed
      rotationPoint: {
        x: false,
        y: false,
      },
      position: {
        x: this.x,
        y: this.y,
      },
    };
  }

  update(deltaTime) {
    if (this.weaponData) this.drawWeapon();

    this.drawMe(deltaTime);
    this.toUpdate(deltaTime);
    if (this.text) this.drawText();
  }

  toUpdate(deltaTime) {}

  drawText() {
    c.save();
    c.fillStyle = "white";
    // c.font = "16px sans";
    c.fillText(this.text, this.x + gameData.camera.x, this.y + gameData.camera.y);
    c.restore();
  }

  drawWeapon() {
    // attack
    if (this.animAttack.isAttacking) {
      this.weapon.rotationPoint.x = 0;
      this.weapon.rotationPoint.y = this.weaponData.sprite.h + 10;
      this.weapon.position = { x: this.x, y: this.y };
    }

    if (this.anim.state === "idle") {
      if (!this.animAttack.isAttacking) {
        // if not attack
        if (this.weaponData.rotate180WhileHolding) {
          this.weapon.rotationAngle = 10;
          this.weapon.rotationPoint.x = this.weaponData.sprite.w / 2;
          this.weapon.rotationPoint.y = 0;
        } else {
          this.weapon.rotationAngle = 190;
          this.weapon.rotationPoint.x = this.weaponData.sprite.w / 2;
          this.weapon.rotationPoint.y = this.weaponData.sprite.h;
        }

        this.weapon.position = {
          x: this.x + this.weaponData.sprite.w / 2,
          y: this.y - this.weaponData.sprite.h / 2,
        };
      }
    } else if (this.anim.state === "run") {
      if (!this.animAttack.isAttacking) {
        // if not attack
        this.weapon.rotationPoint.x = this.weaponData.sprite.w / 2;
        this.weapon.rotationPoint.y = this.weaponData.sprite.h;
        if (this.anim.xAxisFlip) {
          // if facing left
          this.weapon.rotationAngle = 100;
          this.weapon.position = { x: this.x + 3, y: this.y + 3 };
        } else {
          // if facing right
          this.weapon.rotationAngle = 260;
          this.weapon.position = { x: this.x - 3, y: this.y + 3 };
        }
      }
    }

    // Finally draw weapon
    drawSprite(
      this.weaponData.sprite,
      this.weapon.position.x,
      this.weapon.position.y,
      this.weapon.rotationPoint.x,
      this.weapon.rotationPoint.y,
      this.weapon.rotationAngle,
      false
    );
  }

  attack() {
    this.weapon.rotationAngle += this.weapon.angleChangeSpeed;
    // console.log("attack in character");

    // c.beginPath();
    // c.arc(keys.mouse.x, keys.mouse.y, 5, 0, Math.PI * 2);
    // c.stroke();
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

    if (gameData.showHitBox) {
      c.beginPath();
      c.arc(this.x + gameData.camera.x, this.y + gameData.camera.y, this.radius, 0, 2 * Math.PI);
      c.stroke();
    }
  }
}
