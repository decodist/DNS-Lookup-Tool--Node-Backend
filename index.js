// init ExpressJS
const express = require('express')
const app = express();
const port = 3000;

// init other modules
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { Resolver } = require('dns').promises;

//set some deep DNS lookup settings to prevent timeouts
process.env.RES_OPTIONS='ndots:3 retrans:1000 retry:3 rotate timeout:2000';
app.use(cors());

// Configure body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// allow folder route for all public static assets
app.use(express.static('public'));

// make helper functions available
const servers = require("./utils/fetchServerList.js");

// GET home endpoint
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/dnslookup.html'));
});

// main api endpoint
app.get('/dns', (req, res) => {

	res.setTimeout(5000);

	let domain = req.query.domain;
	let type = req.query.type;
	let location = req.query.loc;

	//get the dns server to use
	let server = servers.getRandomLocationServer(location);

	//get the dns server information
	let serverResult = {
		"zone": server[0][0],
		"location": server[0][1],
		"provider": server[0][2],
		"ip": server[0][3],
		"latLong": server[0][4],
		"answer": ""
	}

	//create an object which contains all the async lookups
	let resolverCollection = {};

	//add a new resolver item to the container object
	resolverCollection['resolver' + location] = new Resolver;
	//set the dns server to use for the lookup
	resolverCollection['resolver' + location].setServers([serverResult.ip]);

	function errorH(err){
		//interpret the error
		serverResult.answer = JSON.parse(JSON.stringify(err));
		res.json(serverResult);
	}

	//run the lookup and return the results
	if (type === 'A') {
		resolverCollection['resolver' + location].resolve4(domain)
			.then(function (addresses) {
				serverResult.answer = addresses;
				res.json(serverResult);
			})
			.catch(function (err) {
				errorH(err);
			})
	} else if (type === 'NS') {
		resolverCollection['resolver' + location].resolveNs(domain)
			.then(function (addresses) {
				serverResult.answer = addresses;
				res.json(serverResult);
			})
			.catch(function (err) {
				errorH(err);
			})
	} else if (type === 'MX') {
		resolverCollection['resolver' + location].resolveMx(domain)
			.then(function (addresses) {
				//extract nameserver info from the array of objects
				serverResult.answer = addresses.map(item => item['exchange']);
				res.json(serverResult);
			})
			.catch(function (err) {
				errorH(err);
			})
	}
})

// status message when server started
app.listen(port, () => console.log(`Node app now listening on port ${port}!`))



