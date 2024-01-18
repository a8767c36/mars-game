
const shelf = {
	h2: 1,
	gas: 1,
};

export
const lager = shelf;

export
const ex = { };



export
function show () {
	// programmatische darstellung des lagers

	for (let div of $("#shelf .chem")) {
		let text = div.innerText;
		let cls  = $(div).data("chem");
		$(div).empty();
		$(div).append(
			$('<span class="icon"></span>').toggleClass("full", shelf[cls] ? true : false),
			$('<span class="desc"></span>').append(
				$('<span class="title"></span>').text(text),
				$('<span class="info"></span>').text(`Lagernd: ${shelf[cls] || 0} kg`)
			)
		);
	}

	for (let div of $("#dim .ex")) {
		let text = div.innerText;
		let cls  = $(div).data("ex");
		$(div).empty();
		$(div).append(
			$('<span class="icon"></span>').toggleClass("lit", ex[cls]?.enabled ? true : false),
			$('<span class="desc"></span>').append(
				$('<span class="title"></span>').text(text),
				$('<span class="info"></span>').text(ex[cls]?.enabled ? "Running" : "Stopped")
			)
		);
	}
}

