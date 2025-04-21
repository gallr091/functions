window.addEventListener("load", () => {
	const modal = document.getElementById("welcome-modal");
	const closeBtn = document.querySelector(".close-button");
	const openBtn = document.getElementById("open-modal-btn");
  
	modal.style.display = "block";
  
	closeBtn.onclick = () => {
	  modal.style.display = "none";
	};
  
	openBtn.onclick = () => {
	  modal.style.display = "block";
	};
  
	window.onclick = (event) => {
	  if (event.target === modal) {
		modal.style.display = "none";
	  }
	};
  });
  