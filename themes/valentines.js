const balloons = [];

function generateBalloons() {
  balloons.length = 0;
  for (let i = 0; i < 15; i++) {
    balloons.push({
      x: random(width),
      y: random(height),
      scale: random(0.5, 1.2)
    });
  }
}

function drawScene() {
  if (balloons.length === 0) return;

  for (const b of balloons) {
    drawHeartBalloon(b);
  }
}

function drawHeartBalloon(b) {
  const s = b.scale;

  // string
  push();
  noFill();
  stroke(255);
  const stringStartY = b.y + 40 * s;
  bezier(
    b.x, stringStartY,
    b.x + 10 * s, stringStartY + 40 * s,
    b.x - 10 * s, stringStartY + 80 * s,
    b.x, stringStartY + 120 * s
  );
  pop();

  // heart
  push();
  translate(b.x, b.y);
  scale(s);
  noStroke();
  fill(255, 255, 255, 220); // 80%


  beginShape();
  const r = 2.5;
  for (let a = 0; a < TWO_PI; a += 0.1) {
    const x = r * 16 * pow(sin(a), 3);
    const y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}
