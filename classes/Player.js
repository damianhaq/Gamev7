import { calculateDirection, getAngleBetweenPoints } from "../functions.js";
import { gameData, keys } from "../gameData.js";
import { Character } from "./Character.js";

export class Player extends Character {
  constructor(x, y, spriteSheetData, weaponData, group) {
    super();
    this.x = x;
    this.y = y;
    // this.radius = radius;
    this.spriteSheetData = spriteSheetData;
    this.weaponData = weaponData;
    this.group = group;

    this.weapon.rotationPoint.x = this.weaponData.sprite.w / 2;
    this.weapon.rotationPoint.y = this.weaponData.sprite.h;
  }

  toUpdate(deltaTime) {
    this.moving(deltaTime);

    if (keys.mouse.click && this.animAttack.currentDuration === 0) {
      // once per attack
      this.animAttack.isAttacking = true;

      const angle = getAngleBetweenPoints(
        this.x + gameData.camera.x,
        this.y + gameData.camera.y,
        keys.mouse.x,
        keys.mouse.y
      );
      this.weapon.rotationAngle = angle;
    }

    if (this.animAttack.isAttacking && this.animAttack.currentDuration < this.animAttack.duration) {
      this.animAttack.currentDuration += deltaTime;

      if (this.animAttack.currentDuration > this.animAttack.duration) {
        /* this if (!keys.mouse.click) is for not showing "not attacking weapon" in one frame.
        Because now when i still holding LMB, isAttacking is always true, its not false for 1 frame */
        if (!keys.mouse.click) this.animAttack.isAttacking = false;
        this.animAttack.currentDuration = 0;
        // console.log("attack");
      }

      this.attack();
    }
  }

  moving() {
    const diagonalSpeed = this.movementSpeed / Math.sqrt(2); // prędkość na ukos

    if (keys.a || keys.d || keys.w || keys.s) {
      if (this.anim.state !== "run") this.anim.state = "run";
    } else {
      if (this.anim.state !== "idle") this.anim.state = "idle";
    }

    if (keys.d) {
      if (this.anim.xAxisFlip === true) this.anim.xAxisFlip = false;
    } else if (keys.a) {
      if (this.anim.xAxisFlip === false) this.anim.xAxisFlip = true;
    }

    if (keys.a && keys.w) {
      const canMove = this.canMoveCheck({ x: -diagonalSpeed, y: -diagonalSpeed });
      if (canMove.x) this.x -= diagonalSpeed;
      if (canMove.y) this.y -= diagonalSpeed;
    } else if (keys.a && keys.s) {
      const canMove = this.canMoveCheck({ x: -diagonalSpeed, y: diagonalSpeed });
      if (canMove.x) this.x -= diagonalSpeed;
      if (canMove.y) this.y += diagonalSpeed;
    } else if (keys.d && keys.w) {
      const canMove = this.canMoveCheck({ x: diagonalSpeed, y: -diagonalSpeed });
      if (canMove.x) this.x += diagonalSpeed;
      if (canMove.y) this.y -= diagonalSpeed;
    } else if (keys.d && keys.s) {
      const canMove = this.canMoveCheck({ x: diagonalSpeed, y: diagonalSpeed });
      if (canMove.x) this.x += diagonalSpeed;
      if (canMove.y) this.y += diagonalSpeed;
    } else if (keys.a) {
      const canMove = this.canMoveCheck({ x: -this.movementSpeed, y: 0 });
      if (canMove.x) this.x -= this.movementSpeed;
    } else if (keys.d) {
      const canMove = this.canMoveCheck({ x: this.movementSpeed, y: 0 });
      if (canMove.x) this.x += this.movementSpeed;
    } else if (keys.w) {
      const canMove = this.canMoveCheck({ x: 0, y: -this.movementSpeed });
      if (canMove.y) this.y -= this.movementSpeed;
    } else if (keys.s) {
      const canMove = this.canMoveCheck({ x: 0, y: this.movementSpeed });
      if (canMove.y) this.y += this.movementSpeed;
    }
  }
}
