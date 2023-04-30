import { c, debugP, guis, spriteSheet } from "./app.js";
import { gameData, keys, map } from "./gameData.js";

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
    if (ev.detail > 1) {
      ev.preventDefault();
      // of course, you still do not know what you prevent here...
      // You could also check event.ctrlKey/event.shiftKey/event.altKey
      // to not prevent something useful.
    }
  });

  document.addEventListener("mouseup", (ev) => {
    keys.mouse.click = false;
  });

  document.addEventListener("mousemove", (ev) => {
    keys.mouse.x = ev.offsetX / gameData.scale;
    keys.mouse.y = ev.offsetY / gameData.scale;

    mouseIsOnGuiCheck(ev.offsetX / gameData.scale, ev.offsetY / gameData.scale);
  });
}

function mouseIsOnGuiCheck(mouseX, mouseY) {
  guis.forEach((el) => {
    if (
      mouseX > el.x &&
      mouseX < el.x + el.cellsW * 16 &&
      mouseY > el.y &&
      mouseY < el.y + el.cellsH * 16
    ) {
      if (keys.mouse.onGUI === false) keys.mouse.onGUI = true;
    } else {
      if (keys.mouse.onGUI === true) keys.mouse.onGUI = false;
    }
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

export function calculateDistance(fromX, fromY, fromRadius, toX, toY, toRadius) {
  let distance = Math.sqrt((fromX - toX) ** 2 + (fromY - toY) ** 2);
  distance = distance - fromRadius - toRadius;
  return distance;
}

export function getAngleBetweenPoints(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

export function findNearestEnemy(player) {
  let nearestEnemy = null;
  let nearestDistance = Number.MAX_VALUE;

  for (const enemy of instances.enemiesCh) {
    let distance;
    if (player) {
      distance = Math.sqrt((enemy.x - player.x) ** 2 + (enemy.y - player.y) ** 2);
    }

    if (distance < nearestDistance) {
      nearestEnemy = enemy;
      nearestDistance = distance;
    }
  }
  return nearestEnemy;
}

export function drawMap() {
  map.data.layers.forEach((layer) => {
    if (layer.type === "tilelayer") {
      let counter = 0;
      for (let i = 0; i < layer.height; i++) {
        for (let j = 0; j < layer.width; j++) {
          if (layer.data[counter] !== 0) {
            drawOneTile(j * 16, i * 16, layer.data[counter]);

            // c.save();
            // c.fillStyle = "white";
            // c.font = "6px sans";
            // c.fillText(`${counter}`, j * 16 + gameData.camera.x, i * 16 + gameData.camera.y);
            // c.restore();

            // if (map.idTilesWithCollision.includes(layer.data[counter]))
            //   drawRect(j * 16, i * 16, 16, 16);
          }
          counter++;
        }
      }
    }

    if (layer.type === "objectgroup" && gameData.showHitBox) {
      layer.objects.forEach((obj) => {
        c.save();

        c.strokeStyle = "#fff";
        drawRect(obj.x, obj.y, obj.width, obj.height);

        if (obj.point) {
          c.fillStyle = "white";
          // c.font = "16px sans";
          drawText(obj.x, obj.y - 10, obj.name);
          drawRect(obj.x, obj.y, 1, 1);
        }

        c.restore();
      });
    }
  });
}

function drawOneTile(x, y, id) {
  const pos = getTilePosPxFromId(id);

  c.drawImage(
    spriteSheet,
    pos.x,
    pos.y,
    16,
    16,
    x + gameData.camera.x,
    y + gameData.camera.y,
    16,
    16
  );
}

function getTilePosPxFromId(id) {
  id--;
  const row = Math.floor(id / 33); // numer wiersza
  const column = id % 33; // numer kolumny

  return { x: column * 16, y: row * 16 };
}

export function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight - element.clientHeight;
}

export function drawCircle(x, y, radius) {
  c.beginPath();
  c.arc(x + gameData.camera.x, y + gameData.camera.y, radius, 0, Math.PI * 2);
  c.stroke();
}

export function drawRect(x, y, w, h) {
  c.beginPath();
  c.rect(x + gameData.camera.x, y + gameData.camera.y, w, h);
  c.stroke();
}
export function drawText(x, y, text) {
  c.beginPath();

  c.fillText(text, x + gameData.camera.x, y + gameData.camera.y);
  c.stroke();
}

export function calculateEndpoint(startPoint, length, angle) {
  const angleInRadians = (angle * Math.PI) / 180;
  const x = startPoint.x + length * Math.cos(angleInRadians);
  const y = startPoint.y + length * Math.sin(angleInRadians);
  return { x: x, y: y };
}

export function checkCollision2Rect(rect1, rect2) {
  let collision = false;

  if (
    rect1.x + rect1.width > rect2.x && // sprawdzanie czy prostokąty nachodzą na siebie po osi X
    rect1.x < rect2.x + rect2.width &&
    rect1.y + rect1.height > rect2.y && // sprawdzanie czy prostokąty nachodzą na siebie po osi Y
    rect1.y < rect2.y + rect2.height
  ) {
    // Sprawdzanie po której stronie pierwszego prostokąta znajduje się drugi prostokąt
    let dx = rect1.x + rect1.width / 2 - (rect2.x + rect2.width / 2);
    let dy = rect1.y + rect1.height / 2 - (rect2.y + rect2.height / 2);
    let width = (rect1.width + rect2.width) / 2;
    let height = (rect1.height + rect2.height) / 2;
    let crossWidth = width * dy;
    let crossHeight = height * dx;

    if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
      if (crossWidth > crossHeight) {
        collision = crossWidth > -crossHeight ? "bottom" : "left";
      } else {
        collision = crossWidth > -crossHeight ? "right" : "top";
      }
    }
  }
  return collision;
}
