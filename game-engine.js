
async function changeScene(name) {
	location.hash = name;

	// load the html
	try {
	var html = await fetch(`/scene/${name}.html`)
	.then(response => {
		if (response.ok) return response.text();
		throw new Error("fetch failed", response.err);
	})
	document.querySelector("body #scene").innerHTML = html;
	} catch(e) { }

	// load the javascript
	try{
	var module = await import(`/scene/${name}.js`);
	// import module should do only initialization
	// and have no side effects.
	module.show();
	} catch(e) { console.warn(e) }
	// if this fails, it throws. doesn't matter.
}

window.onhashchange = function () {
	console.log("Hash changed");
	var hash = location.hash.slice(1);
	// remote the leading "#"
	changeScene(hash);
}

changeScene("base")

window.changeScene = changeScene;
