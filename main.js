/* ------------------------ GLOBAL VARIABLES ------------------------ */

// State + UI Logic
let canvas;
let insideCanvas;

let activeTab = 'themeText';
let currentLayout = 'arc';
let currentTheme = 'default'; // celebration theme = default
let forceRedraw = true;
let shouldRedrawPixels = true;

// DOM + Element Refs
let containerDiv, controlsDiv, canvasWrapper;
let button, inp, layoutSelector;
let mainColorPicker, captionColorPicker, bgColorPicker;
let rectColorPicker;
let captionInput;

let toInput, fromInput, messageInput;
let xMainSlider, yMainSlider, xCaptionSlider, yCaptionSlider;

// Text + Message Data
let tagline = ["H", "e", "l", "l", "o"];
let captionText = "Have a good day!";
let messageTo = 'You';
let messageFrom = 'Me';
let messageBody = 'This is the inside of your greeting card! Your message will display when the card is “flipped” open. Check it out in the recipient view :)';

// Theme + Fonts
let themeFonts = {};
let captionFonts = {};

const themes = {

  default: {
    layout: 'arc',
    font: 'default',
    shape: 'diamond',
    bgColor: '#FFFCF5',
    mainTextColor: '#edf7ff',
    captionTextColor: '#197dbe',
    rectColor: '#FF66AA'
  },

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
  }

};

let romanticFont, springFont, gamerFont, holidayFont, defaultFont;
let font1, font2, font3, font4;

// Colors
let rectColor = '#FF66AA';
let mainTextColor = '#edf7ff';
let captionTextColor = '#197dbe';
let bgColor = '#FFFCF5';

// Layout
let mainX = 150, mainY = 240;
let captionX = 400, captionY = 300;
let widther, heighter, glitch

// Arrays 
let cx = [], cy = [], cratio = [];
let letterRotations = [];
let shearAngles = [];
let fontChoices = [];
let rectSettings = [];

// Tabs
let tabs = {};
let tabButtons = {};



/* ------------------------ PRELOAD + SETUP ------------------------ */

