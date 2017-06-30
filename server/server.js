

//'use strict'

var express = require("express");
var bodyParser = require("body-parser");


var helmut = require('helmet')
var fs = require('fs');
var path = require('path');

var port = 3001;

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
/*
const testFolder = '../../';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        console.log(file);
    });
})
*/




var publicRoute = require('./routes/public')(app, express,io);
var protectedRoute = require('./routes/protected')(app, express,fs);
var playerRoute = require('./routes/player')(app, express,io,fs,path);

app.use('/player', playerRoute);
app.use('/app', protectedRoute);
app.use('/public', publicRoute);
server.listen(port, function(){
    console.log('Server started on port '+port);
});

