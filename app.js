import { Enemy, Player } from "./Character.js";
import { gameData, keys, spriteSheetData } from "./gameData.js";

const canvas = document.querySelector("#canvas");
export const debugP = document.querySelector("#debug");
canvas.width = 1000;
canvas.height = 800;

export const c = canvas.getContext("2d");

c.imageSmoothingEnabled = false;
c.scale(gameData.scale, gameData.scale);

export const spriteSheet = new Image();
spriteSheet.src = "./assets/BigSpritev7.png";

const player = new Player(
  canvas.width / 2 / gameData.scale,
  canvas.height / 2 / gameData.scale,
  20,
  spriteSheetData.purpleKnight
);
const enemy = new Enemy(0, 0, 30, spriteSheetData.skeleton);

controls();
spriteSheet.onload = () => {
  requestAnimationFrame(animate);
};

function animate() {
  c.fillStyle = "#2e2e35";
  c.fillRect(0, 0, canvas.clientWidth, canvas.height);
  c.drawImage(spriteSheet, 0 + gameData.camera.x, 0 + gameData.camera.y);

  enemy.update();
  player.update();
  player.moving();

  camera(player.x, player.y);

  debug(
    `Player: x:${player.x} y:${player.y}  Camera: x:${gameData.camera.x} y:${gameData.camera.y}`
  );

  requestAnimationFrame(animate);
}

function debug(string) {
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

function camera(x, y) {
  const center = { x: canvas.width / 2 / gameData.scale, y: canvas.height / 2 / gameData.scale };
  gameData.camera.x = center.x + -x;
  gameData.camera.y = center.y + -y;
}
