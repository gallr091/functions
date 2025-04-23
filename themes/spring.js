// I modified a previous p5.js sketch I made: https://editor.p5js.org/gallr091/sketches/rETe8rkv4

const flowerPositions = [];

function generateSpringFlowers() {
  flowerPositions.length = 0;
  const colors = ["#a888e8", "#ff8b00", "#6497bf", "#FF66AA", "#fb3310", "#a64d79", "#FF9966"];

  for (let i = 0; i < 10; i++) {
    flowerPositions.push({
      x: random(50, width - 50),
      y: random(350, height - 50),
      color: random(colors)
    });
  }
}

function drawSpringScene() {
	if (flowerPositions.length === 0) return;
  
	stroke("#77a37a");
	strokeWeight(3);
	for (let pos of flowerPositions) {
	  line(pos.x, height, pos.x, pos.y);
	  drawSpringFlower(pos.x, pos.y, pos.color);
	}
  }
  
  function drawSpringFlower(x, y, colorHex) {
	push();
	translate(x, y);
	noStroke();
	fill(color(colorHex));
  
	for (let i = 0; i < 10; i++) {
	  ellipse(0, 20, 12.5, 25);
	  rotate(PI / 5);
	}
  
	fill("#FFD700");
	ellipse(0, 0, 20, 20);
	pop();
  }
  