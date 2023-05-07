// variables that keep track of what grows here...

// units: man-days
export const plants = { };
let p = plants;
p.wheat = 0;
p.corn = 0
p.salad = 5

const css_images = {
	salad   : "/scene/garden-salad.png",
	wheat   : "/scene/garden-wheat.png",
	tomatoes: "/scene/garden-tomatoes.png",
};

export
async function show () {
	// plants
	var ul = document.querySelector("#garden");
	for (let f in p) {
		$(ul).append(
			$('<div class="item">')
			.addClass(p[f] ? "clickable" : '')
			.css("background-image", `url("${css_images[f]}")`)
			.text(` ${f}: ${p[f] ? p[f] + ' man-days' : 'none'}`)
			.on("click", p[f] ? function () {
				if (p[f] > 0) {
					p[f]--;
					if (!(f in inventory.foods)) inventory.foods[f] = 0;
					inventory.foods[f]++;
				}
				changeScene("garden")
			} : null)
		);
	}

	// seeds
	if (! window.inventory) window.inventory = await import("/scene/inventory.js");
	ul = document.querySelector("#seeds");
	console.log(ul)
	var s = window.inventory.seeds || { };
	for (let f in s) {
		console.log(f)
		$(ul).append($('<div>')
		.text(` ${f}: ${s[f] ? s[f] + ' pc' : 'none'} `)
		.append(s[f] ? `<button onclick="garden.plant('${f}', 1)"> plant</button>` : '')
		)
	}
}

// offer the option to plant something
// takes seeds and space
// you can increase the size of the garden
// by going to the map, clicking on an unused space
// and assigning it to be a garden.

import("/scene/garden.js").then(m => window.garden = m)

export
function plant (type, mass) {
	console.log("Planting", type, mass)
	// ...
	if (inventory.seeds[type] > 0) {
		inventory.seeds[type]--;
		if (!(type in plants)) plants[type] = 0;
		plants[type]++;
		changeScene("garden")
	}
}

/*
maybe later, there comes a penalty if you
place everything too close together, because
you will need that space later to erect buildings.
having these buildings further away would increase
transportation time.
you will be able to re-assign spaces.
but that takes construction time.
*/
