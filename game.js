let gameOver = false;
let score = 0;
const canvas = document.getElementById("gameCanvas");
const restartBtn = document.getElementById("restartBtn");
const ctx = canvas.getContext("2d");

// Load player image
const playerImg = new Image();
playerImg.src = "ball.png";

// Load obstacle image
const obstacleImg = new Image();
obstacleImg.src = "ro.jpg";

let player = {
  x: 50,
  y: 200,
  width: 50,
  height: 50,
  velocityY: 0,
  jumpForce: -12,
  grounded: false
};

let gravity = 0.6;
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

    if (obstacles[i].x + obstacles[i].width === player.x) {
      score++;
    }
  }
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function drawPlayer() {
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

function drawObstacles() {
  obstacles.forEach(ob => {
    ctx.drawImage(obstacleImg, ob.x, ob.y, ob.width, ob.height);
  });
}

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = "#000";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2 - 20);
    restartBtn.style.display = "block";
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  applyGravity();
  updateObstacles();
  checkCollision();
  drawPlayer();
  drawObstacles();
  drawScore();
  requestAnimationFrame(gameLoop);
}

function checkCollision() {
  for (let i = 0; i < obstacles.length; i++) {
    const ob = obstacles[i];
    if (
      player.x < ob.x + ob.width &&
      player.x + player.width > ob.x &&
      player.y < ob.y + ob.height &&
      player.y + player.height > ob.y
    ) {
      gameOver = true;
    }
  }
}

restartBtn.addEventListener("click", () => {
  player.y = 200;
  player.velocityY = 0;
  player.grounded = false;
  obstacles = [];
  score = 0;
  gameOver = false;
  restartBtn.style.display = "none";
  gameLoop();
});

setInterval(generateObstacle, 2000);
gameLoop();
