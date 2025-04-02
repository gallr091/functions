document.addEventListener("DOMContentLoaded", function () {
	const quizContainer = document.getElementById("quiz");
	const resultContainer = document.getElementById("result");
	const nudgeButton = document.getElementById("nudgeSender");

	let quizData = null;
	let answers = [];

	async function loadQuizData() {
		try {
			const response = await fetch("quizdata.json");
			quizData = await response.json();
			renderQuiz();
		} catch (error) {
			console.error("Error loading quiz data:", error);
			quizContainer.innerHTML = "<p>Failed to load quiz. Please try again.</p>";
		}
	}

	function renderQuiz() {
		if (!quizData) return;

		quizContainer.innerHTML = ""; // Clear previous content
		answers = new Array(quizData.questions.length).fill(null); 

		quizData.questions.forEach((q, index) => {
			const questionDiv = document.createElement("div");
			questionDiv.classList.add("question-block");
			questionDiv.innerHTML = `<p><strong>${q.question}</strong></p>`;

			q.options.forEach(option => {
				const button = document.createElement("button");
				button.textContent = option;
				button.onclick = () => selectAnswer(index, option);
				questionDiv.appendChild(button);
			});

			quizContainer.appendChild(questionDiv);
		});
	}

	function selectAnswer(index, option) {
		answers[index] = option;

		if (!answers.includes(null)) {
			determineGiftCard();
		}
	}

	function determineGiftCard() {
		const frequency = {};

		answers.forEach(answer => {
			Object.keys(quizData.giftCards).forEach(category => {
				if (answer.includes(category)) {
					frequency[category] = (frequency[category] || 0) + 1;
				}
			});
		});

		const selectedCategory = Object.keys(frequency).reduce((a, b) =>
			frequency[a] > frequency[b] ? a : b
		);

		const selectedGiftCard = quizData.giftCards[selectedCategory] || "Amazon Gift Card";

		resultContainer.innerHTML = `<p>You got: <strong>${selectedGiftCard}</strong>!</p>`;
		nudgeButton.style.display = "block";
		nudgeButton.onclick = () => nudgeSender(selectedGiftCard);
	}

	function nudgeSender(giftCard) {
		alert(`Notifying sender: The recipient got a ${giftCard}!`);
	}

	loadQuizData(); // Load JSON data when page loads
});