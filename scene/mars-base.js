window.addEventListener("keydown", function (evt) {
	if (evt.key == "b")
		changeScene("mars-base");
})

// event listener stays attached after scene changes.
