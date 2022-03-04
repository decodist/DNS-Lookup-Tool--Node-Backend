// init ExpressJS
const express = require('express')
const app = express();
const port = 3000;
// init other modules
const bodyParser = require('body-parser');
const cors = require('cors');
//const https = require('https');
const path = require('path');
//const dns = require('dns');
const { Resolver } = require('dns').promises;

// use CORS
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// allow folder route for all public static assets
app.use(express.static('public'));

// make helper functions available
const servers = require("./utils/fetchServerList.js");

// GET home endpoint
app.get('/', (req, res) => {
	//todo send a dynamic security code as well
    res.sendFile(path.join(__dirname, '/public/dnslookup.html'));
});

//let dnsResults = [];
/*
function performLookup(domain, type, attempts=0) {
		let dnsResult = [];
		//get the set of dns servers to use
		let server = servers.getRandomServerSet();

		//create an object which contains all the async lookups
		let resolverCollection = {};

		//loop through each of the dns servers
		for (let index = 0; index < server.length; ++index) {
			let serverItem = [];
			serverItem.push(server[index]);

			//add a new resolver item to the container object
			resolverCollection['resolver' + index] = new Resolver;
			//set the dns server to use for the lookup
			resolverCollection['resolver' + index].setServers(serverItem);

			//run the lookup and return the results
			if (type === 'A') {
				resolverCollection['resolver' + index].resolve4(domain)
					.then( function(addresses) {
							//console.log('addresses='+addresses)
							//console.log(resolverCollection['resolver' + index].getServers());
							dnsResult.push( JSON.stringify(Object.assign({}, addresses) ));
							//dnsResult.push(  addresses );
							console.log(dnsResult);
					})
					.catch(err => console.log(err))
			}
		}
		//return JSON.stringify( dnsResult );
		return dnsResult;
}
*/
/*
function performLookup(domain, type, attempts=0) {
	let maxRetries = 2;
	//set target dns server and run the query
	let server = servers.getRandomServerSet();

	for (let index = 0; index < server.length; ++index) {
		let serverItem = [];
		serverItem.push(server[index]);

		//console.log("index="+index);
		//console.log("server="+serverItem);

		//this doesn't change its value  ...
		dns.setServers( serverItem );


		dns.resolve(domain, type, function (error, addresses) {
			console.log("DNS servers 1: ", dns.getServers());
			if (error && attempts <= maxRetries) {
				console.log("Error: ", error);  // error or null
				performLookup(domain, type, attempts++);	//retry
			} else if (error && attempts > maxRetries) {
				console.log("Gave up");
			} else {
				console.log("DNS servers: ", dns.getServers());  // [ '8.8.8.8' ]
				console.log(domain + " resolves to: ", addresses);  // [ '192.168.0.10' ]
			}
		});
	}
}
*/

app.get('/dns', (req, res) => {
	let domain = req.query.domain;
	let type = req.query.type;

	console.log("perform lookup on "+domain+" with type="+type);
	//let lookupResult = JSON.stringify( performLookup(domain, type) ); //returns array
	//let lookupResult =  performLookup(domain, type);
	//console.log("lr="+lookupResult);


	let dnsResult = [];
	//get the set of dns servers to use
	let server = servers.getRandomServerSet();

	//create an object which contains all the async lookups
	let resolverCollection = {};

	//loop through each of the dns servers
	for (let index = 0; index < server.length; ++index) {
		let serverItem = [];
		serverItem.push(server[index]);

		//add a new resolver item to the container object
		resolverCollection['resolver' + index] = new Resolver;
		//set the dns server to use for the lookup
		resolverCollection['resolver' + index].setServers(serverItem);

		//run the lookup and return the results
		if (type === 'A') {
			resolverCollection['resolver' + index].resolve4(domain)
				.then( function(addresses) {
						//console.log('addresses='+addresses)
						//console.log(resolverCollection['resolver' + index].getServers());
						dnsResult.push( JSON.stringify(Object.assign({}, addresses) ));
						//dnsResult.push(  addresses );
						console.log(dnsResult);
						res.json( dnsResult );
				})
				.catch(err => console.log(err))
		}

	}
	//return JSON.stringify( dnsResult );
	//return dnsResult;


	//res.json( dnsResult );


	//let stub = JSON.parse("{\"Status\":0,\"TC\":false,\"RD\":true,\"RA\":true,\"AD\":false,\"CD\":false,\"Question\":[{\"name\":\"decodist.com.\",\"type\":15}],\"Authority\":[{\"name\":\"decodist.com.\",\"type\":6,\"TTL\":1800,\"data\":\"etta.ns.cloudflare.com. dns.cloudflare.com. 2271645155 10000 2400 604800 3600\"}],\"Comment\":\"Response from 2a06:98c1:50::ac40:2173.\"}")
	//res.json( stub["Authority"] );

	//res.json( lookupResult );

	//this is google's implementation
	/* https.get(server+'?name='+domain+'&type='+type, resp => {
        resp.on('data', (d) => {
			dnsResults = JSON.parse(d);
			if (type !== 'MX') {
				res.json(dnsResults['Answer']);
			} else {
				res.json(dnsResults['Authority']);
			}

    	});
	});

	 */
});

// front end routes
/*
app.get('/lookup', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/dnslookup.html'));
});
 */

// status message when server started
app.listen(port, () => console.log(`Node app now listening on port ${port}!`))


