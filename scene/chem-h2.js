
import {data as lager} from '/scene/chem.js';

export
let enabled = 0;

export
function show () {
	$("#enabled")[0].onchange = function (evt) {
		enabled = evt.target.checked;
	}
}

lager.wabada = 1;

console.log("lager:");
console.log(lager.wabada);
console.log(lager.h2);


