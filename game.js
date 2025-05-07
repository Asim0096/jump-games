let gameOver = false;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
  x: 50,
  y: 200,
  width: 50,
  height: 50,
  velocityY: 0,
  jumpForce: -10,
  grounded: false
};

let gravity = 0.5;
let obstacles = [];

function applyGravity() {
  player.velocityY += gravity;
  player.y += player.velocityY;

  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.velocityY = 0;
    player.grounded = true;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && player.grounded) {
    player.velocityY = player.jumpForce;
    player.grounded = false;
  }
});

function generateObstacle() {
  obstacles.push({
    x: canvas.width,
    y: canvas.height - 50,
    width: 50,
    height: 50
  });
}

function updateObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 5;
  }
}

function drawPlayer() {
  ctx.fillStyle = "#0077ff";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
  ctx.fillStyle = "#ff4444";
  obstacles.forEach(ob => {
    ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  applyGravity();
  updateObstacles();
  drawPlayer();
  drawObstacles();
  requestAnimationFrame(gameLoop);
}


setInterval(generateObstacle, 2000);
gameLoop();
