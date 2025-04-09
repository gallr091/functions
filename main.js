let tagline = ["H", "e", "l", "l", "o"];

let romanticFont, springFont, gamerFont, holidayFont, gothicFont;

let button, inp, controlsDiv, containerDiv, canvasWrapper;
let font1, font2, font3, font4;
let widther, heighter, waver, glitch, maxIndex, maxim;
let cx = [], cy = [], cratio = [];
let captionInput;
let captionText = "";
let fontChoices = [];
let shearAngles = [];
let rectSettings = [];
let rectColor = '#000000';
let rectColorPicker;

let letterRotations = [];

let shouldRedrawPixels = true;

let layoutSelector;
let currentLayout = 'wave';

let themeFonts = {};

let mainTextColor = '#ffffff';
let captionTextColor = '#000000';
let bgColor = '#ffffff';
let mainColorPicker, captionColorPicker, bgColorPicker;

let currentTheme = 'punk'; // default 

const themes = {
  punk: {
    layout: 'wave',
    font: 'random', 
    shape: 'rect',
    bgColor: '#000000',
    mainTextColor: '#000000',
    captionTextColor: '#ffffff',
    rectColor: '#ffffff'
  },
  romantic: {
	layout: 'waveStack',
    font: 'romantic',
    shape: 'heart',
    bgColor: '#fff0f5',
    mainTextColor: '#c71585',
    captionTextColor: '#800000',
    rectColor: '#ffb6c1'
  },
  spring: {
    layout: 'grid',
    font: 'spring',
    shape: 'circle',
    bgColor: '#f0fff0',
    mainTextColor: '#567c57',
    captionTextColor: '#6b8e23',
    rectColor: '#ffe4e1'
  },
  gamer: {
	layout: 'maxFill',
    font: 'gamer',
    shape: 'pixel',
    bgColor: '#000000',
    mainTextColor: '#EDEDED',
    captionTextColor: '#00ffff',
    rectColor: '#ff00ff'
  },
  holiday: {
    layout: 'wave',
    font: 'holiday',
    shape: 'gift',
    bgColor: '#f5f5dc',
    mainTextColor: '#800000',
    captionTextColor: '#004225',
    rectColor: '#d2691e'
  },
  gothic: {
    layout: 'waveStack',
    font: 'gothic',
    shape: 'diamond',
    bgColor: '#0a0a0a',
    mainTextColor: '#ff0000',
    captionTextColor: '#aaaaaa',
    rectColor: '#1c1c1c'
  }
};


let mainX = 60, mainY = 150;
let captionX = 60, captionY = 100;
let xMainSlider, yMainSlider, xCaptionSlider, yCaptionSlider;
let forceRedraw = true;

function preload() {
	font1 = loadFont("fonts/VTF_Mixo.otf");
	font2 = loadFont("fonts/Montchauve.otf");
	font3 = loadFont("fonts/Format_1452.otf");
	font4 = loadFont("fonts/Gulax-Regular.otf");
  
	romanticFont = loadFont("fonts/DMSerifDisplay-Regular.ttf");
	springFont = loadFont("fonts/Moulay-Regular.otf");
	gamerFont = loadFont("fonts/DigiBop-Regular.otf");
	holidayFont = loadFont("fonts/NyséTest-Book.otf");
	gothicFont = loadFont("fonts/UnifrakturCook-Bold.ttf");

	themeFonts = {
		romantic: romanticFont,
		spring: springFont,
		gamer: gamerFont,
		holiday: holidayFont,
		gothic: gothicFont
	  };
	  
  }


