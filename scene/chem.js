
export
const data = {
	h2: 1,
	gas: 1,
}

const shelf = data;

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
}

