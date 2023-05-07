window.addEventListener("keydown", function (evt) {
	if (evt.key == "u")
		changeScene("inventory");
})

// event listener stays attached after scene changes.


export
const seeds = { };
seeds.tomatoes = 5
seeds.salad = 20
seeds.corn = 50
seeds.pumpkin = 30

import("/scene/inventory.js").then(m => window.inventory = m)

