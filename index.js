const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// allow folder route for all public static assets
app.use(express.static('public'));

// GET home endpoint
app.get('/', (req, res) => {
	//todo send a dynamic security code as well
    res.sendFile(path.join(__dirname, '/public/dnslookup.html'));
});

// GET DNS results endpoint
let dnsResults = [];

app.get('/dns', (req, res) => {
	let domain = req.query.domain;
	let type = req.query.type;
	https.get('https://dns.google/resolve?name='+domain+'&type='+type, resp => {
        resp.on('data', (d) => {
			dnsResults = JSON.parse(d);
			res.json(dnsResults['Answer']);
    	});
	});
});

// front end routes
/*
app.get('/lookup', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/dnslookup.html'));
});
 */

// status message when server started
app.listen(port, () => console.log(`Node app now listening on port ${port}!`))