function setup() {
	containerDiv = createDiv();
	containerDiv.addClass('container'); 

	// sidebar
	controlsDiv = createDiv();
	controlsDiv.addClass('controls'); 
	controlsDiv.parent(containerDiv);
	

	let topControls = createDiv();
	topControls.parent(controlsDiv);
	topControls.addClass('topcontrols');

	let gridControls = createDiv();
	gridControls.addClass('gridcontrols');
	gridControls.parent(topControls);
	
	let themeLabel = createP('Theme');
	themeLabel.addClass('label');
	themeLabel.parent(gridControls);

	let themeSelector = createSelect();
	themeSelector.addClass('selector');
	themeSelector.parent(gridControls);
	themeSelector.option('punk');
	themeSelector.option('romantic');
	themeSelector.option('spring');
	themeSelector.option('gamer');
	// themeSelector.option('holiday');
	themeSelector.option('gothic');
	themeSelector.selected('punk');
	themeSelector.style('width', '100%');
	themeSelector.changed(() => {
	currentTheme = themeSelector.value();
	applyTheme(currentTheme);
	forceRedraw = true;
	});


	let layoutLabel = createP('Layout Style');
	layoutLabel.parent(gridControls);
	layoutLabel.addClass('label');

	layoutSelector = createSelect();
	layoutSelector.parent(gridControls);
	layoutSelector.addClass('selector');

	layoutSelector.option('wave');
	layoutSelector.option('grid');
	// layoutSelector.option('spiral');
	layoutSelector.option('arc');
	layoutSelector.selected('wave'); // default
	layoutSelector.option('waveStack');  
	layoutSelector.option('maxFill');    

	layoutSelector.style('width', '100%');
	layoutSelector.changed(() => {
		currentLayout = layoutSelector.value();
		forceRedraw = true; // layout update
	});

	let bottomControls = createDiv();
	bottomControls.addClass('bottom-controls');
	bottomControls.parent(controlsDiv);

	// name input
	let mainLabel = createP('Main Text');
	mainLabel.addClass('label');
	mainLabel.parent(gridControls);

	inp = createInput('');
	inp.parent(gridControls);
	inp.addClass('input');
	inp.attribute('placeholder', 'Type a name...');
	inp.input(() => {
		const full = inp.value();
	  
		if (currentLayout === 'waveStack') {
		  const repeat = 5; // rows
		  let result = [];
		  for (let i = 0; i < repeat; i++) {
			result = result.concat(full.split(""));
		  }
		  tagline = result;
		} else {
		  tagline = full.split(""); // dont repeat
		}
	  
		forceRedraw = true;
	  });

	// inp.input(() => {
	// 	const full = inp.value();
	// 	const words = full.split(' '); // Split input into words
	// 	tagline = []; 
	  
	// 	words.forEach((word, index) => {
	// 	  tagline = tagline.concat(word.split(''));
	// 	  // space marker
	// 	  if (index < words.length - 1) {
	// 		tagline.push(' '); 
	// 	  }
	// 	});
	  
	// 	forceRedraw = true;
	//   });

	// caption input
	let captionLabel = createP('Caption Text');
	captionLabel.parent(gridControls);
	captionLabel.addClass('label');

	captionInput = createElement('textarea', captionText);
	captionInput.parent(gridControls);
	captionInput.addClass('caption-input');
	captionInput.attribute('placeholder', 'Write your message here…');
	captionInput.input(() => {
		captionText = captionInput.value();
	});

	// shape color
	let rectColorLabel = createP('Shape Color');
	rectColorLabel.addClass('label');
	rectColorLabel.parent(gridControls);

	rectColorPicker = createColorPicker(rectColor);
	rectColorPicker.parent(gridControls);
	rectColorPicker.input(() => {
		rectColor = rectColorPicker.value();
	});


	// main text color
		let mainColorLabel = createP('Main Text Color');
		mainColorLabel.addClass('label');

		mainColorLabel.parent(gridControls);
		mainColorPicker = createColorPicker(mainTextColor);
		mainColorPicker.parent(gridControls);
		mainColorPicker.input(() => {
		mainTextColor = mainColorPicker.value();
	});

	// caption color
	let captionColorLabel = createP('Caption Text Color');
	captionColorLabel.addClass('label');
	captionColorLabel.parent(gridControls);
	captionColorPicker = createColorPicker(captionTextColor);
	captionColorPicker.parent(gridControls);
	captionColorPicker.input(() => {
		captionTextColor = captionColorPicker.value();
	});

	// bg color
	let bgColorLabel = createP('Background Color');
	bgColorLabel.addClass('label');
	bgColorLabel.parent(gridControls);
	bgColorPicker = createColorPicker(bgColor);
	bgColorPicker.parent(gridControls);
	bgColorPicker.input(() => {
		bgColor = bgColorPicker.value();
	});


	// sliders
	let mainXLabel = createP('Main Text Horizontal Position');
	mainXLabel.parent(gridControls);
	mainXLabel.addClass('label');
	xMainSlider = createSlider(0, 700, mainX);
	xMainSlider.parent(gridControls);
	xMainSlider.input(() => { 
		mainX = xMainSlider.value(); 
	});

	let mainYLabel = createP('Main Text Vertical Position');
	mainYLabel.parent(gridControls);
	mainYLabel.addClass('label');
	yMainSlider = createSlider(-60, 400, mainY);
	yMainSlider.parent(gridControls);
	yMainSlider.input(() => { 
		mainY = yMainSlider.value(); 
	});

	let capXLabel = createP('Caption Horizontal Position');
	capXLabel.parent(gridControls);
	capXLabel.addClass('label');
	xCaptionSlider = createSlider(0, 700, captionX);
	xCaptionSlider.parent(gridControls);
	xCaptionSlider.input(() => { 
		captionX = xCaptionSlider.value(); 
	});

	let capYLabel = createP('Caption Vertical Position');
	capYLabel.parent(gridControls);
	capYLabel.addClass('label');

	capYLabel.style('color', 'white');
	yCaptionSlider = createSlider(0, 500, captionY);
	yCaptionSlider.parent(gridControls);
	yCaptionSlider.input(() => { captionY = yCaptionSlider.value(); });

	// refresh design button
	let refreshBtn = createButton('Refresh');
	refreshBtn.addClass('button');
	refreshBtn.parent(bottomControls);
	refreshBtn.mousePressed(() => { 
		forceRedraw = true; 
	});

	// save card button
	button = createButton('Save');
	button.addClass('button');
	button.parent(bottomControls);
	button.mousePressed(() => saveCanvas('greeting-card', 'png'));

	// recipient view button
	let viewButton = createButton('View as Recipient');
	viewButton.addClass('button');
	viewButton.parent(bottomControls);
	viewButton.mousePressed(openRecipientView);
  
	// canvas
	canvasWrapper = createDiv();
	canvasWrapper.parent(containerDiv);
	canvasWrapper.addClass('canvas-wrapper');

	let canvas = createCanvas(707, 500);
	canvas.parent(canvasWrapper);
	canvas.addClass('canvas');

	textSize(50);
	rectMode(CENTER);

	applyTheme(currentTheme);

}

