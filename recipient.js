function setupCard(image) {
	if (!image) return;
  
	document.getElementById('card-front').style.backgroundImage = `url(${image})`;
	document.getElementById('card-back').style.backgroundImage = `url(${image})`;
  }
  
  function flipCard() {
	document.getElementById('card').classList.toggle('flipped');
  }
  
  window.addEventListener("message", (event) => {
	if (event.data?.type === "cardDesign") {
	  setupCard(event.data.data);
	}
  });
  

// let params;

// function getQueryParams() {
// 	const query = new URLSearchParams(window.location.search);
// 	return {
// 		text: query.get('text') || 'Default Text',
// 		caption: query.get('caption') || 'Default Caption',
// 		theme: query.get('theme') || 'default',
// 		layout: query.get('layout') || 'default',
// 		bgColor: query.get('bgColor') || '#FFFFFF',
// 		mainTextColor: query.get('mainTextColor') || '#000000',
// 		captionTextColor: query.get('captionTextColor') || '#000000',
// 		rectColor: query.get('rectColor') || '#CCCCCC',
// 		mainX: parseInt(query.get('mainX')) || 60,
// 		mainY: parseInt(query.get('mainY')) || 150,
// 		captionX: parseInt(query.get('captionX')) || 60,
// 		captionY: parseInt(query.get('captionY')) || 100
// 	};
// }


// function setup() {
// 	params = getQueryParams();
  
// 	let cover = createCanvas(707, 500);
// 	cover.parent('coverCanvas');
// 	drawCover();
  
// 	let content = createGraphics(707, 500);
// 	content.background(params.rectColor);
// 	content.fill(params.captionTextColor);
// 	content.textAlign(CENTER, CENTER);
// 	content.textSize(24);
// 	content.text(params.caption, content.width / 2, content.height / 2);
  
// 	let img = createImg(content.canvas.toDataURL(), "card message");
// 	img.parent('contentCanvas');
// 	img.style('width', '100%');
// 	img.style('height', '100%');
// 	img.style('object-fit', 'cover');
//   }
  
  

// function mousePressed() {
// 	document.getElementById('card').classList.toggle('flipped');
// }

// function drawCover() {
// 	background(params.bgColor);
// 	fill(params.mainTextColor);
// 	textSize(32);
// 	textAlign(CENTER, CENTER);
// 	text(params.text, width / 2, height / 2);

// 	textSize(14);
// 	fill(100);
// 	text("Click to open", width / 2, height - 30);
// }

// function drawContent() {
// 	background(params.rectColor);
// 	fill(params.captionTextColor);
// 	textSize(24);
// 	textAlign(CENTER, CENTER);
// 	text(params.caption, width / 2, height / 2);
// }
