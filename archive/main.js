let canvas; 

let tabs = {};
let tabButtons = {};
let activeTab = 'themeText'; 

let tagline = ["H", "e", "l", "l", "o"];

let romanticFont, springFont, gamerFont, holidayFont, gothicFont;

let button, inp, controlsDiv, containerDiv, canvasWrapper;
let font1, font2, font3, font4;
let widther, heighter, waver, glitch, maxIndex, maxim;
let cx = [], cy = [], cratio = [];
let captionInput;
let captionText = "Nice to meet you!";
let fontChoices = [];
let shearAngles = [];
let rectSettings = [];
let rectColor = '#fffff';
let rectColorPicker;

let insideCanvas;
let toInput, fromInput, messageInput;
let messageTo = '';
let messageFrom = '';
let messageBody = '';

let letterRotations = [];

let shouldRedrawPixels = true;

let layoutSelector;
let currentLayout = 'wave';

let themeFonts = {};

let mainTextColor = '#000000';
let captionTextColor = '#fffff';
let bgColor = '#000000';
let mainColorPicker, captionColorPicker, bgColorPicker;

let currentTheme = 'punk'; // default 

const themes = {
  punk: {
    layout: 'wave',
    font: 'random', 
	captionFont: 'punk',
    shape: 'rect',
    bgColor: '#000000',
    mainTextColor: '#000000',
    captionTextColor: '#ffffff',
    rectColor: '#ffffff'
  },
  romantic: {
	layout: 'waveStack',
    font: 'romantic',
	captionFont: 'romantic',
    shape: 'heart',
    bgColor: '#fff0f5',
    mainTextColor: '#c71585',
    captionTextColor: '#c71585',
    rectColor: '#ffb6c1'
  },
  spring: {
    layout: 'grid',
    font: 'spring',
	captionFont: 'spring',
    shape: 'circle',
    bgColor: '#f0fff0',
    mainTextColor: '#567c57',
    captionTextColor: '#a17373',
    rectColor: '#ffe4e1'
  },
  gamer: {
	layout: 'maxFill',
    font: 'gamer',
	captionFont: 'pixel',
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


let mainX = 150, mainY = 150;
let captionX = 230, captionY = 300;
let xMainSlider, yMainSlider, xCaptionSlider, yCaptionSlider;
let forceRedraw = true;

function preload() {
	// mainFont = loadFont("Outfit-Variable.ttf");

	font1 = loadFont("fonts/UnifrakturCook-Bold.ttf");
	font2 = loadFont("fonts/BrutalMilkNo3-Bold.ttf");
	font3 = loadFont("fonts/The-Outskirts.ttf");
	font4 = loadFont("fonts/Gulax-Regular.otf");
	font5 = loadFont("fonts/BrutalMilkNo3-Medium.ttf")
  
	romanticFont = loadFont("fonts/DMSerifDisplay-Regular.ttf");
	springFont = loadFont("fonts/Moulay-Regular.otf");
	gamerFont = loadFont("fonts/DigiBop-Regular.otf");
	holidayFont = loadFont("fonts/NyséTest-Book.otf");
	gothicFont = loadFont("fonts/UnifrakturCook-Bold.ttf");
	pixelFont = loadFont("fonts/VCR_OSD_MONO_1.001.ttf");

	captionFonts = {
		punk: font5,
		romantic: romanticFont,
		spring: springFont,
		gamer: pixelFont,
		holiday: holidayFont,
		gothic: gothicFont,
	};

	themeFonts = {
		punk: font2,
		romantic: romanticFont,
		spring: springFont,
		gamer: gamerFont,
		holiday: holidayFont,
		gothic: gothicFont,
	  };
	  
  }
  function setup() {
	containerDiv = createDiv().addClass('container');
  
	// canvas wrapper
	canvasWrapper = createDiv().parent(containerDiv).addClass('canvas-wrapper');
	canvas = createCanvas(707, 500).parent(canvasWrapper).addClass('canvas');
  
	insideCanvas = createGraphics(707, 500);
	insideCanvasCanvas = createDiv().id('insidecanvas').addClass('canvas').parent(canvasWrapper);
	insideCanvasCanvas.child(insideCanvas.canvas);
	insideCanvasCanvas.hide();
	drawInsideCanvas();
  
	// controls container
	controlsDiv = createDiv().addClass('controls').parent(containerDiv);
	let tabButtonsDiv = createDiv().addClass('tab-buttons').parent(controlsDiv);
  
	const isDesktop = windowWidth >= 600;
  
	const tabNames = isDesktop
	  ? ['Card Design', 'Message']
	  : ['Theme & Text', 'Colors', 'Positions', 'Message', 'Final'];
  
	tabNames.forEach(name => {
	  const key = name.toLowerCase().replace(/ & /g, '').replace(/\s+/g, '');
	  const btn = createButton(name)
		.addClass('tab-button')
		.attribute('data-tab', key)
		.parent(tabButtonsDiv);
	  btn.mousePressed(() => switchTab(key));
	  tabButtons[key] = btn;
  
	  const tabContent = createDiv().addClass('tab-content').parent(controlsDiv);
	  tabs[key] = tabContent;
	});
  
	// desktop layout 
	if (isDesktop) {
	  const cardDesignGroup = createDiv().id('carddesign-controls').parent(tabs['carddesign']);
	  createThemeTextControls(cardDesignGroup);
	  createColorControls(cardDesignGroup);
	  createPositionControls(cardDesignGroup);
  
	  const messageGroup = createDiv().id('message-controls').parent(tabs['message']);
	  createMessageControls(messageGroup);
	  createFinalControls(messageGroup);
	} else {
	  createThemeTextControls(tabs['themetext']);
	  createColorControls(tabs['colors']);
	  createPositionControls(tabs['positions']);
	  createMessageControls(tabs['message']);
	  createFinalControls(tabs['final']);
	}
  
	switchTab(activeTab);
  }

  function switchTab(tabKey) {
	for (let key in tabs) {
	  if (key === tabKey) {
		tabs[key].show();
		tabButtons[key].addClass('active');
	  } else {
		tabs[key].hide();
		tabButtons[key].removeClass('active');
	  }
	}
  
	if (tabKey === 'message') {
	  canvas.hide();
	  drawInsideCanvas();
	  insideCanvasCanvas.show();
	} else {
	  canvas.show();
	  insideCanvasCanvas.hide();
	}
  
	activeTab = tabKey;
  }
  
//   function switchTab(tabKey) {

// 	//media query
// 	if (windowWidth >= 800) {
// 		// On desktop, ignore tab switching logic
// 		return;
// 	  }

	  
// 	for (let key in tabs) {
// 	  if (key === tabKey) {
// 		tabs[key].show();
// 		tabButtons[key].addClass('active');
// 	  } else {
// 		tabs[key].hide();
// 		tabButtons[key].removeClass('active');
// 	  }
// 	}
  
// 	// canvas switching logic
// 	if (tabKey === 'message') {
// 	  canvas.hide();
// 	  drawInsideCanvas(); // update insideCanvas content
// 	  insideCanvasCanvas.show();
// 	} else {
// 	  canvas.show();
// 	  insideCanvasCanvas.hide();
// 	}
  
// 	activeTab = tabKey;
//   }
  
  function createThemeTextControls(parent) {

	let inputRow = createDiv();
	inputRow.addClass('input-row');
	inputRow.parent(parent);

	// let customSelect = createDiv();
	// customSelect.addClass('custom-select');
	// customSelect.parent(inputRow);

	// theme
	let themeLabel = createP('Theme');
	themeLabel.addClass('label');
	themeLabel.parent(inputRow);
  
	let themeSelector = createSelect();
	themeSelector.addClass('selector');
	themeSelector.parent(inputRow);
	themeSelector.option('punk 🤘🏼👽🎶', 'punk');
	themeSelector.option('romantic 💕🥰🫶', 'romantic');
	themeSelector.option('spring 🌸🐝🌱', 'spring');
	themeSelector.option('gamer 🎮👾🕹️', 'gamer');
	// themeSelector.option('gothic');
	themeSelector.selected('punk');
	themeSelector.changed(() => {
	  currentTheme = themeSelector.value();
	  applyTheme(currentTheme);
	  forceRedraw = true;
	});


	// layout
	let layoutLabel = createP('Layout Style');
	layoutLabel.parent(inputRow);
	layoutLabel.addClass('label');

	layoutSelector = createSelect();
	layoutSelector.parent(inputRow);
	layoutSelector.addClass('selector');

	layoutSelector.option('wave');
	layoutSelector.option('grid');
	// layoutSelector.option('spiral');
	layoutSelector.option('arc');
	layoutSelector.selected('wave'); // default
	layoutSelector.option('stacked waves','waveStack');  
	layoutSelector.option('rotated letters', 'maxFill');    

	layoutSelector.style('width', '100%');
	layoutSelector.changed(() => {
		currentLayout = layoutSelector.value();
		forceRedraw = true; // layout update
	});

	// main input
	let mainLabel = createP('Main Text');
	mainLabel.parent(inputRow);
	mainLabel.addClass('label');

	inp = createInput('');
	inp.parent(inputRow);
	inp.addClass('input');
	inp.attribute('placeholder', 'Enter a name or greeting...');
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

	// caption input
	let captionLabel = createP('Caption Text');
	captionLabel.parent(inputRow);
	captionLabel.addClass('label');

	captionInput = createElement('textarea', captionText);
	captionInput.parent(inputRow);
	captionInput.addClass('caption-input');
	captionInput.attribute('placeholder', 'Write your caption here…');
	captionInput.input(() => {
		captionText = captionInput.value();
	});
  
  }
  
  function createColorControls(parent) {

	let inputRow = createDiv();
	inputRow.addClass('block-row');
	inputRow.parent(parent);

	let block1 = createDiv();
	block1.id('block1');
	block1.parent(inputRow);

	let block2 = createDiv();
	block2.id('block3');
	block2.parent(inputRow);

	let block3 = createDiv();
	block3.id('block3');
	block3.parent(inputRow);

	let block4 = createDiv();
	block4.id('block4');
	block4.parent(inputRow);

	// shape color
	let rectColorLabel = createP('Shape Color');
	rectColorLabel.addClass('label');
	rectColorLabel.parent(block1);

	rectColorPicker = createColorPicker(rectColor);
	rectColorPicker.addClass('colorpicker');
	rectColorPicker.parent(block1);
	rectColorPicker.input(() => {
		rectColor = rectColorPicker.value();
	});


	// main text color
		let mainColorLabel = createP('Main Text Color');
		mainColorLabel.addClass('label');

		mainColorLabel.parent(block2);
		mainColorPicker = createColorPicker(mainTextColor);
		mainColorPicker.addClass('colorpicker');

		mainColorPicker.parent(block2);
		mainColorPicker.input(() => {
		mainTextColor = mainColorPicker.value();
	});

	// caption color
	let captionColorLabel = createP('Caption Text Color');
	captionColorLabel.addClass('label');
	captionColorLabel.parent(block3);
	captionColorPicker = createColorPicker(captionTextColor);
	captionColorPicker.parent(block3);
	captionColorPicker.addClass('colorpicker');

	captionColorPicker.input(() => {
		captionTextColor = captionColorPicker.value();
	});

	// bg color
	let bgColorLabel = createP('Background Color');
	bgColorLabel.addClass('label');
	bgColorLabel.parent(block4);
	bgColorPicker = createColorPicker(bgColor);
	bgColorPicker.parent(block4);
	bgColorPicker.addClass('colorpicker');

	bgColorPicker.input(() => {
		bgColor = bgColorPicker.value();
	});
  }
  
  function createPositionControls(parent) {

	let inputRow = createDiv();
	inputRow.addClass('input-row');
	inputRow.id('sliderz');
	inputRow.parent(parent);
	
	
	// sliders
	let mainXLabel = createP('Main Text Horizontal');
	mainXLabel.parent(inputRow);
	mainXLabel.addClass('label');
	xMainSlider = createSlider(0, 700, mainX);
	xMainSlider.parent(inputRow);
	xMainSlider.input(() => { 
		mainX = xMainSlider.value(); 
	});

	let mainYLabel = createP('Main Text Vertical');
	mainYLabel.parent(inputRow);
	mainYLabel.addClass('label');
	yMainSlider = createSlider(-60, 400, mainY);
	yMainSlider.parent(inputRow);
	yMainSlider.input(() => { 
		mainY = yMainSlider.value(); 
	});

	let capXLabel = createP('Caption Horizontal');
	capXLabel.parent(inputRow);
	capXLabel.addClass('label');
	xCaptionSlider = createSlider(0, 700, captionX);
	xCaptionSlider.parent(inputRow);
	xCaptionSlider.input(() => { 
		captionX = xCaptionSlider.value(); 
	});

	let capYLabel = createP('Caption Vertical');
	capYLabel.parent(inputRow);
	capYLabel.addClass('label');

	yCaptionSlider = createSlider(0, 500, captionY);
	yCaptionSlider.parent(inputRow);
	yCaptionSlider.input(() => { captionY = yCaptionSlider.value(); });
  }
  

  function createMessageControls(parent) {

	let inputRow = createDiv();
	inputRow.parent(parent);
	inputRow.addClass('input-row');

	let messageBlock = createDiv();
	messageBlock.parent(parent);
	messageBlock.addClass('message-block');

	let toLabel = createP("To:");
	toLabel.parent(inputRow);
	toLabel.addClass('label');

	toInput = createInput('');
	toInput.parent(inputRow);
	toInput.addClass('input');
	toInput.attribute('placeholder', 'Enter a name here…');

	toInput.input(() => {
		messageTo = toInput.value();
		updateInsideCanvas();
	  });

	  let fromLabel = createP("From:");
	  fromLabel.parent(inputRow);
	  fromLabel.addClass('label');

	  fromInput = createInput('');
	  fromInput.parent(inputRow);
	  fromInput.addClass('input');
	  fromInput.attribute('placeholder', 'Enter your name here…');

  
	  fromInput.input(() => {
		messageFrom = fromInput.value();
		updateInsideCanvas();
	  });


	let messageLabel = createP("Message:");
	messageLabel.parent(messageBlock);
	messageLabel.addClass('label');


	messageInput = createElement('textarea', '');
	messageInput.parent(messageBlock);
	messageInput.addClass('input');
	messageInput.attribute('placeholder', 'Write your message here…');


	messageInput.input(() => {
	  messageBody = messageInput.value();
	  updateInsideCanvas();
	});
  

  }

//   function updateInsideCanvas() {
// 	insideCanvas.clear();
// 	insideCanvas.background('#fff');
  
// 	insideCanvas.fill(0);
// 	insideCanvas.textAlign(CENTER, TOP);
// 	insideCanvas.textSize(24);
  
// 	insideCanvas.text(`To: ${messageTo}`, insideCanvas.width / 2, 100);
// 	insideCanvas.textSize(20);
// 	insideCanvas.text(messageBody, insideCanvas.width / 2, 160);
// 	insideCanvas.textSize(24);
// 	insideCanvas.text(`From: ${messageFrom}`, insideCanvas.width / 2, 360);
//   }
  
  

  function createFinalControls(parent) {
	let refreshBtn = createButton('Refresh');
	refreshBtn.addClass('button');
	refreshBtn.parent(parent);
	refreshBtn.mousePressed(() => {
	  forceRedraw = true;
	});
  
	let saveBtn = createButton('Save');
	saveBtn.addClass('button');
	saveBtn.parent(parent);
	saveBtn.mousePressed(() => saveCanvas('greeting-card', 'png'));
  
	let recipientButton = createButton('Open Recipient View');
	recipientButton.addClass('button');
	recipientButton.parent(parent);
	recipientButton.mousePressed(openRecipientViewLink);
  
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

	if (activeTab === 'message') {
		drawInsideCanvas();
	  }


	if (currentTheme === 'punk') {
		background(bgColor); 
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
	  
		  let w = 50 * random(1, 1.5);
		  let r = random(0, 15);
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

		if (captionFonts && captionFonts[currentTheme]) {
		textFont(captionFonts[currentTheme]);
		} else {
		textFont('Helvetica'); // fallback if not found
		}

		textSize(30);
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
	const letterSpacing = baseSize * 1.3;
	const amplitude = random(10, 20);
	const frequency = random(0.1, 0.5);
  
	if (index === 0) {
	  widther = 80;      
	  heighter = 50;   
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
	  rect(-30, -40, settings.width * 1.2, settings.width * 1.4, settings.radius);
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
	fill('#FAD0C1'); // redz
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

function openRecipientViewLink() {
	drawInsideCanvas(); 
  
	const coverImage = canvas.elt.toDataURL("image/png");
	const insideImage = insideCanvas.canvas.toDataURL("image/png");
  
	const recipientWindow = window.open("recipient.html", "_blank");
  
	recipientWindow.onload = () => {
	  recipientWindow.postMessage({
		type: "cardDesign",
		data: {
		  coverImage,
		  insideImage
		}
	  }, "*");
	};
  }

  
  function drawInsideCanvas() {
	insideCanvas.background(bgColor);
	insideCanvas.fill(captionTextColor); 
	insideCanvas.textAlign(LEFT, TOP);

	const insideFont = captionFonts[currentTheme];
	if (insideFont) {
	  insideCanvas.textFont(insideFont);
	} else {
	  insideCanvas.textFont(springFont); 
	}
	  
	insideCanvas.textSize(24);
  
	//ok this works now
	insideCanvas.text(`To:   ${messageTo}`, 50, 80);
	insideCanvas.text(`${messageBody}`, 50, 140, 600); 
	insideCanvas.text(`From:   ${messageFrom}`, 50, 380);
  
	if (activeTab === 'message') {
	  insideCanvas.show();
	} else {
	  insideCanvas.hide();
	}
  }
  
  
  