function applyTheme(name) {
	let theme = themes[name];
	currentLayout = theme.layout;
	mainTextColor = theme.mainTextColor;
	captionTextColor = theme.captionTextColor;
	bgColor = theme.bgColor;
	rectColor = theme.rectColor;
  
	forceRedraw = true;
  }
  
  
  
function draw() {

	if (currentTheme === 'punk') {
		drawPerlinBackground();
	  } else {
		background(bgColor); 
	  }

	 if (currentTheme === 'romantic') {
		push();
		drawBorder();
		pop();
	  } 

	  if (currentTheme === 'spring') {

		push();
		console.log('drawing stems and flowers?');
		drawStemsAndFlowers();
		pop();
	  } 

	//   if (currentTheme === 'gamer') {
	// 	push();
	// 	drawPixels();
	// 	pop();
		// noLoop();
	//   }

	if (currentTheme === 'gamer') {
		drawGamerTheme();
	  }


	// background(bgColor);

	if (forceRedraw) {
		cx = [];
		cy = [];
		cratio = [];
		shearAngles = [];
		rectSettings = [];
		fontChoices = [];
		widther = 50;
		heighter = 100;
		waver = random(100);
		glitch = random(0.3, 0.8);
	  
		// generate layout positions
		for (let i = 0; i < tagline.length; i++) {
		  if (currentLayout === 'wave') generateXYCWave(i);
		  if (currentLayout === 'grid') generateXYCGrid(i);
		  if (currentLayout === 'spiral') generateXYCSpiral(i);
		  if (currentLayout === 'arc') generateXYCArc(i);
		  if (currentLayout === 'waveStack') generateXYCWaveStack(i);
		  if (currentLayout === 'maxFill') generateXYCMaxFill(i);
	  
		  shearAngles.push(random(-PI / 20, PI / 20));
	  
		  let w = 60 * random(1, 1.5);
		  let r = random(5, 25);
		  rectSettings.push({ width: w, radius: r });
		}
	  
		// build font choices AFTER positions
		const themeFont = themes[currentTheme].font;
	  
		if (themeFont === 'random') {
		  for (let i = 0; i < tagline.length; i++) {
			let decider = random(1);
			if (decider < 0.25) fontChoices.push(font1);
			else if (decider < 0.5) fontChoices.push(font2);
			else if (decider < 0.75) fontChoices.push(font3);
			else fontChoices.push(font4);
		  }
		} else {
		  const selectedFont = themeFonts[themeFont];
		  if (selectedFont) {
			fontChoices = Array(tagline.length).fill(selectedFont);
		  } else {
			// default font
			fontChoices = Array(tagline.length).fill('Helvetica');
		  }
		}
		
	  
		forceRedraw = false;
	  }
	  
	  

	// draw main text
	push();
	translate(mainX, mainY);
	// for (let i = 0; i < tagline.length; i++) drawShape(i);
	if (currentLayout !== 'maxFill') {
		for (let i = 0; i < tagline.length; i++) drawShape(i);
	  }
	  
	for (let i = 0; i < tagline.length; i++) cuteText(tagline[i], i);
	pop();

	// caption text
	push();
	translate(captionX, captionY);
	fill(captionTextColor);
	noStroke();
	textSize(16);
	textLeading(20);
	textAlign(LEFT, TOP);
	text(captionText, 0, 0);
	pop();
}



