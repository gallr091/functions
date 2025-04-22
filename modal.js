window.addEventListener("load", () => {
	const welcomeModal = document.getElementById("welcome-modal");
	const exportModal = document.getElementById("final-modal");

	const closeWelcomeBtn = document.querySelector("#welcome-modal .close-button");
	const closeExportBtn = document.getElementById("close-export-btn");

	const openWelcomeBtn = document.getElementById("open-modal-btn");
	const openExportBtn = document.getElementById("open-export-btn");

	// intro modal
	welcomeModal.style.display = "block";
	closeWelcomeBtn.onclick = () => welcomeModal.style.display = "none";
	openWelcomeBtn.onclick = () => welcomeModal.style.display = "block";

	// export modal
	openExportBtn.onclick = () => exportModal.style.display = "block";
	closeExportBtn.onclick = () => exportModal.style.display = "none";

	// close
	window.onclick = (event) => {
		if (event.target === welcomeModal) welcomeModal.style.display = "none";
		if (event.target === exportModal) exportModal.style.display = "none";
	};
});
