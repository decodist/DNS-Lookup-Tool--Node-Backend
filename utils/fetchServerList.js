let USserverList = [
	['USA', 'Mountain View, California', 'Google', '8.8.8.8', '37.386051,-122.083855'],
	['USA', 'Berkeley, California', 'Quad9', '9.9.9.9', '37.8715,122.2730'],
	['USA', 'New York City, New York', 'Digital Ocean', '162.243.19.47', '40.7128,74.0060'],
	['USA', 'Brooklyn, New York', 'Verizon', '98.113.146.9', '40.6782,73.9442']
];

let AUserverList = [
	['AUS', 'Sydney, New South Wales', 'TEFINCOM', '103.86.96.100', '33.8688,151.2093'],
	['AUS', 'Sydney, New South Wales', 'Telstra', '61.8.0.113', '33.8688,151.2093']
];

let NZserverList = [
	['NZ', 'Auckland', 'ICONZ Ltd', '210.48.77.69', '36.8509,174.7645'],
	['NZ', 'Auckland', 'Fusion Networks', '27.123.22.82', '36.8509,174.7645']
];

let UKserverList = [
	['UK', 'Manchester, England', 'M247 Ltd', '194.187.251.67', '53.4808,2.2426'],
	['UK', 'Exeter, England', 'South West Communications Group Ltd', '81.17.66.13', '50.7260,3.5275']
];

function getRandomLocationServer(location) {
	let dnsServer = [];
	if (location === 'US') {
		dnsServer.push(USserverList[USserverList.length * Math.random() | 0]);
	} else if (location === 'AU') {
		dnsServer.push(AUserverList[AUserverList.length * Math.random() | 0]);
	} else if (location === 'NZ') {
		dnsServer.push(NZserverList[NZserverList.length * Math.random() | 0]);
	} else if (location === 'UK') {
		dnsServer.push(UKserverList[UKserverList.length * Math.random() | 0]);
	}
	console.log("dnsServer chosen="+dnsServer);
	return dnsServer;
}

module.exports = { getRandomLocationServer };