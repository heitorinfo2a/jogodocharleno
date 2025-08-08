const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

const player = { x: 180, y: 550, w: 40, h: 40, speed: 5 };
const obstacles = [];
let score = 0;

function drawPlayer() {
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawObstacles() {
  ctx.fillStyle = "red";
  for (let o of obstacles) {
    ctx.fillRect(o.x, o.y, o.w, o.h);
  }
}

function moveObstacles() {
  for (let o of obstacles) {
    o.y += 4;
    if (o.y > canvas.height) {
      obstacles.splice(obstacles.indexOf(o), 1);
      score++;
      scoreEl.textContent = score;
    }

    // colisão
    if (
      o.x < player.x + player.w &&
      o.x + o.w > player.x &&
      o.y < player.y + player.h &&
      o.y + o.h > player.y
    ) {
      alert("💥 Você perdeu! Pontuação: " + score);
      location.reload();
    }
  }
}

function spawnObstacle() {
  const x = Math.floor(Math.random() * (canvas.width - 40));
  obstacles.push({ x, y: -40, w: 40, h: 40 });
}

let keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function movePlayer() {
  if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
  if (keys["ArrowRight"] && player.x + player.w < canvas.width) player.x += player.speed;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePlayer();
  moveObstacles();
  drawPlayer();
  drawObstacles();
  requestAnimationFrame(gameLoop);
}

setInterval(spawnObstacle, 800);
gameLoop();
