let player = {
  x: 50,
  y: 200,
  width: 50,
  height: 50,
  velocityY: 0,
  jumpForce: -10,
  grounded: false
};

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && player.grounded) {
    player.velocityY = player.jumpForce;
    player.grounded = false;
  }
});

function applyGravity() {
  player.velocityY += 0.5; 
  player.y += player.velocityY;

  if (player.y + player.height >= 400) { 
    player.y = 400 - player.height;
    player.velocityY = 0;
    player.grounded = true;
  }
}
let obstacles = [];

function generateObstacle() {
  obstacles.push({
    x: 800,
    y: 350,
    width: 50,
    height: 50
  });
}

setInterval(generateObstacle, 2000); 

function updateObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 5; 
  }
}

applyGravity();
updateObstacles();