// DEFAULT 
// experiment
function generateXYC(index) {
	//stretchiness original
	// let ratio = random(1, 1.5);

		//uniform stretch
		// let ratio = 1;

		//more distorted
		let ratio = random(0.5, 2);

	if (tagline[index] === "/") {
		maxIndex = index;
		widther -= random(50, 100);
		heighter += 80;
	}
	cx.push(widther);

	//wave original
	//cy.push(heighter + sin(index / 2 + waver) * 30);
		
		//bigger wave
		// cy.push(heighter + sin(index * 0.3 + waver) * 50);

		//zigzag
		// cy.push(heighter + (index % 2 === 0 ? -20 : 20));

		//random jitter
		cy.push(heighter + random(-30, 30));


	cratio.push(ratio);

	//horizontal spacing original
	widther += textWidth(tagline[index]) * ratio;

		//closer together
		// widther += textWidth(tagline[index]) * ratio * 0.8;

		//uniform spacing
		// widther += 40 * ratio;
}

// WAVE
function generateXYCWave(index) {
	const baseSize = 40;
	const letterSpacing = baseSize * 0.75;
	const amplitude = random(10, 30);
	const frequency = random(0.1, 0.5);
  
	if (index === 0) {
	  widther = 30;      
	  heighter = 100;   
	}
  
	const char = tagline[index];
  
	if (char === ' ') {
	  // space = move to next line
	  widther = 30;             // reset x 
	  heighter += baseSize + 20; // move y down 
	  
	  cx.push(null);
	  cy.push(null);
	  cratio.push(null);
	} else {
	  // wave effect
	  const yOffset = sin(widther * frequency) * amplitude;
	  cx.push(widther);
	  cy.push(heighter + yOffset);
	  cratio.push(1);
	  widther += textWidth(char) + letterSpacing;
	}
  }
  
