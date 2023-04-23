import { c, player } from "../app.js";
import { calculateDirection, calculateDistance, getAngleBetweenPoints } from "../functions.js";
import { gameData, keys, variables } from "../gameData.js";
import { Character } from "./Character.js";

export class Enemy extends Character {
  constructor(x, y, radius, spriteSheetData, weaponData, group) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.spriteSheetData = spriteSheetData;
    this.weaponData = weaponData;
    this.group = group;

    this.weapon.rotationPoint.x = this.weaponData.sprite.w / 2;
    this.weapon.rotationPoint.y = this.weaponData.sprite.h;

    this.movementSpeed = 0.2;
    // this.direction = { x: 0, y: 0 };
    this.agroRadius = 50;
    this.lostAgroRadius = 100;

    this.task = {
      current: variables.tasks.idle,
    };
  }

  toUpdate(deltaTime) {
    // this.text = `${this.animAttack.isAttacking}`;

    this.taskManager(deltaTime);
    this.animManager();

    // this.draw();
  }

  animManager() {
    if (this.task.current === variables.tasks.chase) {
      if (this.anim.state !== "run") this.anim.state = "run";
    } else if (this.task.current === variables.tasks.idle) {
      if (this.anim.state !== "idle") this.anim.state = "idle";
    } else if (this.task.current === variables.tasks.attack) {
      if (this.anim.state !== "idle") this.anim.state = "idle";
    }
  }

  taskManager(deltaTime) {
    const dist = calculateDistance(this.x, this.y, this.radius, player.x, player.y, player.radius);

    if (dist <= 0) {
      this.task.current = variables.tasks.attack;
    } else if (dist > 0 && dist < this.agroRadius) {
      this.task.current = variables.tasks.chase;
    } else if (dist > this.agroRadius && dist < this.lostAgroRadius) {
      if (this.task.current === variables.tasks.chase) {
        this.task.current = variables.tasks.chase;
      } else if (this.task.current === variables.tasks.idle) {
        this.task.current = variables.tasks.idle;
      }
    } else if (dist > this.lostAgroRadius) {
      this.task.current = variables.tasks.idle;
    }

    this.chase();
    this.attackSetup(deltaTime);
  }

  attackSetup(deltaTime) {
    if (this.task.current === variables.tasks.attack) {
      // console.log(this.animAttack.isAttacking);

      this.animAttack.isAttacking = true;

      if (this.animAttack.currentDuration === 0) {
        // set new angle on new attack
        // once per attack
        const angle = getAngleBetweenPoints(
          this.x + gameData.camera.x,
          this.y + gameData.camera.y,
          player.x + gameData.camera.x,
          player.y + gameData.camera.y
        );
        this.weapon.rotationAngle = angle;
        // console.log("once per attack");
      }

      if (
        this.animAttack.isAttacking &&
        this.animAttack.currentDuration < this.animAttack.duration
      ) {
        this.animAttack.currentDuration += deltaTime;

        if (this.animAttack.currentDuration > this.animAttack.duration) {
          this.animAttack.currentDuration = 0;
          // this.animAttack.isAttacking = false;
          // console.log("isAttacking false");
        }

        this.attack();
        // console.log("attack");
      }
    } else {
      this.animAttack.isAttacking = false;
    }
  }

  chase() {
    if (this.task.current === variables.tasks.chase) {
      const dir = calculateDirection(this.x, this.y, player.x, player.y);
      this.x += dir.x * this.movementSpeed;
      this.y += dir.y * this.movementSpeed;

      if (dir.x < 0) {
        if (this.anim.xAxisFlip === false) this.anim.xAxisFlip = true;
      } else if (dir.x > 0) {
        if (this.anim.xAxisFlip === true) this.anim.xAxisFlip = false;
      }
    }
  }

  draw() {
    c.beginPath();
    c.arc(this.x + gameData.camera.x, this.y + gameData.camera.y, this.agroRadius, 0, Math.PI * 2);
    c.stroke();
    c.beginPath();
    c.arc(
      this.x + gameData.camera.x,
      this.y + gameData.camera.y,
      this.lostAgroRadius,
      0,
      Math.PI * 2
    );
    c.stroke();
  }
}
