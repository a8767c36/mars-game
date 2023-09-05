window.addEventListener("keydown", function (evt) {
	if (evt.key == "b")
		changeScene("base");
})

// event listener stays attached after scene changes.

// add a navigation menu
// make the navigation menu visible again

$("#sidebar").css("visibility", "visible");

$("#nav").append(
	$('<div><a href="#map"      > Mars Map  </a></div>'),
	$('<div><a href="#base"     > Base      </a></div>'),
	$('<div><a href="#inventory"> Inventory </a></div>')
);

