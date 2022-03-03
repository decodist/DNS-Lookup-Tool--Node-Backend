// init ExpressJS
const express = require('express')
const app = express();
const port = 3000;
// init other modules
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const path = require('path');
const dns = require('dns');

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

// GET DNS results endpoint...
let dnsResults = [];

function performLookup(domain, type, attempts=0) {
	let maxRetries = 2;
	//set target dns server and run the query
	let server = servers.getRandomServerSet();

	for (let index = 0; index < server.length; ++index) {
		let serverItem = server[index];

		console.log("index="+index);
		console.log("server="+server[index]);

		//this doesn't change its value  ...
		dns.setServers( [serverItem] );

		dns.resolve(domain, type, function (error, addresses) {
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

app.get('/dns', (req, res) => {
	let domain = req.query.domain;
	let type = req.query.type;

	performLookup(domain, type);



	let stub = JSON.parse("{\"Status\":0,\"TC\":false,\"RD\":true,\"RA\":true,\"AD\":false,\"CD\":false,\"Question\":[{\"name\":\"decodist.com.\",\"type\":15}],\"Authority\":[{\"name\":\"decodist.com.\",\"type\":6,\"TTL\":1800,\"data\":\"etta.ns.cloudflare.com. dns.cloudflare.com. 2271645155 10000 2400 604800 3600\"}],\"Comment\":\"Response from 2a06:98c1:50::ac40:2173.\"}")
	res.json( stub["Authority"] );


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


