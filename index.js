const express = require('express');

var http = require('http');
var url = require('url');
var fs = require('fs');

var userRouter = require('./api/routes/route');
var app = express();
userRouter(app);

var server = app.listen(8080, function() {
    // var host = server.address().address
    // var port = server.address().port
});

http.createServer(function(req, res) {
    if (req.url == '/notfound') {
        fs.readFile('./api/routes/htmls/notfound.html', function(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else {
        fs.readFile('./api/routes/htmls/login.html', function(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }

}).listen(8081);