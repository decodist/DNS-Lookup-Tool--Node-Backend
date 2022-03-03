const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const path = require('path');
const dns = require('dns');

const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// allow folder route for all public static assets
app.use(express.static('public'));

// load helper functions
const servers = require("./utils/fetchServerList.js");

// GET home endpoint
app.get('/', (req, res) => {
	//todo send a dynamic security code as well
    res.sendFile(path.join(__dirname, '/public/dnslookup.html'));
});

// GET DNS results endpoint...
let dnsResults = [];

app.get('/dns', (req, res) => {
	let domain = req.query.domain;
	let type = req.query.type;
	let server = servers.getRandomServer();

	console.log('fetching from '+server);

	//set target dns server and run the query
	dns.setServers( [server] );
	dns.resolve(domain, type, function (error, addresses) {
		console.log("Error: ", error);  // null
		console.log("DNS servers: ", dns.getServers());  // [ '8.8.8.8', '8.8.4.4' ]
		console.log(domain + " resolves to: ", addresses);  // [ '192.168.0.10' ]
	});

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


