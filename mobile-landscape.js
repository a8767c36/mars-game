
// if the device is a mobile device,
// then it should automatically rotate to landscape mode.

// if the device is a desktop device, then do nothing.
// otherwise, do nothing.

// more accurately, it's "landscape" vs "portrait" mode.

window.addEventListener("click", async function () {
	// if on mobile device, then go fullscreen.
	// we need to be fullscreen to change the orientation.
	if (screen.orientation.type.startsWith("portrait"))
		await document.body.requestFullscreen();
	await screen.orientation.lock("landscape");
})
