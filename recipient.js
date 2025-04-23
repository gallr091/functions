// render the card
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

	if (card.classList.contains('flipped')) {
		cardFront.style.backgroundImage = 'none';
		cardFront.style.backgroundColor = cardFront.dataset.bgColor;
	} else {
		cardFront.style.backgroundImage = `url(${cardFront.dataset.coverImage})`;
		cardFront.style.backgroundColor = 'transparent';
	}
}


// postMessage (live preview from generator) 
window.addEventListener("message", (event) => {
	if (event.data?.type === "cardDesign") {
		setupCard(event.data.data);
	}
});

// if URL contains a firestore ID, load from firebase 
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
		if (Math.random() < 0.6) {
			confetti.classList.add('square');
		}

		confetti.style.marginTop = '10rem';
		confetti.style.left = `${Math.random() * 100}%`;
		confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
		confetti.style.animationDuration = `${0.8 + Math.random()}s`;
		container.appendChild(confetti);

		setTimeout(() => confetti.remove(), 1500);
	}
}
