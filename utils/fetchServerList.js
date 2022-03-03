let serverList = [
	'162.243.19.47', //this
	'9.9.9.9', //that
	'149.112.112.112',
	'8.8.8.8'
];

/*

let serverList = [
	['USA', 'Mountain View, California', 'Google', '8.8.8.8'],
	['USA', 'Berkeley, California', 'Quad9', '9.9.9.9'],
];



 */


function getRandomServerSet() {
	let serverSet = [];
	serverSet.push(serverList[serverList.length * Math.random() | 0]);
	serverSet.push(serverList[serverList.length * Math.random() | 0]);
	console.log("set="+serverSet);
	return serverSet;
}

module.exports = { getRandomServerSet };