import { debugP } from "./app.js";
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
    keys.mouse.x = ev.offsetX;
    keys.mouse.y = ev.offsetY;
  });

  document.addEventListener("mouseup", (ev) => {
    keys.mouse.click = false;
  });

  document.addEventListener("mousemove", (ev) => {
    keys.mouse.x = ev.offsetX;
    keys.mouse.y = ev.offsetY;
  });
}