function preload() {

	font1 = loadFont("fonts/UnifrakturCook-Bold.ttf");
	font2 = loadFont("fonts/BrutalMilkNo3-Bold.ttf");
	font3 = loadFont("fonts/The-Outskirts.ttf");
	font4 = loadFont("fonts/Gulax-Regular.otf");
	font5 = loadFont("fonts/BrutalMilkNo3-Medium.ttf")
  
	defaultFont = loadFont("fonts/SpaceGrotesk-Medium.ttf");
	romanticFont = loadFont("fonts/DMSerifDisplay-Regular.ttf");
	springFont = loadFont("fonts/Moulay-Regular.otf");
	gamerFont = loadFont("fonts/DigiBop-Regular.otf");
	holidayFont = loadFont("fonts/NyséTest-Book.otf");
	gothicFont = loadFont("fonts/UnifrakturCook-Bold.ttf");
	pixelFont = loadFont("fonts/VCR_OSD_MONO_1.001.ttf");
	cuteFont = loadFont("fonts/1HoonIcetea_Regular.ttf");

	captionFonts = {
		default: defaultFont,
		punk: font5,
		romantic: romanticFont,
		spring: springFont,
		gamer: pixelFont,
		holiday: holidayFont,
		gothic: gothicFont,
	};

	themeFonts = {
		default: cuteFont,
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

	// const labels = {
	// 	themetext: 'Theme & Text',
	// 	colors: 'Colors',
	// 	positions: 'Positions',
	// 	message: 'Message',
	// 	final: 'Final'
	//   };
  
	// using conditional operators lol
	const tabNames = isDesktop
	  ? ['Card Design', 'Message']
	  : ['Theme & Text', 'Colors', 'Positions', 'Message', 'Done?'];
  
	  const tabLabelMap = {
		'Done?': 'final'
	  };

	  tabNames.forEach(name => {
		const key = tabLabelMap[name] || name.toLowerCase().replace(/ & /g, '').replace(/\s+/g, '');
		const btn = createButton('').addClass('tab-button').attribute('data-tab', key).parent(tabButtonsDiv);
	   	//not working 
		// btn.attribute('data-tooltip', labels[key]); 

		if (!isDesktop) {
		  //mobile svg icons
		  const iconMap = {
			themetext: 'icon-01.svg',
			colors: 'icon-02.svg',
			positions: 'icon-03.svg',
			message: 'icon-04.svg'
		  };
	  
		  if (iconMap[key]) {
			const img = createImg(`assets/${iconMap[key]}`, name);
			img.parent(btn);
			img.addClass('tab-icon');
		  } else {
			btn.html(name); // except final
		  }
		} else {
		  // desktop
		  btn.html(name);
		}
	  
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
	// createFinalControls(cardDesignGroup, { refresh: true, save: false, recipient: false }); // just refresh

	const messageGroup = createDiv().id('message-controls').parent(tabs['message']);
	createMessageControls(messageGroup);

	let wrapper = select('#final-controls-wrapper');
	createFinalControls(wrapper, { refresh: false, save: true, recipient: true, saveInside: true  });

} else {
	  createThemeTextControls(tabs['themetext']);
	  createColorControls(tabs['colors']);
	  createPositionControls(tabs['positions']);
	  createMessageControls(tabs['message']);
	  createFinalControls(tabs['final'], {
		// refresh: true,
		save: true,
		recipient: true,
		copyLink: true,
		saveInside: true 
	});
	}

	// display active tab on page load
	if (windowWidth >= 600) {
		activeTab = 'carddesign';
	  } else {
		activeTab = 'themetext';
	  }
  
	switchTab(activeTab);
  }



/* ------------------------ CONTROL PANELS ------------------------ */

// Switching Tabs
 function switchTab(tabKey) {
	for (let key in tabs) {
	  if (key === tabKey) {
		tabs[key].show();
		tabs[key].style('display', 'flex');
		tabs[key].style('flex-direction', 'column');
		// tabs[key].style('gap', '2rem');
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


// Theme & Text Controls
  function createThemeTextControls(parent) {

	createElement('h3', 'Theme & Text').parent(parent).addClass('tab-label');

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
	themeSelector.option('celebration 🥳🎉💫', 'default');
	themeSelector.option('punk 🕷️👽🤘🏼', 'punk');
	themeSelector.option('romantic 💕🥰🫶', 'romantic');
	themeSelector.option('spring 🌸🐝🌱', 'spring');
	themeSelector.option('gamer 🎮👾🕹️', 'gamer');
	themeSelector.selected('default');
	themeSelector.changed(() => {
	  currentTheme = themeSelector.value();
	  applyTheme(currentTheme);
	  forceRedraw = true;
	});


	// layout
	let layoutLabel = createP('Text Layout');
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
	layoutSelector.option('skewed letters', 'maxFill');    

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



// Color Controls
  function createColorControls(parent) {

	createElement('h3', 'Colors').parent(parent).addClass('tab-label');

	let inputRow = createDiv();
	inputRow.addClass('block-row');
	inputRow.parent(parent);

	let block1 = createDiv();
	block1.id('block1');
	block1.parent(inputRow);

	let block2 = createDiv();
	block2.id('block2');
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

		mainColorLabel.parent(block3);
		mainColorPicker = createColorPicker(mainTextColor);
		mainColorPicker.addClass('colorpicker');

		mainColorPicker.parent(block3);
		mainColorPicker.input(() => {
		mainTextColor = mainColorPicker.value();
	});

	// caption color
	let captionColorLabel = createP('Caption Text Color');
	captionColorLabel.addClass('label');
	captionColorLabel.parent(block4);
	captionColorPicker = createColorPicker(captionTextColor);
	captionColorPicker.parent(block4);
	captionColorPicker.addClass('colorpicker');

	captionColorPicker.input(() => {
		captionTextColor = captionColorPicker.value();
	});

	// bg color
	let bgColorLabel = createP('Background Color');
	bgColorLabel.addClass('label');
	bgColorLabel.parent(block2);
	bgColorPicker = createColorPicker(bgColor);
	bgColorPicker.parent(block2);
	bgColorPicker.addClass('colorpicker');

	bgColorPicker.input(() => {
		bgColor = bgColorPicker.value();
	});
  }


// Position Controls
  function createPositionControls(parent) {

	createElement('h3', 'Positions').parent(parent).addClass('tab-label');

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
  

// Message Controls
  function createMessageControls(parent) {

	createElement('h3', 'Message').parent(parent).addClass('tab-label');

	let inputRow = createDiv();
	inputRow.parent(parent);
	inputRow.addClass('input-row');

	let messageBlock = createDiv();
	messageBlock.parent(parent);
	messageBlock.addClass('message-block');

	let toLabel = createP("To");
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

	  let fromLabel = createP("From");
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


	let messageLabel = createP("Message");
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


// Final Controls
function createFinalControls(parent) {
	const isMobile = windowWidth < 600;

	const wrapper = createDiv().addClass('final-columns').parent(parent);

	// send design
	const leftCol = createDiv().addClass('final-column').parent(wrapper);

	createElement('h2', 'Time to send!').parent(leftCol);
	createP('You can preview your card just like your recipient will see it. A unique link will be generated for you to share.').parent(leftCol);

	const viewBtn = createButton('Open Recipient View');
	viewBtn.addClass('button');
	viewBtn.parent(leftCol);
	viewBtn.mousePressed(() => openRecipientViewLink());

	const copyBtn = createButton('Copy Link');
	copyBtn.addClass('button');
	copyBtn.parent(leftCol);
	copyBtn.mousePressed(() => {
		drawInsideCanvas();
		const cardData = {
			coverImage: canvas.elt.toDataURL("image/png"),
			insideImage: insideCanvas.canvas.toDataURL("image/png"),
			bgColor
		};
		saveCardToFirestore(cardData, (shareURL) => {
			navigator.clipboard.writeText(shareURL).then(() => {
				copyStatus.show();
				setTimeout(() => copyStatus.hide(), 2000);
			});
		});
	});

	// save design
	const rightCol = createDiv().addClass('final-column').parent(wrapper);

	createElement('h2', '... or save your design!').parent(rightCol);
	createP('Want to make it extra special? Save your card as a PNG to print and give in person.').parent(rightCol);

	const saveBtn = createButton('Download Design');
	saveBtn.addClass('button');
	saveBtn.parent(rightCol);
	saveBtn.mousePressed(() => saveCanvas('greeting-card', 'png'));

	let saveInsideBtn = createButton('Download Message');
	saveInsideBtn.addClass('button');
	saveInsideBtn.parent(rightCol);
	// graphics behaves differently
	saveInsideBtn.mousePressed(() => {
		drawInsideCanvas();
		const link = document.createElement('a');
		link.download = 'greeting-card-message.png';
		link.href = insideCanvas.canvas.toDataURL('image/png');
		link.click();
	});
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
		// drawBorder();
		if (balloons.length === 0) {
		  generateBalloons(); 
		}
		drawScene(); 
		pop();
	  }

	  if (currentTheme === 'spring') {
		push();
		if (flowerPositions.length === 0) {
		  generateSpringFlowers();
		}
		drawSpringScene();
		pop();
	  }

	if (currentTheme === 'gamer') {
		drawGamerTheme();
	  }

	  if (currentTheme === 'default') {
		drawConfettiBackground();
	  }

	if (forceRedraw) {
		cx = [];
		cy = [];
		cratio = [];
		shearAngles = [];
		rectSettings = [];
		fontChoices = [];
		widther = 50;
		heighter = 100;
		glitch = random(0.3, 0.8);
	  
		// generate layout positions
		for (let i = 0; i < tagline.length; i++) {
		  if (currentLayout === 'wave') generateWave(i);
		  if (currentLayout === 'grid') generateGrid(i);
		  if (currentLayout === 'arc') generateArc(i);
		  if (currentLayout === 'waveStack') generateWaveStack(i);
		  if (currentLayout === 'maxFill') generateMaxFill(i);
	  
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
	  
	for (let i = 0; i < tagline.length; i++) mainText(tagline[i], i);
	pop();

	// caption text
		push();
		translate(captionX, captionY);
		fill(captionTextColor);

		if (captionFonts && captionFonts[currentTheme]) {
		textFont(captionFonts[currentTheme]);
		} else {
		textFont('Helvetica'); // fallback 
		}

		textSize(30);
		textLeading(20);
		textAlign(LEFT, TOP);
		text(captionText, 0, 0);
		pop();

}


/* ------------------------ MAIN TEXT LAYOUT STYLES ------------------------ */

// WAVE
function generateWave(index) {
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
function generateGrid(index) {
	let ratio = 1;
	let cols = 8;
	let spacing = 80;
let row = floor(index / cols);
let col = index % cols;

// let jitterX = random(-5, 5); 
// let jitterY = random(-5, 5);

cx.push(col * spacing);
cy.push(row * spacing);

	cratio.push(ratio);
}

// WAVESTACK
function generateWaveStack(index) {
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
function generateMaxFill(index) {
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


// ARC
function generateArc(index) {
	let total = tagline.length;
	let angle = map(index, 0, total - 1, -PI / 2, PI / 2);
	let radius = 150 + random(-10, 10);

	let x = cos(angle) * radius;
	let y = sin(angle) * radius + random(-10, 10); 

	cx.push(x);
	cy.push(y);
	cratio.push(1.2);
}


/* ------------------------ LETTER SHAPE STYLES ------------------------ */

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
	  rect(-35, -35, 70, 70, 2);
	}
  
	else if (shapeType === 'gift') {
	  rect(0, 0, 60, 60, 8);
	  stroke(255);
	  strokeWeight(2);
	  line(20 - 30, -20, 20 + 30, -20); // horizontal ribbon
	  line(20, -50, 20, 10);            // vertical ribbon
	}

	else if (shapeType === 'diamond') {
		push();
		translate(-40, -35);
		// scale(0.5); 
		drawBlob(80); 
		pop();
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
  
  
  function mainText(texter, index) {
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


// -----FIREBASE-----
// I referred to an "Intro to Firebase" guide from an elective last year + asked ChatGPT to help me set up and troubleshoot this function, especially with the syntax. I used Firebase once before so I'm not super familiar with it and needed a refresher
// I created a Firestore Database on my personal Google account and linked it to this project. Then I authorized my Github domain. When a card is finished, the design is saved to Firestore and a unique link is generated. This link leads to a recipient view where the card can be opened and interacted with. 
// Previously, the recipient view opened a new page directly from the generator, but the link wasn't shareable because the card data wasn't saved anywhere. So, you were initially be able to see the card in recipient.html, but if you copy+pasted and sent the link to someone, they wouldn't be able to see the design you just made. Firebase allows actual link sharing now :)

function saveCardToFirestore(cardData, callback) {
	const docRef = db.collection("cards").doc(); // auto ID

	docRef.set(cardData).then(() => {
		// automatically detects subfolder. I looked this up so I could test with my live server instead of directly plugging in my github url
		const basePath = window.location.pathname.split('/').slice(0, -1).join('/');
		const shareURL = `${window.location.origin}${basePath}/recipient.html?id=${docRef.id}`;

		//(still needed to open new tab etc.)
		callback(shareURL);

		// copy to clipboard + show toast
		navigator.clipboard.writeText(shareURL).then(() => {
			showCopiedToast();
		});
	}).catch(console.error);
}

// Link copied!
function showCopiedToast() {
	const toast = document.createElement("div");
	toast.classList.add("toast");
	toast.textContent = "Link copied!";
	document.body.appendChild(toast);

	// have to add this for it to work lol so annoying
	setTimeout(() => {
		toast.classList.add("show");
	}, 10); 

	setTimeout(() => {
		toast.classList.remove("show");
		setTimeout(() => toast.remove(), 300); 
	}, 2000);
}


  function getCanvasImage() {
	return canvas.toDataURL('image/png');
  }


  function openRecipientViewLink() {
	drawInsideCanvas();

	const coverImage = canvas.elt.toDataURL("image/png");
	const insideImage = insideCanvas.canvas.toDataURL("image/png");

	const cardData = { coverImage, insideImage, bgColor };

	console.log("current bgColor:", bgColor);
	console.log("saving card data to firestore:", cardData);


	saveCardToFirestore(cardData, (shareURL) => {
		console.log("card saved! yippee! opening:", shareURL);
		window.open(shareURL, "_blank");
	});
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
  
  
  