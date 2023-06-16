window.addEventListener("keydown", function (evt) {
	if (evt.key == "b")
		changeScene("mars-base");
})

// event listener stays attached after scene changes.

// add a navigation menu

$("<div>Base</div>")
.on("click", function () {
	changeScene("mars-base");
})
.appendTo("#nav");

$("<div>Mars Map</div>")
.on("click", function () {
	changeScene("mars-map");
})
.appendTo("#nav");

$("<div>Inventory</div>")
.on("click", function () {
	changeScene("inventory");
})
.appendTo("#nav");
