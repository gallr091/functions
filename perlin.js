let cols, rows;
let size = 10;
let noiseScale = 0.1;
let zoff = 0;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	cols = width / size;
  rows = height / size;
}

// perlin.js

function drawPerlinBackground() {
	background(0);
	let cols = width / size;
	let rows = height / size;
	let noiseScale = 0.1;
	let zoff = 0;
  
	for (let i = 0; i < cols; i++) {
	  for (let j = 0; j < rows; j++) {
		let x = i * size + size / 2;
		let y = j * size + size / 2;
		let noiseVal = noise(i * noiseScale, j * noiseScale, zoff);
		let circleSize = map(noiseVal, 0, 1, 0, size * 1.7);
		let grey = map(noiseVal, 0, 1, 100, 255); // Shades of grey
		fill(100);
		noStroke();
		ellipse(x, y, circleSize, circleSize);
	  }
	}
	zoff += 0.01; // Increment z-offset for animation
  }
  