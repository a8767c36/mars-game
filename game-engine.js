
window.changeScene = changeScene;
changeScene(location.hash ? location.hash.slice(1) : "herz")

async function changeScene(name) {
	location.hash = name;
	$("#change-scene-sound")[0].play();

	// load the html
	try {
		var html = await
		fetch(`/scene/${name}.html`)
		.then(response => {
			if (response.ok) return response;
			throw new Error("fetch failed", response.err);
		})
		.catch(err => fetch(`/scene/${name}/index.html`))
		.then(response => {
			if (response.ok) return response;
			throw new Error("fetch failed", response.err);
		})
		.then(response => response.text())
		;

		document.querySelector("body #scene").innerHTML = html;
	} catch (err) {
		console.warn(err);
	}

	// load the javascript
	try{
	var module = await import(`/scene/${name}.js`);
	// import module should do only initialization
	// and have no side effects.
	await module.show();
	} catch(e) { console.warn(e) }
	// if this fails, it throws. doesn't matter.
}

window.onhashchange = function () {
	console.log("Hash changed");
	var hash = location.hash.slice(1);
	// remote the leading "#"
	changeScene(hash);
}