// function generateXYCWave(index) {
// 	const baseSize = 40;
// 	const letterSpacing = baseSize * 0.75;
// 	const amplitude = random(10, 30);
// 	const frequency = random(0.1, 0.5);
  
// 	if (index === 0) {
// 	  widther = 30;     
// 	  heighter = 100;
// 	}
  
// 	const char = tagline[index];
  
// 	if (char === " ") {
// 	  
// 	  widther = 30;
// 	  heighter += baseSize + 20;
// 	  return; 
// 	}
  
// 	const yOffset = sin(widther * frequency) * amplitude;
  
// 	cx.push(widther);
// 	cy.push(heighter + yOffset);
// 	cratio.push(1);
  
// 	widther += textWidth(char) + letterSpacing;
//   }
  

// GRID
function generateXYCGrid(index) {
	let ratio = 1;
	let cols = 8;
	let spacing = 80;
let row = floor(index / cols);
let col = index % cols;

// let jitterX = random(-5, 5); 
// let jitterY = random(-5, 5);

let jitterX = 0;
let jitterY = 0;

cx.push(col * spacing + jitterX);
cy.push(row * spacing + jitterY);

	cratio.push(ratio);
}

// WAVESTACK
function generateXYCWaveStack(index) {
	const full = inp.value(); 
	const wordLength = full.length;
	const baseSize = 40;
	const letterSpacing = baseSize * 1.8; 
	const lineHeight = baseSize + 20; 
	const amplitude = random(20, 30);
	const frequency = random(0.3, 0.5); 
  
	let col = index % wordLength;
	let row = floor(index / wordLength);
  
	let x = col * letterSpacing + 30;
	let y = row * lineHeight + sin(col * frequency) * amplitude;
  
	cx.push(x);
	cy.push(y);
	cratio.push(1);
  }
  

// MAXFILL
function generateXYCMaxFill(index) {
	let cols = 8; 
	let spacingX = width / (cols + 1);
	let spacingY = height / 6; 
  
	let row = floor(index / cols);
	let col = index % cols;
  
	let x = spacingX * (col + 1);
	let y = spacingY * (row + 1);
  
	cx.push(x);
	cy.push(y);

	letterRotations.push(random(-PI / 12, PI / 12)); 
  }
  
// SPIRAL
function generateXYCSpiral(index) {
	let angle = index * 0.5 + random(-0.1, 0.1); 
	let radius = index * 10 + random(-5, 5);    

	let x = cos(angle) * radius;
	let y = sin(angle) * radius;

	cx.push(x);
	cy.push(y);
	cratio.push(1);
}

// ARC
function generateXYCArc(index) {
	let total = tagline.length;
	let angle = map(index, 0, total - 1, -PI / 2, PI / 2);
	let radius = 150 + random(-10, 10);

	let x = cos(angle) * radius;
	let y = sin(angle) * radius + random(-10, 10); 

	cx.push(x);
	cy.push(y);
	cratio.push(1.2);
}


