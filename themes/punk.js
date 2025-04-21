// I modified a previous p5.js sketch I made: https://editor.p5js.org/gallr091/sketches/HcjP0fhzR
// My original sketch was created following a tutorial on Perlin Noise by Patt Vira: https://www.youtube.com/watch?v=XevTlomtG3g
// I learned about Perlin noise last semester. It creates a more natural 'rhythm' compared to just straight up using randomness. The differences in random values can be stark whereas Perlin noise generates values that change more gradually. So this halftone effect is the result of brighter, larger, more visible dots clustering together naturally where noise values are higher

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
