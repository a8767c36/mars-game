
export const map = { };
map["0,0"] = "garden";
map["1,0"] = "garden";
map["2,0"] = "garden";

const cost = {
	"water-tank": {
		"bricks": 20,
		"plastics": 10,
	},
};

export
async function show () {
	// ctx is the canvas context.
	var ctx = $("#mars-map")[0].getContext("2d");

	// draw the background.
	drawBackground();

	// draw the biomes.
	drawBiomes();

	// hide over view
	$("#over").css("display", "none");
	$("#close").on("click", function() {
		changeScene("mars-map");
	})

	// install the onclick handler
	var r = null;
	var biome = null;

	$(ctx.canvas).on("click", function (e) {
		// first, find out the biome that was clicked on.
		var offX  = (e.offsetX || e.pageX - $(e.target).offset().left);
		var offY  = (e.offsetY || e.pageY - $(e.target).offset().top );
		var {width, height} = e.target.getBoundingClientRect();
		var i = Math.floor(offX / width  * 4);
		var j = Math.floor(offY / height * 4);
		console.log("i j", i, j);
		r = `${i},${j}`;
		biome = map[r];

		// highlight the chosen biome a bit.
		drawBackground();
		drawBiomes();
		ctx.strokeRect(160*i + 2, 160*j + 2, 156, 156);

		// display information about the biome.
		// in a modal window
		$("#over")
			.css("display", "block");
		$("#info")
			.html(`Ort: ${r}\nBiome: ${biome || "Empty"}\n\n&nbsp;`);
		if (biome) {
			$('#build')
				.css("display", "none");
			$('#reset')
				.css("display", "block")
				.on("click", function() {

				});
		} else {
			$('#reset')
				.css("display", "none");
			$('#build')
				.css("display", "block")
		}
	})
	// install onclick handlers for the over view
	$("#reset").on("click", function() {
		if (confirm("Reset biome?"))
			map[r] = null;
			changeScene("mars-map");
	})
	$("#build select").on("change", function(e) {
		console.log("Change", e.target.value);
		$("#build-cost").text(`Will cost:\n`);
		var c = cost[e.target.value] || { };
		for (let i in c) {
			$("#build-cost").append(`${i}: ${c[i]}\n`);
		}
	});
	$("#build input[type=button]").on("click", function() {
		var biome = $("#build select").val();
		console.log("Selected value:", biome);
		map[r] = biome;
		changeScene("mars-map");
	});
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
	"water-tank": "/scene/map-water-tank-1.png",
	"garden"     : "/scene/map-garden.png",
	"human-house": "/scene/map-human-house-1.jpeg",
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
