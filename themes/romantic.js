function setup() {
	createCanvas(600, 800);
	noFill();
  }
  
  function drawBorder() {
	let amplitude = 5; 
	let wavelength = 50; 
	let waveDetail = 200;
	let margin = 30;

  
	stroke('#c71585'); 
	strokeCap(ROUND);
	strokeWeight(2);
	noFill();
  
	// top
	beginShape();
	for (let i = margin; i <= width - margin; i += (width - 2 * margin) / waveDetail) {
	  let x = i;
	  let y = margin + amplitude * sin(TWO_PI * (i - margin) / wavelength);
	  curveVertex(x, y);
	}
	endShape();
  
	// right
	// beginShape();
	// for (let i = margin; i <= height - margin; i += (height - 2 * margin) / waveDetail) {
	//   let x = width - margin + amplitude * sin(TWO_PI * (i - margin) / wavelength);
	//   let y = i;
	//   curveVertex(x, y);
	// }
	// endShape();
  
	// bottom
	beginShape();
	for (let i = margin; i <= width - margin; i += (width - 2 * margin) / waveDetail) {
	  let x = width - i;
	  let y = height - margin + amplitude * sin(TWO_PI * (i - margin) / wavelength);
	  curveVertex(x, y);
	}
	endShape();
  
	// left
	// beginShape();
	// for (let i = margin; i <= height - margin; i += (height - 2 * margin) / waveDetail) {
	//   let x = margin + amplitude * sin(TWO_PI * (i - margin) / wavelength);
	//   let y = height - i;
	//   curveVertex(x, y);
	// }
	// endShape();
  }