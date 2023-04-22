import { c, debugP, spriteSheet } from "./app.js";
import { gameData, keys } from "./gameData.js";

export function camera(x, y) {
  const center = { x: canvas.width / 2 / gameData.scale, y: canvas.height / 2 / gameData.scale };
  gameData.camera.x = center.x + -x;
  gameData.camera.y = center.y + -y;
}

export function debug(string) {
  if (debugP.innerHTML !== string) debugP.innerHTML = string;
}

export function controls() {
  document.body.addEventListener("keydown", (ev) => {
    if (ev.code === "KeyW") keys.w = true;
    if (ev.code === "KeyS") keys.s = true;
    if (ev.code === "KeyA") keys.a = true;
    if (ev.code === "KeyD") keys.d = true;
    if (ev.code === "Space") keys.space = true;
    if (ev.code === "Escape") keys.escape = true;

    // console.log(keys);
  });

  document.body.addEventListener("keyup", (ev) => {
    if (ev.code === "KeyW") keys.w = false;
    if (ev.code === "KeyS") keys.s = false;
    if (ev.code === "KeyA") keys.a = false;
    if (ev.code === "KeyD") keys.d = false;
    if (ev.code === "Space") keys.space = false;
    if (ev.code === "Escape") keys.escape = false;

    // console.log(ev.code);
  });

  document.addEventListener("mousedown", (ev) => {
    keys.mouse.click = true;
    keys.mouse.x = ev.offsetX / gameData.scale;
    keys.mouse.y = ev.offsetY / gameData.scale;
  });

  document.addEventListener("mouseup", (ev) => {
    keys.mouse.click = false;
  });

  document.addEventListener("mousemove", (ev) => {
    keys.mouse.x = ev.offsetX / gameData.scale;
    keys.mouse.y = ev.offsetY / gameData.scale;
  });
}

export function drawSprite(spriteSheetData, x, y, originX, originY, angleDeg, isXAxisFlip) {
  // const posx = 15;
  // const posy = 2; /*+ this.anim.currentFrame */

  // const originX = this.weaponData.sprite.w / 2;
  // const originY = this.weaponData.sprite.h / 2;

  // this.weapon.rotationAngle += 1;
  c.save();

  // let fixedPosX = this.x - this.weaponData.sprite.w / 2 + gameData.camera.x;

  if (isXAxisFlip) {
    c.scale(-1, 1); // Odbija rysunek wzdłuż osi Y
    // fixedPosX = -(this.x + this.weaponData.sprite.w / 2 + gameData.camera.x);
    c.translate(-(x + gameData.camera.x), y + gameData.camera.y);
    c.rotate(-((angleDeg * Math.PI) / 180));
  } else {
    c.translate(x + gameData.camera.x, y + gameData.camera.y);
    c.rotate((angleDeg * Math.PI) / 180);
  }

  c.drawImage(
    spriteSheet,
    spriteSheetData.x,
    spriteSheetData.y,
    spriteSheetData.w,
    spriteSheetData.h,
    -originX,
    -originY,
    spriteSheetData.w,
    spriteSheetData.h
  );

  if (gameData.showHitBox) {
    c.beginPath();
    c.rect(-originX, -originY, spriteSheetData.w, spriteSheetData.h);
    c.stroke();
  }
  c.restore();
}

export function calculateDirection(fromX, fromY, toX, toY) {
  const dx = toX - fromX;
  const dy = toY - fromY;

  const length = Math.sqrt(dx * dx + dy * dy);
  const directionX = dx / length;
  const directionY = dy / length;

  return { x: directionX, y: directionY };
}

export function getAngleBetweenPoints(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}
