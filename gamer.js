let gamerShapes = [];
let gamerColors = ["#EC26A7", "#02C9DF", "#EDEDED"];
let shapeSize = 120;

function setupGamerShapes() {
  for (let i = 0; i < 5; i++) {
    gamerShapes.push({
      x: random(width),
      y: random(height),
      type: random(['triangle', 'square', 'circle', 'x']),
      color: random(gamerColors)
    });
  }
}

function drawGamerTheme() {
  if (gamerShapes.length === 0) {
    setupGamerShapes();
  }

  for (let s of gamerShapes) {
    drawGamerShape(s.x, s.y, shapeSize, s.type, s.color);
  }
}

function drawGamerShape(x, y, size, type, col) {
  push();
  translate(x, y);

  if (type === 'x') {
    stroke(col);
    strokeWeight(size / 10);
    line(-size / 2, -size / 2, size / 2, size / 2);
    line(-size / 2, size / 2, size / 2, -size / 2);
    noStroke();
  } else {

	noFill();
	stroke(col);
	strokeWeight(10);
    switch (type) {
      case 'triangle':
        triangle(-size / 2, size / 2, 0, -size / 2, size / 2, size / 2);
        break;
      case 'square':
        rectMode(CENTER);
        rect(0, 0, size, size);
        break;
      case 'circle':
        ellipse(0, 0, size);
        break;
    }
  }

  pop();
}
