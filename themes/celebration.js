// I modified a previous p5.js sketch I made: https://editor.p5js.org/gallr091/sketches/VQau5mAQb

const confetti = [];
const colors = [
  [193, 202, 214], 
  [212, 173, 207],
  [242, 106, 141], 
  [244, 156, 187], 
  [203, 238, 243], 
  [208, 244, 244],
  [238, 213, 255],
  [255, 192, 215],
  [255, 249, 193]
];
let xrect;
let yrect;

// putting random in setup gets rid of the glitchy animation without using noLoop
// using noLoop prevents the design from responding to changes in parameters
function setupConfetti() {
  for (let i = 0; i < 50; i++) {
    confetti.push({
      x: random(width),
      y: random(height),
      radius: random(6, 12),
      angle: random(TWO_PI),
      color: color(...random(colors)),
      form: floor(random(3)), // 0 = blob, 1 = ellipse, 2 = rectangle
	  xrect: random(0.6, 1.2),
	  yrect: random(0.4, 1),
    });
  }
}

function drawConfetti(conf) {
  fill(conf.color);
  noStroke();
  push();
  translate(conf.x, conf.y);
  rotate(conf.angle);

  if (conf.form === 0) {
    drawBlob(conf.radius * 2);
  } else if (conf.form === 1) {
    ellipse(0, 0, conf.radius * 1.2, conf.radius);
  } else {
    rectMode(CENTER);
    scale(xrect, yrect);
    rect(0, 0, conf.radius * 1.2, conf.radius * 0.5);
  }

  pop();
}

function drawBlob(size) {
  let dip = 0.34 * size;
  let drop = 0.06 * size;

  beginShape();
  vertex(0, 0);
  bezierVertex(dip, drop, size - dip, drop, size, 0);
  bezierVertex(size - drop, dip, size - drop, size - dip, size, size);
  bezierVertex(size - dip, size - drop, dip, size - drop, 0, size);
  bezierVertex(drop, size - dip, drop, dip, 0, 0);
  endShape();
}

function drawConfettiBackground() {
  if (confetti.length === 0) {
    setupConfetti(); 
  }
  for (let c of confetti) {
    drawConfetti(c);
  }
}
