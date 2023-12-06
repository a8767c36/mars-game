
import("./traktor.js").then(x => window.traktor = x);

let x = [0, 0];
let v = 0;
let phi = 0;

setInterval(function () {
	x[0] += 0.1*v*Math.cos(phi);
	x[1] += 0.1*v*Math.sin(phi);
}, 100);

let ctx_bg = null;
let ctx_fg = null;
export function show () {
	reset();

	let canvas_bg = $('#canvas-background')[0];
	canvas_bg.width  = 512;
	canvas_bg.height = 512;

	let canvas_fg = $('#canvas-foreground')[0];
	canvas_fg.width  = 512;
	canvas_fg.height = 512;
	canvas_fg.onkeydown = function (evt) {
		if (evt.key == "ArrowLeft" ) phi += Math.PI/4;
		if (evt.key == "ArrowRight") phi -= Math.PI/4;
		if (evt.key == "ArrowUp"   ) v += 1/4;
		if (evt.key == "ArrowDown" ) v -= 1/4;
		console.log(v, phi);
	}
	canvas_fg.tabIndex = 1;
	canvas_fg.focus();

	ctx_bg = canvas_bg.getContext("2d");
	// ctx_bg.transform(1, 0, 0, -1, 0, canvas_bg.height);

	ctx_bg.clearRect(0, 0, 512, 512);
	ctx_bg.fillStyle = "yellow";
	ctx_bg.fillRect(0, 0, 512, 512);

	ctx_fg = canvas_fg.getContext("2d");
	ctx_fg.transform(1, 0, 0, -1, 0, canvas_fg.height);
	render();
}

function render () {
	let ctx = ctx_fg;
	if (! ctx.canvas.parentElement) return;
	console.log("traktor rendering");

	ctx.clearRect(0, 0, 512, 512);

	// first, draw on the background
	// draw the harvested background
	ctx_bg.fillStyle = "brown";
	ctx_bg.beginPath();
	ctx_bg.moveTo(256 + x[0]*128 + Math.cos(phi)*20 - Math.sin(phi)*8,
	              256 + x[1]*128 + Math.sin(phi)*20 + Math.cos(phi)*8);
	ctx_bg.lineTo(256 + x[0]*128 + Math.cos(phi)* 0 - Math.sin(phi)*8,
	              256 + x[1]*128 + Math.sin(phi)* 0 + Math.cos(phi)*8);
	ctx_bg.lineTo(256 + x[0]*128 + Math.cos(phi)* 0 + Math.sin(phi)*8,
	              256 + x[1]*128 + Math.sin(phi)* 0 - Math.cos(phi)*8);
	ctx_bg.lineTo(256 + x[0]*128 + Math.cos(phi)*20 + Math.sin(phi)*8,
	              256 + x[1]*128 + Math.sin(phi)*20 - Math.cos(phi)*8);
	ctx_bg.lineTo(256 + x[0]*128 + Math.cos(phi)*20 - Math.sin(phi)*8,
	              256 + x[1]*128 + Math.sin(phi)*20 + Math.cos(phi)*8);
	ctx_bg.fill();

	// then, draw the background on the foreground
	ctx.drawImage(ctx_bg.canvas, 0, 0);

	// draw the tractor
	// traktor is a box 32*16, rotated

	// first, assume x and y are in reasonable bound
	/*
	ctx.strokeStyle = "black";
	ctx.strokeRect(256 + x[0] * 128 - 8, 256 + x[1] * 128 - 8, 16, 16);
	*/

	// draw the tractor outline
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.moveTo(256 + x[0]*128 + Math.cos(phi)*16 - Math.sin(phi)*8,
	           256 + x[1]*128 + Math.sin(phi)*16 + Math.cos(phi)*8);
	ctx.lineTo(256 + x[0]*128 - Math.cos(phi)*16 - Math.sin(phi)*8,
	           256 + x[1]*128 - Math.sin(phi)*16 + Math.cos(phi)*8);
	ctx.lineTo(256 + x[0]*128 - Math.cos(phi)*16 + Math.sin(phi)*8,
	           256 + x[1]*128 - Math.sin(phi)*16 - Math.cos(phi)*8);
	ctx.lineTo(256 + x[0]*128 + Math.cos(phi)*16 + Math.sin(phi)*8,
	           256 + x[1]*128 + Math.sin(phi)*16 - Math.cos(phi)*8);
	ctx.lineTo(256 + x[0]*128 + Math.cos(phi)*16 - Math.sin(phi)*8,
	           256 + x[1]*128 + Math.sin(phi)*16 + Math.cos(phi)*8);
	ctx.stroke();

	// drescher
	ctx.strokeStyle = "red";
	ctx.beginPath();
	ctx.moveTo(256 + x[0]*128 + Math.cos(phi)*18 - Math.sin(phi)*8,
	           256 + x[1]*128 + Math.sin(phi)*18 + Math.cos(phi)*8);
	ctx.lineTo(256 + x[0]*128 + Math.cos(phi)*18 + Math.sin(phi)*8,
	           256 + x[1]*128 + Math.sin(phi)*18 - Math.cos(phi)*8);
	ctx.stroke();

	// ...

	requestAnimationFrame(render);
}

export function reset () {
	x = [0, 0];
	v = 0;
	phi = 0;
}

export function setSpeed(newV) {
	v = newV;
}

export function brake () {
	v = 0;
}

function turnRight (angle) {
	phi -= angle;
}

