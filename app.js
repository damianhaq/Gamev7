const canvas = document.querySelector("#canvas");
canvas.width = 1000;
canvas.height = 800;
const c = canvas.getContext("2d");
c.imageSmoothingEnabled = false;
c.scale(4, 4);

const spriteSheet = new Image();
spriteSheet.src = "./assets/Sprite-0001.png";

spriteSheet.onload = () => {
  requestAnimationFrame(animate);
};

function animate() {
  c.fillStyle = "#2e2e35";
  c.fillRect(0, 0, canvas.clientWidth, canvas.height);
  c.drawImage(spriteSheet, 100, 100);

  requestAnimationFrame(animate);
}