function drawShape(index) {

	  // if null it means space []
	  if (cx[index] == null || cy[index] == null) {
		return; 
	  }
	  
	let isMaxFill = currentLayout === 'maxFill';
	let scaleFactor = isMaxFill ? 2.5 : 1;  

	push();
	noStroke();
	fill(rectColor);
	translate(cx[index], cy[index]);
  
	const shapeType = themes[currentTheme].shape;
	const settings = rectSettings[index];
  
	if (shapeType === 'rect') {
	  rect(0, 0, settings.width, 70, settings.radius);
	}
  
	else if (shapeType === 'heart') {
	  drawHeart(0, 0, 2);
	}
  
	else if (shapeType === 'circle') {
	//   ellipse(0, 0, 80);
	const withLeaf = index === 0;
	drawFruit(0, 0, 80, withLeaf);
	}
  
	else if (shapeType === 'pixel') {
	  rect(0, 0, 70, 70, 2);
	}
  
	else if (shapeType === 'gift') {
	  rect(0, 0, 60, 60, 8);
	  stroke(255);
	  strokeWeight(2);
	  line(20 - 30, -20, 20 + 30, -20); // horizontal ribbon
	  line(20, -50, 20, 10);            // vertical ribbon
	}

	else if (shapeType === 'diamond') {
		beginShape();
		vertex(0, -50);  // top
		vertex(50, 0);   // right
		vertex(0, 50);   // bottom
		vertex(-50, 0);  // left
		endShape(CLOSE);
	  }
  
	pop();
  }

  function drawHeart(x, y, s) {
	push();
	translate(x, y);
	scale(s);
	beginShape();
	vertex(0, -10);
	bezierVertex(15, -25, 30, 0, 0, 20);
	bezierVertex(-30, 0, -15, -25, 0, -10);
	endShape(CLOSE);
	pop();
  }

  function drawFruit(x, y, size, withLeaf) {

	// stem
	stroke(139, 69, 19); // brown
	strokeWeight(size * 0.1);
	line(x, y - size / 2, x, y - size / 2 - size * 0.2);

	// fruit
	fill('#FAD0C1'); // red
	noStroke();
	ellipse(x, y, size, size);
  
	
  
	// leaf conditional
	if (withLeaf) {
	  fill(34, 139, 34); // green
	  noStroke();
	  push();
	  translate(x + 15, y - size / 3 - size * 0.2);
	  rotate(-PI / 4); 
	  ellipse(0, -size * 0.1, size * 0.3, size * 0.15);
	  pop();
	}
  }
  
  

  function cuteText(texter, index) {
	  if (cx[index] === null || cy[index] === null) {
		return;
	  }
	
	push();
	fill(mainTextColor);
	textFont(fontChoices[index]);
	translate(cx[index], cy[index]);
  
	if (currentLayout === 'maxFill') {
	  rotate(letterRotations[index]);
	}
  
	textAlign(CENTER, CENTER);

	// scale(cratio[index], 1);
	if (currentLayout === 'maxFill') {
		textSize(100);
	  } else {
		textSize(70);
	  }

	text(texter, 0, -7);
	pop();
  }

  function getCanvasImage() {
	return canvas.toDataURL('image/png');
  }

  function openRecipientView() {
	const imageData = getCanvasImage();
	const recipientWindow = window.open('', '_blank');
	recipientWindow.document.write(`
	  <!DOCTYPE html>
	  <html lang="en">
	  <head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Recipient View</title>
		<style>
		  body {
			margin: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100vh;
			background-color: #D9DCD6;
		  }
		  .card-container {
			perspective: 1500px;
		  }
		  .card {
			width: 707px;
			height: 500px;
			position: relative;
		  }
		  .card-cover, .card-content {
			position: absolute;
			width: 100%;
			height: 100%;
			backface-visibility: hidden;
		  }
		  .card-cover {
			display: flex;
			justify-content: center;
			align-items: center;
			transform-origin: top;
			transition: transform 1s ease-in-out;
			z-index: 2;
		  }
		  .card-cover img {
			width: 100%;
			height: auto;
		  }
		  .card-content {
			background-color: red;
			display: flex;
			justify-content: center;
			align-items: center;
			transform: rotateX(180deg);
		  }
		  .card:hover .card-cover {
			transform: rotateX(-180deg);
		  }
		</style>
	  </head>
	  <body>
		<div class="card-container">
		  <div class="card">
			<div class="card-cover">
			  <img src="${imageData}" alt="Card Cover">
			</div>
			<div class="card-content">
			  <!-- Inside content here -->
			</div>
		  </div>
		</div>
	  </body>
	  </html>
	`);
	recipientWindow.document.close();
  }
  
  
  

