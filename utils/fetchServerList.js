// sets of public DNS servers in various locations
const USserverList = [
	['USA', 'Mountain View, California', 'Google', '8.8.8.8', '37.386051,-122.083855'],
	['USA', 'Berkeley, California', 'Quad9', '9.9.9.9', '37.8715,122.2730'],
	['USA', 'New York City, New York', 'Digital Ocean', '162.243.19.47', '40.7128,74.0060'],
	['USA', 'Brooklyn, New York', 'Verizon', '98.113.146.9', '40.6782,73.9442']
];
const AUserverList = [
	['AUS', 'Sydney, New South Wales', 'TEFINCOM', '103.86.96.100', '33.8688,151.2093'],
	['AUS', 'Templestowe, Victoria', 'Tafe', '192.232.128.21', ''],
	['AUS', 'Sydney, New South Wales', 'Telstra', '61.8.0.113', '33.8688,151.2093']
];
const NZserverList = [
	['NZ', 'Auckland', 'ICONZ Ltd', '210.48.77.69', '36.8509,174.7645'],
	['NZ', 'Wellington', 'VocusGroup', '121.98.232.9', '36.8509,174.7645'],
	['NZ', 'Auckland', 'Fusion Networks', '27.123.22.82', '36.8509,174.7645']
];
const UKserverList = [
	['UK', 'Manchester, England', 'M247 Ltd', '194.187.251.67', '53.4808,2.2426'],
	['UK', 'Exeter, England', 'South West Group', '81.17.66.13', '50.7260,3.5275']
];
const JPserverList = [
	['JP', 'Tokyo, Japan', 'Nifty', '202.248.20.133', ''],
	['JP', 'Osaka, Japan', 'Nifty', '122.215.69.149', ''],
	['JP', 'Mito, Japan', 'Tsukuba', '125.206.220.10', '']
];
const HKserverList = [
	['HK', 'Hong Kong, Hong Kong', 'Hong Kong Broadband Network Ltd', '59.148.213.230', ''],
	['HK', 'Tai Kok Tsui, Hong Kong', 'IMS', '210.87.250.154', ''],
	['HK', 'Hong Kong, Hong Kong', 'HKBN Enterprise Solutions', '202.130.97.66', '']
];
const TWserverList = [
	['TW', 'Taichung, Taiwan', 'HiNet', '60.249.37.54', ''],
	['TW', 'Kaohsiung City, Taiwan', 'HiNet', '59.120.244.149', ''],
	['TW', 'Taipei, Taiwan', 'Lianan', '61.222.14.170', '']
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
	} else if (location === 'JP') {
		dnsServer.push(JPserverList[JPserverList.length * Math.random() | 0]);
	} else if (location === 'HK') {
		dnsServer.push(HKserverList[HKserverList.length * Math.random() | 0]);
	} else if (location === 'TW') {
		dnsServer.push(TWserverList[TWserverList.length * Math.random() | 0]);
	}
	return dnsServer;
}

module.exports = { getRandomLocationServer };