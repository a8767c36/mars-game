import { map } from '/scene/map.js';

map["1,1"] = "energy";

console.log("map", map);

export function show () {
	// count how many are energy
	var count = 0;
	for (let x of Object.values(map)) {
		if (x == "energy") count++;
	}

	$("#count").text(count);
}

