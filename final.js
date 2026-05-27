const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pieces = [];

for (let i = 0; i < 120; i++) {
  pieces.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 120
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${p.d * 3}, 100%, 50%)`;
    ctx.fill();
  });

  update();
}

function update() {
  pieces.forEach(p => {
    p.y += 2;

    if (p.y > canvas.height) {
      p.y = -10;
    }
  });
}

setInterval(draw, 20);
