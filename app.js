import { Enemy } from "./classes/Enemy.js";
import { Item } from "./classes/Item.js";
import { Player } from "./classes/Player.js";
import { camera, controls, debug } from "./functions.js";
import { gameData, spriteSheetData, weapons } from "./gameData.js";

const canvas = document.querySelector("#canvas");
canvas.width = 1000;
canvas.height = 800;
export const debugP = document.querySelector("#debug");
export const c = canvas.getContext("2d");
c.scale(gameData.scale, gameData.scale);
c.imageSmoothingEnabled = false;

// ---- PRELOAD ----
controls();

export const spriteSheet = new Image();
spriteSheet.src = "./assets/BigSpritev7.png";
spriteSheet.onload = () => {
  requestAnimationFrame(animate);
};

const player = new Player(
  canvas.width / 2 / gameData.scale,
  canvas.height / 2 / gameData.scale,
  20,
  spriteSheetData.purpleKnight,
  weapons.silverSword
);
const enemy = new Enemy(0, 0, 30, spriteSheetData.skeleton);
const items = [];
items.push(new Item(50, 50, spriteSheetData.items.weapons.silverSword, false, 0, "0"));

// ---- GAME LOOP ----
let lastTime = 0;
let deltaTime = 0;
let counter = 0;

function animate(currentTime) {
  counter++;
  deltaTime = currentTime - lastTime;
  lastTime = currentTime;
  // const fps = Math.round(1000 / deltaTime);

  c.fillStyle = "#2e2e35";
  c.fillRect(0, 0, canvas.clientWidth, canvas.height);
  c.drawImage(spriteSheet, 0 + gameData.camera.x, 0 + gameData.camera.y);

  enemy.update(deltaTime);
  player.update(deltaTime);
  player.moving(deltaTime);
  items.forEach((item) => item.update());

  camera(player.x, player.y);
  if (counter % 100 === 0) {
    debug(
      `deltaTime:${deltaTime}   Player: x:${player.x} y:${player.y}  Camera: x:${gameData.camera.x} y:${gameData.camera.y}`
    );
  }

  requestAnimationFrame(animate);
}
