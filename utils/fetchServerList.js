let USserverList = [
	['USA', 'Mountain View, California', 'Google', '8.8.8.8'],
	['USA', 'Berkeley, California', 'Quad9', '9.9.9.9'],
	['USA', 'New York City, New York', 'Digital Ocean', '162.243.19.47']
];

let AUserverList = [
	['AUS', 'Sydney, New South Wales', 'TEFINCOM', '103.86.96.100'],
	['AUS', 'Sydney, New South Wales', 'Telstra', '61.8.0.113']
];



function getRandomLocationServer(location) {
	let dnsServer = [];
	if (location === 'US') {
		dnsServer.push(USserverList[USserverList.length * Math.random() | 0]);
	} else if (location === 'AU') {
		dnsServer.push(AUserverList[AUserverList.length * Math.random() | 0]);
	}
	console.log("dnsServer chosen="+dnsServer);
	return dnsServer;
}

module.exports = { getRandomLocationServer };