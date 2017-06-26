

//'use strict'

var express = require("express");
var bodyParser = require("body-parser");


var helmut = require('helmet')

var path = require('path');

var port = 80;

var app = express();
var server   = require('http').Server(app);

var io       = require('socket.io')(server);
//var ioEvents = require('./lib/ioevents.js')(io);

app.use(helmut());

app.use(express.static(path.join(__dirname, '/../')));

//View Engine
//parent as rootfolder, now: /server/server.js
app.set('views', path.join(__dirname, '/../'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});



var publicRoute = require('./routes/public')(app, express,io);
var protectedRoute = require('./routes/protected')(app, express,io);

app.use('/', publicRoute);
app.use('/app', protectedRoute);

server.listen(port, function(){
    console.log('Server started on port '+port);
});

