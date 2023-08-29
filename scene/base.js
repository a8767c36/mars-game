window.addEventListener("keydown", function (evt) {
	if (evt.key == "b")
		changeScene("mars-base");
})

// event listener stays attached after scene changes.

// add a navigation menu

$("#nav").append(
	$('<div><a href="#base"     > Base      </a></div>'),
	$('<div><a href="#map"      > Mars Map  </a></div>'),
	$('<div><a href="#inventory"> Inventory </a></div>')
);

