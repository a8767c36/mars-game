import {backgroundImage} from '/scene/map.js';

// no initialization code

let canvas = null;
let ctx = null;

// racing variables
let x = 240;
let y = 240;
let phase = 0;
let v = 0;
let t = 0;
const cos = Math.cos;
const sin = Math.sin;
const PI  = Math.PI ;

export
function show () {
	canvas = $("#race")[0];

	canvas.focus();
	canvas.onkeydown = function (evt) {
		// console.log("canvas keydown", evt.key);
		if (evt.key == "ArrowUp") v = v + 15;
		if (evt.key == "ArrowDown") v = v - 15;
		if (evt.key == "ArrowRight") phase = phase + 15/360*2*PI;
		if (evt.key == "ArrowLeft") phase = phase - 15/360*2*PI;

		if (v < 30) v = 30;
		if (v > 120) v = 120;
		// console.log("v", v, "phase", phase);
	};

	ctx = canvas.getContext("2d");
	// start animating, automatically stops
	requestAnimationFrame(function (ms) {
		t = ms;
		v = 0;
		animate(ms);
	})
}

function animate (ms) {
	if (canvas.parentElement == null) return;
	console.log("animate race");

	ctx.clearRect(0, 0, 512, 512);
	ctx.drawImage(backgroundImage, 0, 0);

	let dt = (ms - t)/1000;
	t = ms;
	x = x + dt*v*cos(phase);
	y = y + dt*v*sin(phase);
	if (x < 0) x = 0;
	if (x > 512) x = 512;
	if (y < 0) y = 0;
	if (y > 512) y = 512;
	if (v < 0) v = 0;

	//ctx.fillCircle(x, y, 5);
	ctx.beginPath();
	ctx.arc(x, y, 5, 0, 2*PI, false);
	ctx.fillStyle = "red";
	ctx.fill();

	//ctx.drawArrow(v*cos(phase), v*sin(phase));
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + v*cos(phase), y + v*sin(phase));
	ctx.strokeStyle = "cyan";
	ctx.stroke();

	requestAnimationFrame(animate);
}

