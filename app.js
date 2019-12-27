// express is the server that forms part of the nodejs program
var express = require('express');
var path = require("path");
var fs = require('fs');
var https = require('https');

var app = express();


var privateKey = fs.readFileSync('/home/studentuser/certs/cert.key').toString();
var certificate = fs.readFileSync('/home/studentuser/certs/cert.crt').toString();  

var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(3000);


app.get('/',function (req,res) {
	res.send("Hello World from the class test server");
});

app.get('/:fileName', function (req, res) {
  // run some server-side code
  	var fileName = req.params.fileName;
	console.log(fileName + ' requested'); 
	// note that __dirname  gives the path to the server.js file
	res.sendFile(__dirname + '/'+ fileName);
});



