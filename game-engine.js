
async function changeScene(name) {
	// load the html
	var html = await fetch(`/scene/${name}.html`)
	.then(response => {
		if (response.ok) return response.text();
		throw new Error("fetch failed", response.err);
	})
	document.querySelector("body").innerHTML = html;

	// load the javascript
	try{
	module = await import(`/scene/${name}.js`);
	// import module should do only initialization
	// and have no side effects.
	module.show();
	} catch(e) { }
	// if this fails, it throws. doesn't matter.
}

changeScene("main")

window.changeScene = changeScene;


