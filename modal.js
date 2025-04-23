window.addEventListener("load", () => {
	const welcomeModal = document.getElementById("welcome-modal");
	const exportModal = document.getElementById("final-modal");

	const closeWelcomeBtn = document.querySelector("#welcome-modal .close-button");
	const closeExportBtn = document.getElementById("close-export-btn");

	const openWelcomeBtn = document.getElementById("open-modal-btn");
	const openExportBtn = document.getElementById("open-export-btn");

	// bounce in
	function openModal(modal) {
		modal.style.display = "block";
		requestAnimationFrame(() => {
			modal.classList.add("show");
			modal.classList.remove("hide");
		});
	}

	// bounce out
	function closeModal(modal) {
		modal.classList.add("hide");
		modal.classList.remove("show");

		const content = modal.querySelector('.modal-content');
		content.addEventListener('animationend', () => {
			modal.style.display = "none";
			modal.classList.remove("hide");
		}, { once: true });
	}

	// on load
	openModal(welcomeModal);

	// buttons
	openWelcomeBtn.onclick = () => openModal(welcomeModal);
	openExportBtn.onclick = () => openModal(exportModal);

	closeWelcomeBtn.onclick = () => closeModal(welcomeModal);
	closeExportBtn.onclick = () => closeModal(exportModal);

	// click outside to close
	window.onclick = (event) => {
		if (event.target === welcomeModal) closeModal(welcomeModal);
		if (event.target === exportModal) closeModal(exportModal);
	};
});
