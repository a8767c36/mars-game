
export const map = { };
map["0,0"] = "garden";
map["0,1"] = "garden";
map["0,2"] = "garden";

export
async function show () {
	// ctx is the canvas context.
	var ctx = $("#mars-map")[0].getContext("2d");

	// draw the background.
	drawBackground();

	// draw the biomes.
	drawBiomes();

	// install the onclick handler
	$(ctx.canvas).on("click", function (e) {
		// first, find out the biome that was clicked on.
		var offX  = (e.offsetX || e.pageX - $(e.target).offset().left);
		var offY  = (e.offsetY || e.pageY - $(e.target).offset().top );
		var {width, height} = e.target.getBoundingClientRect();
		var i = Math.floor(offX / width  * 4);
		var j = Math.floor(offY / height * 4);
		console.log("i j", i, j);

		// highlight the chosen biome a bit.
		drawBackground();
		drawBiomes();
		ctx.strokeRect(160*i + 2, 160*j + 2, 156, 156);

		// display information about the biome.
	})
}

function drawBackground() {
	var ctx = $("#mars-map")[0].getContext("2d");
	ctx.canvas.width  = 640;
	ctx.canvas.height = 640;
	ctx.clearRect(0, 0, 640, 640);
	ctx.fillStyle = "#945717";
	ctx.fillRect(0, 0, 640, 640);
}

const css_images = {
	garden: "/scene/map-garden.png",
};

const css_image_cache = { };
await Promise.all(Object.keys(css_images).map(key => new Promise((f, r) =>
	$(`<img src="${css_images[key]}">`).on("load", function () {
		css_image_cache[key] = this;
		f();
	})
)));

function drawBiomes() {
	var ctx = $("#mars-map")[0].getContext("2d");
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			ctx.strokeRect(160*i, 160*j, 160, 160);
			var key = `${i},${j}`;
			var biome = null;
			var img = null;
			if (key in map) biome = map[key];
			if (biome in css_image_cache) img = css_image_cache[biome];
			if (img) ctx.drawImage(img, 160*i + 2, 160*j + 2, 156, 156);
		}
	}
}
