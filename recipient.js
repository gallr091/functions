// --- Card rendering ---
function setupCard(data) {
	if (!data || !data.coverImage || !data.insideImage) return;

	const cardFront = document.getElementById('card-front');
	const cardInside = document.getElementById('card-inside');

	// front + inside bg images
	cardFront.style.backgroundImage = `url(${data.coverImage})`;
	cardInside.style.backgroundImage = `url(${data.insideImage})`;

	// for toggling
	cardFront.dataset.coverImage = data.coverImage;

	// thank god its working now
	cardFront.dataset.bgColor = data.bgColor;
	// cardFront.style.background = `url(${data.bgColor})`;

}


function flipCard() {
	const card = document.getElementById('card');
	const cardFront = document.getElementById('card-front');

	card.classList.toggle('flipped');
	spawnConfetti();

	// If flipped, remove image and set color
	if (card.classList.contains('flipped')) {
		cardFront.style.backgroundImage = 'none';
		cardFront.style.backgroundColor = cardFront.dataset.bgColor;
	} else {
		// If unflipped, restore the image
		cardFront.style.backgroundImage = `url(${cardFront.dataset.coverImage})`;
		cardFront.style.backgroundColor = 'transparent';
	}
}


// --- Handle postMessage (live preview from generator) ---
window.addEventListener("message", (event) => {
	if (event.data?.type === "cardDesign") {
		setupCard(event.data.data);
	}
});

// --- If URL contains a Firestore ID, load from Firebase ---
function getQueryParam(param) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(param);
}

const cardId = getQueryParam('id');

if (cardId) {
	// Firebase config
	const firebaseConfig = {
		apiKey: "AIzaSyBf_G-TH7jcRRCN5--3yqIqNSsbbJjPoe8",
		authDomain: "greeting-card-functions.firebaseapp.com",
		projectId: "greeting-card-functions",
		storageBucket: "greeting-card-functions.firebasestorage.app",
		messagingSenderId: "360726857379",
		appId: "1:360726857379:web:6ebdd96c0f3675e5f16116"
		};
  
	firebase.initializeApp(firebaseConfig);
	const db = firebase.firestore();

	db.collection("cards").doc(cardId).get().then(doc => {
		if (doc.exists) {
			setupCard(doc.data());
		} else {
			document.body.innerHTML = "<h2>Card not found 😢</h2>";
		}
	}).catch(error => {
		console.error("Error loading card:", error);
		document.body.innerHTML = "<h2>Error loading card.</h2>";
	});
}

function spawnConfetti() {
	const container = document.getElementById('confetti-container');
	for (let i = 0; i < 20; i++) {
		const confetti = document.createElement('div');
		confetti.classList.add('confetti');

		// square
		if (Math.random() < 0.5) {
			confetti.classList.add('square');
		}

		confetti.style.left = `${Math.random() * 100}%`;
		confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
		confetti.style.animationDuration = `${0.8 + Math.random()}s`;
		container.appendChild(confetti);

		setTimeout(() => confetti.remove(), 1500);
	}
}






// MAIN FUNCTION PRE 04/22
// function setupCard(data) {
// 	if (!data || !data.coverImage || !data.insideImage) return;
  
// 	document.getElementById('card-front').style.backgroundImage = `url(${data.coverImage})`;
// 	document.getElementById('card-inside').style.backgroundImage = `url(${data.insideImage})`;
//   }
  
//   function flipCard() {
// 	document.getElementById('card').classList.toggle('flipped');
//   }
  
//   window.addEventListener("message", (event) => {
// 	if (event.data?.type === "cardDesign") {
// 	  setupCard(event.data.data);
// 	}
//   });
  





// meh
  // function setupCard(image) {
// 	if (!image) return;
  
// 	document.getElementById('card-front').style.backgroundImage = `url(${image})`;
// 	document.getElementById('card-back').style.backgroundImage = `url(${image})`;
//   }
  
//   function flipCard() {
// 	document.getElementById('card').classList.toggle('flipped');
//   }
  
//   window.addEventListener("message", (event) => {
// 	if (event.data?.type === "cardDesign") {
// 	  setupCard(event.data.data);
// 	}
//   });
  

  
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
