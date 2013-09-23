var http = require('http');
var express = require('express');
var app = express();
var url = require('url');
var path = require('path');
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');

var server = http.createServer(app).listen(9000);
var binaryserver = new BinaryServer({server: server, path: '/streaming'});

app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.get('/albums', function (req, res) {
  res.sendfile('test');
});

binaryserver.on('connection', function(client) {
  var file = fs.createReadStream(__dirname + '/Sleepyhead.mp3');
  client.send(file);
});
