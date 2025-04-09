const flowerPositions = [
	{ x: 200, y: 450, color: "#a888e8" },
	{ x: 300, y: 400, color: "#ff8b00" },
	{ x: 400, y: 400, color: "#6497bf" },
	{ x: 150, y: 400, color: "#FF66AA" },
	{ x: 350, y: 450, color: "#fb3310" },
	{ x: 500, y: 450, color: "#a64d79" },
	{ x: 550, y: 400, color: "#FF9966" }
  ];
  
  function setup() {
	createCanvas(707, 500);
	// background(255);
	drawStemsAndFlowers();
  }
  
  function drawStemsAndFlowers() {
	stroke("#77a37a");
	strokeWeight(3);
	for (let pos of flowerPositions) {
	  line(pos.x, height, pos.x, pos.y);
	  drawFlower(pos.x, pos.y, pos.color); 
	}
  }
  
  function drawFlower(x, y, colorHex) {
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
  