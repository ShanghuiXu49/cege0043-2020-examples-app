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


// the / indicates the path that you type into the server 
app.get('/:name1/:name2', function (req, res) {
// the console is the command line of your server - you will see the console.log values in the terminal window
  console.log('request '+req.params.name1+"/"+req.params.name2);
// the res is the response that the server sends back to the browser - you will see this text in your browser window
  res.sendFile(__dirname + '/'+req.params.name1+'/'+req.params.name2);
});


app.get('/:name1/:name2/:name3', function (req, res) {
// the console is the command line of your server 
// you will see the console.log values in the terminal window
 console.log('request '+req.params.name1+"/"+req.params.name2+"/"+req.params.name3); 
  // send the response
  res.sendFile(__dirname + '/'+req.params.name1+'/'+req.params.name2+ '/'+req.params.name3);
});

