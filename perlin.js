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
		let grey = map(noiseVal, 0, 1, 100, 255); 
		let alpha = map(noiseVal, 0, 1, 80, 180); // transparent effect

		fill(grey, alpha);
		noStroke();
		ellipse(x, y, circleSize, circleSize);
	  }
	}
	zoff += 0.01; 
}
